let table;
const dropdownSet = new Set(); // Länge 165
//let dropdownArray = []; // Länge 165 sollte aber 173 sein.
//const course_data = {};
const course_data = new Map();
let insertModeAktiv = false;
let updateModeAktiv = false;
let deleteModeAktiv = false;
let old_local_row_data = {};
let newStudents = {}; // Zwischenspeicher für neue Studenten/Zeilen
let changedStudents = {}; // Zwischenspeicher für veränderte Studenten: Zuordnung -> {id: {attribut1: attributwert, ...}, ...}
const originalDropdownValues = {};
/**
* Beispielinhalt bei folgenden Änderungen:
*  Student ID 5 -> givenName = Max
*  Student ID 5 -> mail = max@test.de
*  Student ID 12 -> sn = "Schmidt"
* => {"5": {"givenName": "Max", "mail": "max@test.de"}, "12": {"sn": "Schmidt"}}
*/


function load_data(){
    load_courseData_for_dropdown();
    load_all_courseData();
    load_studentData_for_dataTable();
}



function load_courseData_for_dropdown() {
    $.ajax({
        url: "./data.php?action=get_courseData_for_dropdown",
        method: "GET",
        dataType: "json",
        success: function(studiengaenge) {
            dropdownSet.clear();
            dropdownSet.add("");

            studiengaenge.forEach(function(row) {
                let verkettet = concatenate_column_StudiumInfo(null, 'display', row);
                
                if (verkettet && verkettet.trim() !== "") {
                    dropdownSet.add(verkettet.trim());
                }
            });
        },
        error: function(xhr) {
            alert("Fehler beim Vorab-Laden der Studiengangsliste:", xhr.responseText);
        }
    });
}


/*
studiengänge:
[
 {
  Abschluss: "Master",
  Fachbereich: "Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik",
  "Name des Studiengangs": "Sicherheit in der kerntechnischen Entsorgung",
  "STG-Nr": "002",
  Studiengang: "Studiengang002",
  Studienort: "Gelsenkirchen"
 },
...
]

course_data:
{
 "Studiengang002":
   { "STG-Nr": "002", studyBranch1: "Studiengang002", Abschluss: "Master", Fachbereich: "Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik", Studienort: "Gelsenkirchen"},
 …:
   {…},
 …
}
*/
function load_all_courseData(){
    $.ajax({
        url: "./data.php?action=get_all_courseData",
        method: "GET",
        dataType: "json",
        success: function(studiengaenge) {
            course_data.clear();
            for (let key in course_data) {
                if (course_data.hasOwnProperty(key)) delete course_data[key]; // Map leeren
            }

            studiengaenge.forEach(function(row) {
                const concatNameSTG = row["concatNameSTG"];
                    
                if (concatNameSTG) {
                    // Richtige Map-Syntax zum Hinzufügen von Einträgen
                    course_data.set(concatNameSTG, {
                        "STG-Nr": cleanStr(row["STG-Nr"]),
                        "Abschluss": cleanStr(row["Abschluss"]),
                        "Fachbereich": cleanStr(row["Fachbereich"]),
                        "Studienort": cleanStr(row["Studienort"]),
                        "Name des Studiengangs": cleanStr(row["Name des Studiengangs"])
                    });
                }
            });
             /*if (course_data.has("Studiengang016")) {
                console.log(course_data.get("Studiengang016"));
            }*/
        },
        error: function(xhr) {
            alert("Fehler beim Vorab-Laden der Studiengangsliste:", xhr.responseText);
        }
    });
}


// Mehrfache leerzeichen eines Strings werden durch ein einfaches Leerzeichen ersetzt.
function cleanStr(str) {
    return str ? str.toString().trim().replace(/\s+/g, ' ') : '';
}


