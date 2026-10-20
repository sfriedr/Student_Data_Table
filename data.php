<?php
// 1. Verbindung und Autoloader aktivieren
require_once 'db.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$method = $_SERVER['REQUEST_METHOD'];
$uid = 'Moderator_DataTable';

// Daten für DataTables laden (GET)
if ($method === 'GET') {
    header('Content-Type: application/json'); // Antworten werden automatisch in JavaScript-Objekte umgewandelt.

    $action = isset($_GET['action']) ? $_GET['action'] : 'get_students'; // Steuerung über den action-Parameter holen (Standard ist get_students)

    try {

        if ($action === 'get_courseData_for_dropdown') {
            // Holt alle eindeutigen Kombinationen direkt aus der Tabelle "studiengangsliste"
            $studiengaenge = Capsule::table('studiengangsliste')
                ->select('Name des Studiengangs', 'Abschluss', 'Fachbereich', 'Studienort')
                ->distinct()
                ->get();

            echo json_encode($studiengaenge);
            exit;
        }

        if ($action === 'get_all_courseData') {
            // Holt alle eindeutigen Kombinationen direkt aus der Tabelle "studiengangsliste"
            $studiengaenge = Capsule::table('studiengangsliste')
                ->select('STG-Nr', 'Name des Studiengangs', 'Abschluss', 'Fachbereich', 'Studienort',
                    Capsule::raw("CONCAT('Studiengang', `STG-Nr`) as concatNameSTG"))
                ->distinct()
                ->get();

            echo json_encode($studiengaenge);
            exit;
        }

        if ($action === 'get_students') {
            // Capsule::table greif auf Query Builder zu
        // Wir starten von der Haupttabelle "students_initial"
        $results = Capsule::table('students_initial AS si')
                    // Left Join zu den Moderator-Overrides über die student_id (muss vor dem Studiengangs-Join stehen)
                    ->leftJoin('moderator_overrides AS mo', 'mo.student_id', '=', 'si.id')
                    // Left Join zur Studiengangsliste über die effektive studyBranch1 (mo.studyBranch1 falls vorhanden, sonst si.studyBranch1)
                    ->leftJoin('Studiengangsliste AS sgl', function ($join) {
                        $join->on(
                            Capsule::raw("REPLACE(COALESCE(NULLIF(TRIM(mo.studyBranch1), ''), TRIM(si.studyBranch1)), 'Studiengang', '')"),
                            '=',
                            Capsule::raw("sgl.`STG-Nr`")
                        );
                    })
                    // Selektion der Felder
                    ->selectRaw("
                        si.id AS student_id,
                        -- Persönliche Felder: Override falls vorhanden, sonst Original
                        COALESCE(NULLIF(TRIM(mo.`uid`), ''), si.uid)                 AS uid,
                        COALESCE(NULLIF(TRIM(mo.`givenName`), ''), si.givenName)     AS givenName,
                        COALESCE(NULLIF(TRIM(mo.`sn`), ''), si.sn)                   AS sn,
                        COALESCE(NULLIF(TRIM(mo.`mail`), ''), si.mail)               AS mail,

                        

                        -- Studiengangsfelder: Immer aus der Studiengangsliste (keine direkten Overrides)
                        sgl.`Name des Studiengangs` AS `Name des Studiengangs`,
                        sgl.`Abschluss`            AS `Abschluss`,
                        sgl.`Fachbereich`          AS `Fachbereich`,
                        sgl.`Studienort`           AS `Studienort`,

                        -- Originale Source-Felder und Timestamps für die Referenz
                        COALESCE(NULLIF(TRIM(mo.`studyBranch1`), ''), si.studyBranch1) AS source_studyBranch1,
                        si.created_at             AS source_created_at,
                        si.updated_at             AS source_updated_at,

                        -- Metadaten der Überschreibung (kann NULL sein)
                        mo.id                     AS override_id,
                        mo.created_by             AS override_created_by,
                        mo.updated_by             AS override_updated_by,
                        mo.created_at             AS override_created_at,
                        mo.updated_at             AS override_updated_at,

                        -- Boolean-Flags: geben 1 wenn Feld überschrieben, sonst 0
                        (mo.`uid` IS NOT NULL)             AS overr_uid,
                        (mo.`givenName` IS NOT NULL)       AS overr_givenName,
                        (mo.`sn` IS NOT NULL)              AS overr_sn,
                        (mo.`mail` IS NOT NULL)            AS overr_mail,
                        (mo.`studyBranch1` IS NOT NULL)    AS overr_studyBranch1,



                        (mo.`studyBranch1` IS NOT NULL)     AS overr_stg_name,
                        (mo.`studyBranch1` IS NOT NULL)     AS overr_abschluss,
                        (mo.`studyBranch1` IS NOT NULL)     AS overr_fachbereich,
                        (mo.`studyBranch1` IS NOT NULL)     AS overr_studienort
                    ")
                    ->get();
                
                // Übergabe der Sammlungen direkt als JSON an DataTables
                echo json_encode($results);
        }
        
    } catch (\Exception $e) {
        http_response_code(500); // HTTP-Status 500 für das JavaScript setzen
            
        // Fehlermeldung für Entwickler in Apache/Nginx-Error-Log
        error_log("CRITICAL ERROR [Delete]: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
        
        // Fehlermeldung für User
        //echo "Die Daten konnten nicht geladen werden. Bitte wenden Sie sich an den Administrator.";
        echo json_encode([
            "message" => "Die Daten konnten nicht geladen werden. Bitte wenden Sie sich an den Administrator.",
            // Die nachfolgenden drei Zeilen für den produktiven Betrieb wieder entfernen. Sie sind nur für die Entwcklungsphase bestimmt.
            "debug_error" => $e->getMessage(),
            "debug_file" => $e->getFile(),
            "debug_line" => $e->getLine()
        ], JSON_UNESCAPED_UNICODE);
    }
    
    exit;
}


// Update, Insert, Delete inkludiert.
if ($method === 'POST') {


    // Änderungen in der DB in Tabelle "moderator_overrides" speichern
    /*
    * Wenn das erste Mal eine DataTable Änderung einer Zeile in DB gespeichert wird,
      wird für diese Zeile ein neuer Tupel in moderator_overrides erzeugt.
      Wenn vorher bereits Änderungen in DB gespeichert wurden und somit bereits ein Eintrag in moderator_overrides existiert,
      dann wird das Tupel in moderator_overrides geupdatet.
    */
    if (isset($_POST['update_data'])) {
        $updateData = $_POST['update_data'];

        try {
             Capsule::beginTransaction(); // Transaktion starten: Die DB merkt sich ab jetzt jeden Schritt

            foreach ($updateData as $studentId => $fields) {
                
                // Leere Texte zu echten NULL-Werten konvertieren
                foreach ($fields as $key => $value) {
                    if ($value === '') {
                        $fields[$key] = null;
                    }
                }

                $exists = Capsule::table('moderator_overrides')->where('student_id', $studentId)->exists();
                //$exists = Moderator_overrides::where('student_id', $studentId)->exists();

                if (!$exists) { // Wenn student_id nicht in "moderator_overrides" existiert ...
                    $nextId = (int)Capsule::table('moderator_overrides')->max('id') + 1;
                    //$nextId = (int)Moderator_overrides::max('id') + 1; // dann id manuell berechnen, da kein AUTO_INCREMENT
                    $fields['id'] = $nextId;
                    $fields['student_id'] = $studentId;
                    $fields['created_by'] = $uid; // Benutzerkennung se12345
                    $fields['created_at'] = Capsule::table('students_initial')->where('id', $studentId)->value('created_at'); // "created_at" in "moderator_overrides" bekommt Timestamp aus "created_at" aus "students_initial"
                    $fields['updated_at'] = date('Y-m-d H:i:s'); // Neuer Timestamp
                    Capsule::table('moderator_overrides')->insert($fields);
                }
                else {
                    $fields['created_at'] = Capsule::table('students_initial')->where('id', $studentId)->value('created_at'); // "created_at" in "moderator_overrides" bekommt Timestamp aus "created_at" aus "students_initial"
                    $fields['updated_at'] = date('Y-m-d H:i:s'); // Neuer Timestamp
                    Capsule::table('moderator_overrides')
                    ->where('student_id', $studentId)
                    ->update($fields);
                }

                /*Capsule::table('moderator_overrides')->updateOrInsert(
                    ['student_id' => $studentId],
                    $fields
                );*/

                /*Moderator_overrides::updateOrCreate(
                    ['student_id' => $studentId],
                    $fields
                );*/
            }

            // Wenn bis hierhin kein Fehler auftrat: Fest in die DB schreiben!
            Capsule::commit();
            echo "success";

        } catch (\Exception $e) { 
            Capsule::rollBack();

            http_response_code(500); // HTTP-Status 500 für das JavaScript setzen
            
            // Fehlermeldung für Entwickler in Apache/Nginx-Error-Log
            error_log("CRITICAL ERROR [Delete]: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
            
            // Fehlermeldung für User
            //echo "Die Daten konnten nicht geladen werden. Bitte wenden Sie sich an den Administrator.";
            echo json_encode([
                "message" => "Beim Speichern der Änderungen ist ein Fehler aufgetreten. Bitte wenden Sie sich an den Administrator.",
                // Die nachfolgenden drei Zeilen für den produktiven Betrieb wieder entfernen. Sie sind nur für die Entwcklungsphase bestimmt.
                "debug_error" => $e->getMessage(),
                "debug_file" => $e->getFile(),
                "debug_line" => $e->getLine()
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }


    // Neuen Zeile in DataTable wird in Tabelle "moderator_overrides" gespeichert und zugleich neuer leerer Eintrag in "students_initial" erzeugt
    if (isset($_POST['new_data'])) {
        $newData = $_POST['new_data'];

        try {
            Capsule::beginTransaction();

            foreach ($newData as $row) {
                
                foreach ($row as $key => $value) {
                    if ($value === '') {
                        $row[$key] = null;
                    }
                }

                // Leeren Datensatz in 'students_initial' erzeugen mit manuell generierter ID und Timestamps
                $newStudentId = Capsule::table('students_initial')->insertGetId([
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);

                // Manuelle ID für die 'moderator_overrides' generieren
                $nextOverrideId = (int)Capsule::table('moderator_overrides')->max('id') + 1;

                // Wir bauen das finale Daten-Array für den neuen Eintrag zusammen
                Capsule::table('moderator_overrides')->insert([
                    'id'                    => $nextOverrideId, // Die manuell hochgezählte ID
                    'student_id'            => $newStudentId,
                    'uid'                    => $row['uid'] ?? null,
                    'givenName'             => $row['givenName'] ?? null,
                    'sn'                    => $row['sn'] ?? null,
                    'mail'                  => $row['mail'] ?? null,
                    //'Name des Studiengangs' => $row['Name des Studiengangs'] ?? null,
                    //'Abschluss'             => $row['Abschluss'] ?? null,
                    //'Fachbereich'           => $row['Fachbereich'] ?? null,
                    //'Studienort'            => $row['Studienort'] ?? null,
                    'studyBranch1'          => $row['studyBranch1'] ?? null,
                    'created_by'            => 'Moderator_DataTable',
                    'updated_by'            => 'Moderator_DataTable',
                    'created_at'            => date('Y-m-d H:i:s'),
                    'updated_at'            => date('Y-m-d H:i:s')
                ]);

                /*Capsule::table('students_initial')->insert([
                    'studyBranch1'          => $row['studyBranch1'] ?? null
                 ]);*/
            }

            Capsule::commit();

            echo "success";

        } catch (\Exception $e) {
            Capsule::rollBack();

            http_response_code(500); // HTTP-Status 500 für das JavaScript setzen
            
            // Fehlermeldung für Entwickler in Apache/Nginx-Error-Log
            error_log("CRITICAL ERROR [Delete]: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
            
            // Fehlermeldung für User
            //echo "Die Daten konnten nicht geladen werden. Bitte wenden Sie sich an den Administrator.";
            echo json_encode([
                "message" => "Beim Speichern neuer Einträge ist ein Fehler aufgetreten. Bitte wenden Sie sich an den Administrator.",
                // Die nachfolgenden drei Zeilen für den produktiven Betrieb wieder entfernen. Sie sind nur für die Entwcklungsphase bestimmt.
                "debug_error" => $e->getMessage(),
                "debug_file" => $e->getFile(),
                "debug_line" => $e->getLine()
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }


    // DataTable-Zeile löschen aus DB-Tabelle students_initial und moderator_overrides
    if (isset($_POST['delete_ids'])) {
        $idsToDelete = $_POST['delete_ids']; 

        try {
            Capsule::beginTransaction();

            Capsule::table('moderator_overrides')->whereIn('student_id', $idsToDelete)->delete(); // Aus den 'moderator_overrides' löschen

            Capsule::table('students_initial')->whereIn('id', $idsToDelete)->delete(); // Aus 'students_initial' löschen

            Capsule::commit();
            echo "success";

        } catch (\Throwable $e) {
            Capsule::rollBack();

            http_response_code(500); // HTTP-Status 500 für das JavaScript setzen
            
            // Fehlermeldung für Entwickler in Apache/Nginx-Error-Log
            error_log("CRITICAL ERROR [Delete]: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
            
            // Fehlermeldung für User
            //echo "Die Daten konnten nicht geladen werden. Bitte wenden Sie sich an den Administrator.";
            echo json_encode([
                "message" => "Beim Löschen ist ein Fehler aufgetreten. Bitte wenden Sie sich an den Administrator.",
                // Die nachfolgenden drei Zeilen für den produktiven Betrieb wieder entfernen. Sie sind nur für die Entwcklungsphase bestimmt.
                "debug_error" => $e->getMessage(),
                "debug_file" => $e->getFile(),
                "debug_line" => $e->getLine()
            ], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }
}

?>