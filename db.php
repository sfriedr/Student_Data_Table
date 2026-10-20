<?php
require_once 'vendor/autoload.php'; // Aktiviert den Autoloader von Composer, damit PHP Eloquent findet
require_once 'config.php';

use Illuminate\Database\Capsule\Manager as Capsule; // Nutzt Laravel als Standalone, ohne das gesamte Laravel-Framework

$capsule = new Capsule;

// Die Verbindungsdaten zu deiner MariaDB
$capsule->addConnection([
    'driver'    => 'mysql',     // MariaDB nutzt denselben Treiber wie MySQL
    'host'      => 'localhost', // Dein Datenbank-Host (meist localhost)
    'database'  => $cfg_dbname, // <-- Hier den echten Namen deiner DB eintragen!
    'username'  => $cfg_dbuser,      // Dein Datenbank-Benutzername
    'password'  => $cfg_dbpwd,          // Dein Passwort (bei XAMPP oft leer)
    'charset'   => 'utf8mb4',   // Wichtig für Umlaute (ä, ö, ü)
    'collation' => 'utf8mb4_unicode_ci',
    'port' => '3307',
]);

// Macht diese Verbindung global verfügbar (wichtig für die Models)
$capsule->setAsGlobal();

// Bootet das Eloquent ORM
//$capsule->bootEloquent();