// Lädt Daten aus DB-Tabellen und deklariert und initialisiert DataTable
function load_studentData_for_dataTable(){
    $.fn.dataTable.ext.errMode = 'none'; // Unterdrückt DataTable-eigene Fehlermeldungen

    table = $('#resultTable').DataTable({ // resultTable ist ID der HTML-Tabelle
        "paging": false, // Deaktiviert Paginierung
        //"pageLength": 11, // Wert für Zeilen pro Seite
        "ajax": {
            "url": "./data.php?action=get_students", // relativer Pfad - sucht im aktuellen Ordner.
            "dataSrc": "",
            "error": function (xhr) {
                let response = JSON.parse(xhr.responseText);
                alert("Fehler:\n" + response.message);
            }
        },
        "layout": {
            "topStart": "buttons"
        },
        "buttons": [
            {
                extend: 'excelHtml5',
                className: 'btn-hidden-excel', // Eigene Klasse zum Verstecken
                title: null,
                filename: 'students_export_' + generateDateString(),
                fieldSeparator: ';',
                bom: true,
                exportOptions: { 
                    columns: ':visible:not(.no-export)',
                    header: true 
                }
            },
            {
                extend: 'csvHtml5',
                className: 'btn-hidden-csv', // Eigene Klasse zum Verstecken
                title: null,
                filename: 'students_export_' + generateDateString(),
                fieldSeparator: ';',
                bom: true,
                exportOptions: { 
                    columns: ':visible:not(.no-export)',
                    header: true 
                }
            }
        ],
        "columns": [
            //{"data": "student_id", "name": "student_id", "visible": false},
            {"data": "student_id", "name": "student_id", "className": "no-export"}, // "className": "no-export" -> Dient zum späteren Filtern, damit dieses Attribut nicht exportiert wird.
            {"data": "uid", "name": "uid", "className": "no-export"},
            {"data": "givenName", "name": "givenName"},
            {"data": "sn", "name": "sn"},
            {"data": "mail", "name": "mail"},
            {"data": null, "name": "Studiengang-Info", "visible": false, "render": concatenate_column_StudiumInfo},
            {"data": "Name des Studiengangs", "name": "Name des Studiengangs"},
            {"data": "Abschluss", "name": "Abschluss"},
            {"data": "Fachbereich", "name": "Fachbereich"},
            {"data": "Studienort", "name": "Studienort"},
            {"data": "source_studyBranch1", "name": "source_studyBranch1", "className": "no-export"},
            {"data": "source_created_at", "name": "source_created_at"},
            {"data": "source_updated_at", "name": "source_updated_at", "className": "no-export"},
            {"data": "override_id", "name": "override_id", "className": "no-export"},
            {"data": "override_created_by", "name": "override_created_by"},
            {"data": "override_updated_by", "name": "override_updated_by"},
            {"data": "override_created_at", "name": "override_created_at"},
            {"data": "override_updated_at", "name": "override_updated_at"},
            {"data": "overr_uid", "name": "overr_uid", "className": "no-export"},
            {"data": "overr_givenName", "name": "overr_givenName", "className": "no-export"},
            {"data": "overr_sn", "name": "overr_sn", "className": "no-export"},
            {"data": "overr_mail", "name": "overr_mail", "className": "no-export"},
            {"data": "overr_stg_name", "name": "overr_stg_name", "className": "no-export"},
            {"data": "overr_abschluss", "name": "overr_abschluss", "className": "no-export"},
            {"data": "overr_fachbereich", "name": "overr_fachbereich", "className": "no-export"},
            {"data": "overr_studienort", "name": "overr_studienort", "className": "no-export"}
        ],

        /*
        Sie schaut auf die Zelleninhalte von konrekten Spalten. Wenn eine Zelle in einer diesen Spalten
        einen bestimmten Wert hat, soll diese Zelle und eine weitere Zelle aus der gleichen Zeile
        gelb hinterlegt werden.
        Dies geschieht beim ersten Laden der Daten von der DB in DataTable und jedes Mal sobald im JavaScript-Code
        die folgende Zeile ausgeführt wird: "table.ajax.reload()" DataTable schickt damit eine neue GET-Anfrage an die data.php.
        */
        
        "rowCallback": function(row, data, index) {
            const api = this.api();

            // Deine gewünschten Regeln: Welche Override-Spalte steuert welche Inhalts-Spalte?
            const highlightMapping = {
                'overr_uid': 'uid',
                'overr_givenName': 'givenName',
                'overr_sn': 'sn',
                'overr_mail': 'mail',
                'overr_stg_name': 'Name des Studiengangs',
                'overr_abschluss': 'Abschluss',
                'overr_fachbereich': 'Fachbereich',
                'overr_studienort': 'Studienort'
            };

            // Wir gehen jede Regel einzeln durch
            Object.keys(highlightMapping).forEach(function(overrColName) {
                const valueColName = highlightMapping[overrColName];

                // Wenn der Wert der Override-Spalte im Datensatz gleich 1 ist
                if (data[overrColName] == 1) {
                    
                    // Dank deiner `"name"`-Parameter können wir die Spaltennummern jetzt direkt so holen:
                    const overrColIndex = api.column(overrColName + ':name').index('visible');
                    const valueColIndex = api.column(valueColName + ':name').index('visible');

                    // Wenn die Spalten existieren, färben wir die jeweiligen Zellen (td) in dieser Zeile gelb
                    if (overrColIndex !== undefined) {
                        $('td', row).eq(overrColIndex).addClass('cell-edited');
                    }
                    if (valueColIndex !== undefined) {
                        $('td', row).eq(valueColIndex).addClass('cell-edited');
                    }
                }
            });
        }
    });
}



// Konkateniert mehrere Spalteninhalte zu einer einzigen Spalte.
function concatenate_column_StudiumInfo(data, type, row) {
    let studiengang = row['Name des Studiengangs']; 
    let abschluss   = row['Abschluss'];
    let fachbereich = row['Fachbereich'];
    let studienort  = row['Studienort'];

    return [studiengang, abschluss, fachbereich, studienort]
        .filter(Boolean) // "", null und undefined gelten als False. Sorgt dafür, dass bei diesen Werten kein unnötiges Komma steht wie -> "Maschinenabu, , FB1, GE"
        .join(', '); // Verkettung der Inhalte durch Kommata
}


// Für Spalte "Studiengang-Info" wird pro Zelle ein Dropdown-Menü angezeigt.
function render_all_dropdown() {
    const colIndex = table.column('Studiengang-Info:name').index(); // Spalten-Index der Spalte "Studiengang-Info"
    
    if (colIndex === undefined) return;

    const allRowsArray = $('#resultTable tbody tr').toArray(); // Alle Zeilen aus DataTable

    for (let row of allRowsArray) {
        let $cell = $(row).find('td').eq(colIndex); // Aktuelle Zelle der Spalte "Studiengang-Info"
        let currentCellValue = $cell.html().trim(); // Textinhalt der Zelle
        let rowIndex = table.row(row).index();
        let dropdownHtml = createDropdown(rowIndex, colIndex, currentCellValue, dropdownSet); // Dropdown-HTML generieren und speichern
        $cell.html(dropdownHtml); // Löscht den Textinhalt aus aktueller Zelle und ersetzt es durch das Dropdown-Interaktionselement
        //$cell.val(value); // Erstes Element in Dropdown-Auswahl ist der Inhalt "value", welcher zuvor angezeigt wurde.
    }
}


// Erzeugt ein HTML-String für ein funktionsfähiges Dropdown-Menü
function createDropdown(rowIndex, colIndex, currentValue, dropdownSet) {
    // Klasse und Daten-Attribut wie in deinem Code, Struktur wie in der Vorlage
    // <select>-Tag ist für Dropdown
    // <option>-Tag ist für die Auswahl im Dropdown
    // name=  Fügt Element den Namen "studiengang_auswahl" hinzu.
    // class=  fügt dem Dropdown-HTML-Element zwei Klassen "form-control", "study-info-dropdown" hinzu.
    let html = '<select name="studiengang_auswahl" class="form-control study-info-dropdown" data-field="Studiengang-Info" data-row="' + rowIndex + '" data-col="' + colIndex + '">';
    let dropdownArray = Array.from(dropdownSet);

    for (let dropdownSet_value of dropdownArray){
        // Doppelte Leerzeichen, Zeilenumbrüche, Wagenrückläufe ersetzen durch einfaches Leerzeichen.
        // Ist nötig, weil DataTable automatisch diese Zeihen einfügt, wenn ein Text nicht in eine Zelle passt.
        let normalizedCurrent = currentValue.replace(/\s+/g, ' ');
        let normalizedDropdown = dropdownSet_value.replace(/\s+/g, ' ');

        if(normalizedCurrent === normalizedDropdown){
            html += '<option selected>' + normalizedCurrent + '</option>';
            //html += '<option value="' + dropdownSet_value + '">' + dropdownSet_value + '</option>';
        }
        else {
            html += '<option>' + normalizedDropdown + '</option>';
        }
    }
    html += '</select>';
    return html;
}


function remove_dropdown() {
    const colIndex = table.column('Studiengang-Info:name').index(); // Spalten-Index der Spalte "Studiengang-Info"
    
    if (colIndex === undefined) return;

    const allRowsArray = $('#resultTable tbody tr').toArray(); // Alle Zeilen aus DataTable

    for (let row of allRowsArray) {
        let $cell = $(row).find('td').eq(colIndex); // Aktuelle Zelle der Spalte "Studiengang-Info"
        
        // Findet das Dropdown-Element in der Zellef
        let $dropdown = $cell.find('select.study-info-dropdown');
        
        // Falls ein Dropdown existiert, lies den ausgewählten Wert aus
        if ($dropdown.length > 0) {
            let selectedValue = $dropdown.val(); // Holt den aktuell ausgewählten Wert (z.B. den Studiengang oder "")
            
            $cell.html(selectedValue); // Ersetzt das Dropdown wieder durch den reinen Text
        }
    }
}




function reload_data(e){
    e.preventDefault();
        
        // Wir prüfen, ob die Tabelle bereits existiert
        if ($.fn.DataTable.isDataTable('#resultTable')) {

            const editableCells = $('#resultTable tbody td').not(':first-child, :nth-last-child(-n+17)');
            editableCells.removeAttr('contenteditable'); // Macht Zellen nicht mehr editierbar

            insertModeAktiv = false;
            updateModeAktiv = false;
            deleteModeAktiv = false;
            changedStudents = {};
            newStudents = {};
            old_local_row_data = {};
            $('#menu-selection-mode').removeClass('menu-selection-mode-active'); // Untermenü "menu-selection-mode" farblich auf standard zurücksetzen
            $('#resultTable tbody tr').removeClass('selected'); // Alle aktuell selektierten Zeilen optisch zurücksetzen.
            $('#menu-cell-editmode').removeClass('menu-edit-mode-active'); // Untermenü "menu-cell-editmode" farblich auf standard zurücksetzen
            $('#menu-cell-insertmode').removeClass('menu-insert-mode-active');
            $('#resultTable tbody').off('click.selectionMode'); // Zeilen sind nicht länger anklickbar. Entfertn also Listener auf Zeilen.
            table.rows('.new-row').remove();
            table.column('Studiengang-Info:name').visible(false, false);
            table.column('Name des Studiengangs:name').visible(true, false);
            table.column('Abschluss:name').visible(true, false);
            table.column('Fachbereich:name').visible(true, false);
            table.column('Studienort:name').visible(true, false);

            table.ajax.reload(); // Nur die Daten neu laden (AJAX Reload)
        } else {
            // Wenn nein (Sicherheitsfall): Komplett neu laden
            load_data();
        }
}


//-----------------------------------------------------------------------------------------------------

function exportAsCSV(event) {
    event.preventDefault();
    try {
        // Wir suchen den von DataTables erstellten Button im DOM und klicken ihn virtuell an
        $('.btn-hidden-csv').click();
    } catch (error) {
        console.error(error.message);
        alert("Fehler beim Exportieren in CSV.");
    }
}

function exportAsXLSX(event) {
    event.preventDefault();
    try {
        // Wir suchen den von DataTables erstellten Button im DOM und klicken ihn virtuell an
        $('.btn-hidden-excel').click();
    } catch (error) {
        console.error(error.message);
        alert("Fehler beim Exportieren in XLSX.");
    }
}


function generateDateString(){
    try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    } catch (e) {
        return 'Standard_Datum';
    }
}


//-----------------------------------------------------------------------------------------------------


// Schaut welche IDs es schon gibt und erzeugt dann eine noch nicht existierende nächst höhere ID.
function createID(){
    let allIds = table.column('student_id:name').data().toArray(); //Speichert alle Ids in Array.
    let maxId = Math.max(...allIds.map(Number)); //Speichert die höchste ID und konvertiert diese zur Sicherheit in number.
    let newID = maxId+1;
    return newID;
}

function create_and_render_new_dropdown(newRow){
    const colIndex = table.column('Studiengang-Info:name').index(); // Spalten-Index der Spalte "Studiengang-Info"
    let rowIndex = table.row(newRow).index();
    //let rowIndex = table.rows({ order: 'applied' }).nodes().indexOf(newRow); Das holt den visuellen Index aus DataTable
    let $cell = $(newRow).find('td').eq(colIndex); // Zelle der Spalte "Studiengang-Info"
    let html = '<select name="studiengang_auswahl" class="form-control study-info-dropdown" data-field="Studiengang-Info" data-row="' + rowIndex + '" data-col="' + colIndex + '">';
    let dropdownArray = Array.from(dropdownSet);
    // Jedes Element von dropdownArray durchlaufen und als Option im Dropdown hinzufügen:
    for (let dropdownSet_value of dropdownArray){
        html += '<option>' + dropdownSet_value + '</option></selected>';
    }
    $cell.html(html); // Löscht den Textinhalt aus aktueller Zelle und ersetzt es durch das Dropdown-Interaktionselement
}

// Bei jedem Fokusverlust einer Zelle der neuen Zeile werden NEUE (also nicht leere) Zellenwerte in "newStudents" gespeichert. "newStudents" wird später an DB übergeben.
function handle_new_student_cell_blur(event) {
    const currentNewID = event.data.studentID; // Die Zeilen-ID der Zelle, welche den Fokus vrloren hat.

    // 1. Welchen Wert hat der User gerade eingetippt?
    const newValue = $(this).text().trim();
    
    // 2. In welcher Spalte befinden wir uns?
    const cellIndex = table.cell(this).index();
    const colIndex = cellIndex.column;
    const colName = table.settings().init().columns[colIndex].data;

    // 3. Den Wert im Objekt für die Datenbank-Übertragung speichern
    newStudents[currentNewID][colName] = newValue; 
}


// Bei jeder Wertänderung des Dropdown-Elements der neuen Zeile werden neue Zellenwerte in "newStudents" gespeichert. "newStudents" wird später an DB übergeben.
function handle_new_student_dropdown_change() {
    // Über die im HTML hinterlegten Data-Attribute die DataTable-Instanzen holen
    const rowIndex = $(this).data('row');
    const colIndex = $(this).data('col');
    
    const cell = table.cell(rowIndex, colIndex); // Zelle mit aktuellem Fokus
    const studentId = table.row(rowIndex).data().student_id;

    let oldValue = table.cell(rowIndex, colIndex).data();
    oldValue = (oldValue !== null && oldValue !== undefined) ? oldValue : "";
    
    const newValue = $(this).val(); // Der neu ausgewählte Wert aus dem Dropdown

    // Beide Werte strikt in getrimmte Strings umwandeln und normalisieren
    let cleanOld = oldValue.toString().replace(/\s+/g, ' ').trim();
    let cleanNew = newValue.toString().replace(/\s+/g, ' ').trim();

    // Definition der vier Keys, die bei einer Dropdown-Änderung betroffen sind - Wichtig, weil all diese Daten in einer Spalte "Studieng-Info" stehen.
    const dropdownKeys = ["Name des Studiengangs", "Abschluss", "Fachbereich", "Studienort"];

    if (!newStudents[studentId]) {
        newStudents[studentId] = {};
    }

    // Den ausgewählten Wert am Komma splitten und trimmen
    // Falls cleanNew leer "" ist, erzeugen wir ein leeres Array, um überall "" zu setzen
    let parts = cleanNew ? cleanNew.split(',').map(item => item.trim()) : ["", "", "", ""];

    // Die vier Werte auf die entsprechenden Keys mappen
    dropdownKeys.forEach((key, index) => {
        newStudents[studentId][key] = parts[index] || "";
    });

    // Die übergeordnete Tabellenzelle (td) gelb markieren
    $(this).closest('td').addClass('cell-edited');
}




function activate_deaktivate_insert_mode(e){
    e.preventDefault();
    insertModeAktiv = !insertModeAktiv;

    if(insertModeAktiv){
        // Wenn Veränderungen (für Update) oder ausgewählte Zeilen (für delete) existieren, dann darf kein neuer Student angelegt werden.
        if(updateModeAktiv === true || deleteModeAktiv === true || (Object.keys(changedStudents).length !== 0) || (table.rows('selected').count() !== 0)){
            alert("Sie können den Einfügemodus nicht aktivieren sofern der Zellenbearbeitungsmodus oder Zeilenauswahlmodus noch aktiviert ist oder Sie noch ausstehende Daten zum Updateten oder Löschen haben.\nBitte Insert, Update, Delete getrennt voneinander behandeln.");
            insertModeAktiv = false;
            return;
        }
        // Logik für aktivierten Einfügemodus
        $('#menu-cell-insertmode').addClass('menu-insert-mode-active'); // Untermenü "menu-cell-editmode" farblich hervorheben
        table.column('Studiengang-Info:name').visible(true, false);
        table.column('Name des Studiengangs:name').visible(false, false);
        table.column('Abschluss:name').visible(false, false);
        table.column('Fachbereich:name').visible(false, false);
        table.column('Studienort:name').visible(false, false);
    }
    else {
        // Logik für deaktivierten Einfügemodus
        $('#menu-cell-insertmode').removeClass('menu-insert-mode-active'); // Untermenü "menu-cell-editmode" farblich auf standard zurücksetzen
        table.column('Studiengang-Info:name').visible(false, false);
        table.column('Name des Studiengangs:name').visible(true, false);
        table.column('Abschluss:name').visible(true, false);
        table.column('Fachbereich:name').visible(true, false);
        table.column('Studienort:name').visible(true, false);
        $('#resultTable tbody td').removeAttr('contenteditable'); // Keine Zelle ist mehr editierbar
        /* Zeilen, welche durch die Funktion "add_new_student_to_dataTable" die CSS-Klasse "new-row" bekommen haben werden gelöscht.
        Das bedeutet, dass wenn neue Studenten/Zeilen angelegt wurden, man den Modus deaktivert, dann werden diese Zeilen wieder aus DataTable gelöscht.*/
        table.rows('.new-row').remove();
        table.draw(false); // Zeichnet Tabelle neu. "false" sorgt dafür, dass User auf der aktuellen Seite der Tabelle bleibt.
        newStudents = {} // Zwischenspeicher für neue Zeilen leeren.
    }
}



function add_new_student_to_dataTable(e) {
     e.preventDefault();

    if(insertMode_AkinsertModeAktivtiv === false){
        alert("Um Student(en) anzulegen, bitte Einfügemodus aktivieren.");
        return;
    }

    let newID = createID();
    
    const newStudent = {
        "student_id": newID, 
        "uid": "", // Startwert leer
        "givenName": "",
        "sn": "",
        "mail": "",
        "Studiengang-Info": ""
        };

    // Neue Zeile zur DataTable hinzufügen und zeichnen. "node()" holt die <tr> Instant, sodass man die neue Zeile direkt manipulieren kann.
    const newRow = table.row.add(newStudent).draw(false).node();
    $(newRow).addClass('new-row'); // Die neue Zeile direkt gelb markieren, damit man sieht, dass sie neu ist

    create_and_render_new_dropdown(newRow);
    //$('#resultTable tbody').on('change.editMode', 'select.study-info-dropdown', change_dropdown_data_local); // Fügt Listener auf Änderung des selektierten Dropdown-Inhalts und führt dann immer "change_dropdown_data_local()" aus.

    const newCells = $(newRow).find('td').not(':first-child, :nth-last-child(-n+17)');
    newCells.attr('contenteditable', 'true');

    newStudents[newID] = newStudent; // Neuer leerer Student/Zeile zu "newStudents" hinzufügen.

    newCells.on('blur', { studentID: newID }, handle_new_student_cell_blur);
    $(newRow).find('select.study-info-dropdown').on('change', { studentID: newID }, handle_new_student_dropdown_change);
}




/*
Diese Funktion reduziert jeden Studenteneintrag und erweitert es gleichzeitig um den konkatenierten Studiengangseintrag, z.B. "Studiengang016"

newStudents VOR "filter_new_students_set":
{
    91: {Abschluss: "Promotion Kolleg", Fachbereich: "Fachbereich Maschinenbau", "Name des Studiengangs": "Wirtschaftsingenieurwesen", "Studiengang-Info": "", "Studiengang-Info": "", Studienort: "Bocholt", givenName: "x", mail: "x.x@studmail.w-hs.de", sn: "x", student_id: 91, uid: "xx12345"},
    ...
}

newStudents NACH "filter_new_students_set":
{
    91: {givenName: "x", mail: "x.x@studmail.w-hs.de", sn: "x", student_id: 91, studyBranch1: "Studiengang016", uid: "xx12345"},
    ...
}
*/
function filter_new_students_set() {
    // Wir erstellen ein neues, sauberes Objekt für die gefilterten Daten
    let filteredStudents = {};
    let concatNameSTG

    // Wir gehen durch jeden einzelnen Suchreiter (studentId) in newStudents
    for (let studentId in newStudents) {
        if (newStudents.hasOwnProperty(studentId)) {
            const student = newStudents[studentId]; // {student_id: 91, uid: "xx12345", givenName: "x", sn: "x", mail: "x.x@studmail.w-h.de", "Studiengang-Info": "", "Name des Studiengangs": "Wirtschaftsingenieurwesen", Abschluss: "Promotion Kolleg", Fachbereich: "Fachbereich Maschinenbau", Studienort: "Bocholt"}
            const stgName = student["Name des Studiengangs"]; // Wirtschaftsingenieurwesen
            const searchCriteria = {
                "Name des Studiengangs": student["Name des Studiengangs"], // Wirtschaftsingenieurwesen
                "Abschluss": student["Abschluss"], // Promotion Kolleg
                "Fachbereich": student["Fachbereich"], // Fachbereich Maschinenbau
                "Studienort": student["Studienort"] // Bocholt
            };

            const matchingKey = Array.from(course_data.entries()).find(([key, details]) => {
                return Object.entries(searchCriteria).every(
                    ([searchKey, searchValue]) => details[searchKey] === searchValue
                );
            })?.[0];
            concatNameSTG = matchingKey; // Studiengang016

            // Das Objekt radikal minimieren und exakt so aufbauen wie gewünscht:
            filteredStudents[studentId] = {
                student_id: Number(studentId), // ID als echte Zahl speichern
                uid: student.uid,
                givenName: student.givenName,
                sn: student.sn,
                mail: student.mail,
                studyBranch1: concatNameSTG
            };
        }
    }

    // Das alte newStudents-Objekt mit den frisch gefilterten und geschrumpften Daten überschreiben
    newStudents = filteredStudents;
}



function send_new_student_to_db(e){
    filter_new_students_set();
    if (Object.keys(newStudents).length === 0) {
            alert("Keine Neuerungen zum Speichern vorhanden.");
            return;
        }

        $.ajax({
            url: './data.php',
            type: 'POST',
            data: { new_data: newStudents },
            "success": function() {
                // Insert erfogreich (HTTP 200)
                changedStudents = {}; // Zwischenspeicher leeren
                newStudents = {}; // Zwischenspeicher leeren
                table.column('Studiengang-Info:name').visible(false, false);
                table.column('Name des Studiengangs:name').visible(true, false);
                table.column('Abschluss:name').visible(true, false);
                table.column('Fachbereich:name').visible(true, false);
                table.column('Studienort:name').visible(true, false);
                insertModeAktiv = false;
                $('.new-row').removeClass('new-row');
                $('#menu-cell-insertmode').removeClass('menu-insert-mode-active');
                table.ajax.reload(); // Tabelle neu laden
                alert("Neuerungen erfolgreich gespeichert.");
            },
            "error": function(xhr) {
                let response = JSON.parse(xhr.responseText);
                alert("Fehler:\n" + response.message);
            }
        });
}



//-------------------------------------------------------------------------------------------------



//Aktiviert Bearbeitungsmodus für Zellen.
function activate_deaktivate_edit_mode(e){
    e.preventDefault();
    updateModeAktiv = !updateModeAktiv;

    //const editableCells = $('#resultTable tbody td').not(':first-child, :last-child, :nth-last-child(2)');
    //const editableCells = $('#resultTable tbody td').not(':first-child, :nth-last-child(-n+17)');
    /* "editableCells" definiert Auswahl an Zellen, welche editierbar gemacht werden können, wenn man später im Code 
    die Editierung aktiviert. Die Zellen involvieren alle außer die erste "id" und die letzten 16.*/

    if(updateModeAktiv){
        // Prüfen, ob es noch nicht committete inserts oder deletes gibt.
        if(insertModeAktiv == true || deleteModeAktiv === true || (Object.keys(newStudents).length !== 0) || (table.rows('selected').count() !== 0)){
            alert("Sie können keine Studentendaten ändern sofern der Einfügemodus oder Zeilenaiswahlmodus noch aktiviert sind oder Sie noch ausstehende Daten zum Insert oder Löschen haben.\nBitte Insert, Update, Delete getrennt voneinander behandeln.");
            updateModeAktiv = false;
            return;
        }

        // Logik für aktivierten Bearbeitungsmodus
        $('#menu-cell-editmode').addClass('menu-edit-mode-active'); // Untermenü "menu-cell-editmode" farblich hervorheben
        table.column('Studiengang-Info:name').visible(true, false);
        table.column('Name des Studiengangs:name').visible(false, false);
        table.column('Abschluss:name').visible(false, false);
        table.column('Fachbereich:name').visible(false, false);
        table.column('Studienort:name').visible(false, false);
        const editableCells = $('#resultTable tbody td').not(':first-child, :nth-last-child(-n+17)');
        editableCells.attr('contenteditable', 'true'); // Macht Zellen editierbar
        $('#resultTable tbody').on('blur.editMode', 'td[contenteditable]', change_data_local); // Fügt Listener auf Fokuswechsel der Zellen und führt bei Fokusverlust immer "change_data_local()" aus.
        render_all_dropdown(); // Für Spalte "Studienganginfo" wird pro Zelle ein Dropdown-Menü angezeigt.
        $('#resultTable tbody').on('change.editMode', 'select.study-info-dropdown', change_dropdown_data_local); // Fügt Listener auf Änderung des selektierten Dropdown-Inhalts und führt dann immer "change_dropdown_data_local()" aus.
        $('#resultTable tbody').on('focus.editMode', 'select.study-info-dropdown', save_old_dropdown_value);
    }
    else {
        // Logik für deaktivierten Bearbeitungsmodus
        const editableCells = $('#resultTable tbody td').not(':first-child, :nth-last-child(-n+17)');
        $('#resultTable tbody').off('blur.editMode'); // Entfernt Listener auf Fokusverlust
        $('#resultTable tbody').off('change.editMode', 'select.study-info-dropdown'); // Entfernt Listener auf geänderte Werte von Dropdown
        editableCells.removeAttr('contenteditable'); // Macht Zellen nicht mehr editierbar
        $('#menu-cell-editmode').removeClass('menu-edit-mode-active'); // Untermenü "menu-cell-editmode" farblich auf standard zurücksetzen
        remove_dropdown();
        table.column('Studiengang-Info:name').visible(false, false);
        table.column('Name des Studiengangs:name').visible(true, false);
        table.column('Abschluss:name').visible(true, false);
        table.column('Fachbereich:name').visible(true, false);
        table.column('Studienort:name').visible(true, false);
        changedStudents = {} // Zwischenspeicher für bearbeitete Zeilen leeren.
        reset_lokal_data_per_editMode_deaktivation();
    }
}



/*
* Macht Zellen bearbeitbar.
* Wenn Zelleninhalt verändert, dann hebt sich Zelle farblich hervor bis die Änderungen an DB commitet werden.
* Es sei denn man mach die Änderungen manuell Rückgängig, indem man den ursprünglichen Zellenwert wieder hineinschreibt.
* Veränderungen des Inhaltes der Zelle, werden in "changes" gespeichert.
+ Veränderungen bestehen aber nur lokal im Dokument. Sie werden hier nicht an DB weitergereicht.
*/


/*
Szenario: Zelleninhalt aus Zeile 1 und Spalte "givenName" wurde geändert von "Max" zu "Maxx".
* cell -> Object { 0: (1) […], context: (1) […], length: 1, selector: {…}, tables: (), table: (), draw: (), page: (), ajax: {…}, rows: (), … }

* rowData -> { student_id: 1, uid: "ma12345", givenName: "Max", sn: "Mustermann", mail: "max.mustermann@studmail.w-hs.de\n", "Name des Studiengangs": "Weiterbildungszertifikat", Abschluss: "Bachelor", Fachbereich: "kein Fachbereich", Studienort: "Bocholt", source_studyBranch1: "008",
source_created_at: "2026-04-21 16:33:02", source_updated_at: "2026-04-27 12:18:31", override_id: 1, override_created_by: "ma46961", override_updated_by: "Moderator_DataTable", override_created_at: "2026-04-27 15:37:41", override_updated_at: "2026-05-27 15:31:02",
overr_uid: 0, overr_givenName: 0, overr_sn: 1, overr_mail: 0, overr_stg_name: 0, overr_abschluss: 0, overr_fachbereich: 0, overr_studienort: 1
}

* colIndex -> 2
* colName -> givenName
* newValue -> Maxx

Wenn in newValue nichts steht, dann <empty string>
*/
function change_data_local(){
    const cell = table.cell(this); //Zelle mit aktuellem Fokus.
    const rowIndex = cell.index().row; //Zeilennummer
    const rowData = table.row($(this).closest('tr')).data(); //Vollst. zugehöriger Zeileninhalt der Zelle. (Umfasst keine geänderten Daten)

    // Es wird die Zeilennummer als key und die ALTEN Daten dieser Zeile als value in globaler Datenstruktur gespeichert. Diese braucht man für "activate_deaktivate_edit_mode".
    if (old_local_row_data[rowIndex] === undefined) {
        old_local_row_data[rowIndex] = JSON.parse(JSON.stringify(rowData));        
    }

    const colIndex = cell.index().column; //Spaltennummer.
    const colName = table.settings().init().columns[colIndex].data; //Spalten- bzw. Attributname der Zelle.
    const newValue = $(this).text(); //Neuer Inhalt der Zelle.

    // Alten Wert sicher auslesen (wenn null oder undefined, dann leerer String)
    let oldValue = (rowData[colName] !== null && rowData[colName] !== undefined) ? rowData[colName] : "";

    // Beide Werte strikt in getrimmte Strings umwandeln
    let cleanOld = oldValue.toString().trim();
    let cleanNew = newValue.toString().trim();

    // cleanOld und cleanNew inhaltlich vergleichen
    if (cleanOld !== cleanNew) { 
        if (!changedStudents[rowData.student_id]) {
            changedStudents[rowData.student_id] = {}; // {student_id: {}}
        }
        changedStudents[rowData.student_id][colName] = cleanNew; // Den sauberen Wert speichern -> {student_id: {attribut1: attributwert, ...}, ...}
        $(this).addClass('cell-edited'); // Markiert geänderte Zelle gelb
    } else { // Falls der Nutzer eine Änderung zurücknimmt, ...
        if (changedStudents[rowData.student_id]) { // Gibt es in changedStudents überhaupt einen Eintrag für diesen Studenten?
    
            // Das spezifische Attribut (z. B. "mail") aus dem Objekt löschen
            delete changedStudents[rowData.student_id][colName];
            $(this).removeClass('cell-edited'); // Zeile wird nicht mehr gelb hervorgehoben.
            
            // Prüfen, ob für diesen Studenten jetzt überhaupt noch Änderungen übrig sind
            // Object.keys().length zählt, wie viele Attribute (wie givenName, sn...) noch drinstecken
            if (Object.keys(changedStudents[rowData.student_id]).length === 0) {
                
                // Wenn das Objekt komplett leer ist {}, löschen wir die ganze ID-Schublade
                delete changedStudents[rowData.student_id];
            }
        }
    }
}



function save_old_dropdown_value(event){
    const dropdownElement = $(event.target);
    const rowIndex = dropdownElement.data('row');
    const colIndex = dropdownElement.data('col');
    
    // Wir bauen uns den eindeutigen Schlüssel: "row-X-col-Y"
    const cellKey = 'row-' + rowIndex + '-col-' + colIndex;

    // Nur speichern, wenn wir für diese Zelle noch keinen Originalwert registriert haben
    if (originalDropdownValues[cellKey] === undefined) {
        originalDropdownValues[cellKey] = dropdownElement.val();
    }
}



function change_dropdown_data_local(event) {
    const $dropdown = $(event.target);
    const rowIndex = $dropdown.data('row');
    const colIndex = $dropdown.data('col'); // Spalten werden in DataTable ab "0" gezählt.
    const cellKey = 'row-' + rowIndex + '-col-' + colIndex;
    let studentID = table.cell(rowIndex, colIndex).data().student_id;
    const old_data = originalDropdownValues[cellKey]; // James Bond, Bachelor, kein Fachbereich, Gelsenkirchen
    const new_data = $dropdown.val(); // Wirtschaftsingenieurwesen, Bachelor, Fachbereich Maschinbau, Umwelt- und Gebäudetechnik und Informationstechnik, Gelsenkirchen | Das ist ein einziger String

    new_data_split = new_data.split(', ').map(item => item.trim());

    const new_data_obj = {
        "Name des Studiengangs": new_data_split[0], // Wirtschaftsingenieurwesen
        "Abschluss": new_data_split[1], // Bachelor
        "Fachbereich": new_data_split.slice(2, -1).join(', '), // Fachbereich Maschinbau, Umwelt- und Gebäudetechnik und Informationstechnik
        "Studienort": new_data_split[new_data_split.length - 1]} // Gelsenkirchen

    // Findet den ersten Key, bei dem ALLE Kriterien übereinstimmen, Beispiel für key: Wirtschaftsingenieurwesen
    const matchingKey = Array.from(course_data.entries()).find(([key, details]) => {
        return Object.entries(new_data_obj).every(
            ([searchKey, searchValue]) => details[searchKey] === searchValue
        );
    })?.[0];

    let stg_Nr_concat = matchingKey

    if (changedStudents[studentID] === undefined) { // Wenn keinen Eintrag dieses Studenten als key hat, dann ...
        changedStudents[studentID] = {}; // Key "studentID" hinzufügen.
    }


    if (new_data !== old_data) {
        // Wert wurde verändert -> Gelb färben
        $dropdown.addClass('dropdown-edited');
    } else {
        // Ursprünglicher Wert wurde wieder ausgewählt -> Farbe weg
        $dropdown.removeClass('dropdown-edited');
    }


    /*
    In "changedStudents" wird für den Key "studentID" in dessen Values ein
    neuer Key "studyBranch1" erstellt und diesem dem Wert stg_Nr zugeordnet.
    Vorher:  {12:{givenName: "ccc", mail: "ccc", sn: "ccc", uid: "ccc"}, 16:{...}, ...}
    Nachher: {12:{givenName: "ccc", mail: "ccc", sn: "ccc", uid: "ccc", studyBranch1: "Studiengang007"}, 16:{...}, ...}
    */
    changedStudents[studentID].studyBranch1 = stg_Nr_concat;
}




function reset_lokal_data_per_editMode_deaktivation(){
    //changedStudents -> {70: {uid: "aaa", givenName: "aaa", sn: "aaa", mail: "aaa", studyBranch1: "Studiengang326"}}
    // 1. Durchlaufe alle gespeicherten Zeilennummern (Keys) in der Struktur
    for (let rowIndex in old_local_row_data) {
        if (old_local_row_data.hasOwnProperty(rowIndex)) {
            
            // Die gesicherten Originaldaten dieser Zeile holen
            const originalData = old_local_row_data[rowIndex];
            
            // DataTables sagen: Überschreibe die Daten an diesem exakten rowIndex
            table.row(rowIndex).data(originalData);            
        }
    }
    
    // Die Tabelle einmal neu zeichnen, damit die Änderungen visuell sichtbar werden
    // false sorgt dafür, dass die aktuelle Paginierungs-Seite beibehalten wird
    table.draw(false);
    
    old_local_row_data = {};
}





//Zellenveränderungen werden an DB weitergereicht.
function commit_changed_student_to_db(e){
    e.preventDefault();

    if(updateModeAktiv === false){
        alert("Um Student(en) zu bearbeiten, bitte Einfügemodus aktivieren.");
        return;
    }
        
    if (updateModeAktiv === true && Object.keys(changedStudents).length === 0) {
        alert("Keine Änderungen zum Speichern vorhanden.");
        return;
    }

    $.ajax({
        url: './data.php',
        type: 'POST',
        data: { update_data: changedStudents },
        "success": function() {
            // Update erfogreich (HTTP 200)
            updateModeAktiv = false;
            const editableCells = $('#resultTable tbody td').not(':first-child, :nth-last-child(-n+17)');
            $('#resultTable tbody').off('blur.editMode'); // Entfernt Listener auf Fokusverlust
            $('#resultTable tbody').off('change.editMode', 'select.study-info-dropdown'); // Entfernt Listener auf geänderte Werte von Dropdown
            editableCells.removeAttr('contenteditable'); // Macht Zellen nicht mehr editierbar
            $('#menu-cell-editmode').removeClass('menu-edit-mode-active'); // Untermenü "menu-cell-editmode" farblich auf standard zurücksetzen
            remove_dropdown();
            table.column('Studiengang-Info:name').visible(false, false);
            table.column('Name des Studiengangs:name').visible(true, false);
            table.column('Abschluss:name').visible(true, false);
            table.column('Fachbereich:name').visible(true, false);
            table.column('Studienort:name').visible(true, false);
            changedStudents = {} // Zwischenspeicher für bearbeitete Zeilen leeren.
            //reset_lokal_data_per_editMode_deaktivation();
            old_local_row_data = {}
            table.ajax.reload();
            alert("Änderungen erfolgreich gespeichert.");
        },
        "error": function(xhr) {
            let response = JSON.parse(xhr.responseText);
            alert("Fehler:\n" + response.message);
        }
    });
}





//Aktiviert Zeilenauswahlmodus für Zeilen.
function activate_deaktivate_selection_mode(e){
    e.preventDefault();

    deleteModeAktiv = !deleteModeAktiv;

    // Wir wählen alle Zellen aus, die normalerweise editierbar sind
    // (hier nutzen wir den gleichen Filter wie in deiner createdRow)
    const editableCells = $('#resultTable tbody td').not(':first-child, :nth-last-child(-n+16)');

    if (deleteModeAktiv) {
        // Prüfen, ob es noch nicht committete inserts oder updates gibt.
        if(insertModeAktiv == true || updateModeAktiv === true || (Object.keys(newStudents).length !== 0) || (Object.keys(changedStudents).length !== 0)){
            alert("Sie können keine Studenten löschen sofern der Einfügemodus oder Zellenbearbeitungsmodus noch aktiviert ist oder Sie noch ausstehende Daten zum Insert oder Update haben.\nBitte Insert, Update, Delete getrennt voneinander behandeln.");
            deleteModeAktiv = false;
            return;
        }

        // Logik für aktivierten Zeilenauswahlmodus
        $('#menu-selection-mode').addClass('menu-selection-mode-active'); // Untermenü "menu-selection-mode" farblich hervorheben
        //editableCells.attr('contenteditable', false); // DEAKTIVIEREN: Alle Zellen für Eingaben sperren

        // Wenn Zeile angeklickt, dann farblich hervorheben und als "selected" kennzeichnen. Fügt als Listener auf Zeilen hinzu.
        $('#resultTable tbody').on('click.selectionMode', 'tr', function() {
            $(this).toggleClass('selected');
        });


    // Logik für deaktivierten Zeilenauswahlmodus
    } else {
        $('#menu-selection-mode').removeClass('menu-selection-mode-active'); // Untermenü "menu-selection-mode" farblich auf standard zurücksetzen
        $('#resultTable tbody tr').removeClass('selected'); // Alle aktuell selektierten Zeilen optisch zurücksetzen.
        $('#resultTable tbody').off('click.selectionMode'); // Zeilen sind nicht länger anklickbar. Entfertn also Listener auf Zeilen.
    }
}



// Sobald Zeilen im Zeilenauswahlmodul ausgewählt wurden, werden sie bei Bestätigung im Meldefenster erst aus DB gelöscht und dann lokal im Dokument.
// Wenn keine Zeilen vorher ausgewählt wurden, erscheint Mitteilung.
function delete_student(e){
    e.preventDefault(); // Verhindert, dass die Seite nach oben springt
        
    // IDs der markierten Zeilen sammeln
    let selectedRows = table.rows('.selected');
    let selectedRowsData = selectedRows.data().toArray();
    let idsToDelete = selectedRowsData.map(row => row.student_id); // Enthält IDs also die Primärschlüssel der Zeilen bzw. Tupel, die aus der DB gelöscht werden sollen

    if(deleteModeAktiv === false){
        alert("Um Student(en) zu löschen, bitte Zeilenauswahlmodus aktivieren und mind. eine Zeile/Student auswählen.");
        return;
    }
    // Wenn keine Zeilen angeklickt wurden, bevor die Löschfunktion aufgerufen wurde ...
    if (idsToDelete.length === 0 || idsToDelete[0] === undefined) {
        alert("Nichts zum löschen ausgewählt.");
        return;
    }

    // Bestätigungsfenster vor requenst an DB geht
    if (confirm("Möchten Sie wirklich " + idsToDelete.length + " Studenten löschen?")) {
        
        // AJAX-Ruf an PHP zum Löschen aus der Datenbank
        $.ajax({
            url: './data.php',
            type: 'POST',
            data: { delete_ids: idsToDelete },
            "success": function() {
                // Löschung erfogreich (HTTP 200)
                selectedRows.remove().draw(); 
                alert("Erfolgreich gelöscht.");

                // Auswahllogik beenden
                deleteModeAktiv = false; 
                $('#menu-select-student').removeClass('menu-auswahl-active'); 
                $('#menu-selection-mode').removeClass('menu-selection-mode-active'); 
                $('#resultTable tbody tr').removeClass('selected'); 
                $('#resultTable tbody').off('click.selectionMode'); 
            },
            "error": function(xhr) {
                // Löschung erfolglos (HTTP 500)
                // Die Markierungen in der Tabelle bleiben für den User zur Orientierung erhalten
                alert(xhr.responseText);
            }
        });
    }
}








// Funktion umfasst alle Funktionalität, die bestehen sobald Dokument geladen wurde.
$(document).ready(function() {

    load_data(); // Laden von Daten aus DB in Dokument

    // Wenn Klick auf Untermenü "DB neu laden", dann "reload_data" ausführen.
    $('#menu-tabelle-neu-laden').on('click', reload_data);

    $('#menu-export-csv').on('click', exportAsCSV);
    $('#menu-export-xlsx').on('click', exportAsXLSX);

   

    $('#menu-cell-insertmode').on('click', activate_deaktivate_insert_mode);
    $('#menu-create-new-student').on('click', add_new_student_to_dataTable);
    $('#menu-save-new-student').on('click', send_new_student_to_db);



    $('#menu-cell-editmode').on('click', activate_deaktivate_edit_mode);
    $('#menu-save-changed-student').on('click', commit_changed_student_to_db);



    $('#menu-selection-mode').on('click', activate_deaktivate_selection_mode);
    $('#menu-delete-student').on('click', delete_student);


    // Wenn klick auf Untermenü "Info", dann öffnen von Meldefenster mit Infos.
    $('#menu-info').on('click', function(e) {
        e.preventDefault(); // Verhindert, dass die Seite nach oben springt
        const anzahl = table.rows().count();
        alert("Version 3\nEntwickler Sebastian Friedrich");
    });

})