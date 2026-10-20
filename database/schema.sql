/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Studiengangsliste`
--

DROP TABLE IF EXISTS `Studiengangsliste`;
CREATE TABLE `Studiengangsliste` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `STG-Nr` tinytext DEFAULT NULL,
  `Name des Studiengangs` text DEFAULT NULL,
  `Abschluss` text DEFAULT NULL,
  `Fachbereich` text DEFAULT NULL,
  `Studienort` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Studiengangsliste`
--

INSERT INTO `Studiengangsliste` (`id`, `STG-Nr`, `Name des Studiengangs`, `Abschluss`, `Fachbereich`, `Studienort`, `created_at`, `updated_at`) VALUES
(1,'002','Sicherheit in der kerntechnischen Entsorgung','Master','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(2,'007','James Bond','Bachelor','kein Fachbereich','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(3,'008','Weiterbildungszertifikat','Bachelor','kein Fachbereich','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(4,'009','Wissenschaftliche Weiterbildung','Master','kein Fachbereich','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(5,'015','Wirtschaftsingenieurwesen','Promotion Kolleg','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(6,'016','Wirtschaftsingenieurwesen','Promotion Kolleg','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:37',NULL),
(7,'017','Wirtschaftsingenieurwesen','Promotion Kolleg','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:37',NULL),
(8,'018','Wirtschaftswissenschaften','Promotion Kolleg','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:37',NULL),
(9,'019','Wirtschaftswissenschaften','Promotion Kolleg','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(10,'020','Wirtschaftsinformatik','Bachelor','Franchise','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(11,'022','Betriebswirtschafts-/lehre','Promotion Kolleg','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(12,'023','Betriebswirtschafts-/lehre','Promotion Kolleg','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:37',NULL),
(13,'025','Datenwissenschaften/Data Science','Promotion Kolleg','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:37',NULL),
(14,'026','IT-Sicherheit/Informationstechnik','Promotion Kolleg','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(15,'027','Kommunikationswissenschaften','Promotion Kolleg','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(16,'028','Umwelttechnik und Ressourcenmanagement','Promotion Kolleg','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(17,'029','Gesundheitstechnik','Promotion Kolleg','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(18,'040','Journalismus und Public Relations','Bachelor','Franchise','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(19,'060','Nachhaltiges Management','Master','Franchise','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(20,'070','Taxation','Master','Franchise','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(21,'081','Maschinenbau','Promotion Kolleg','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:37',NULL),
(22,'083','Elektrotechnik','Promotion Kolleg','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(23,'086','Informatik','Promotion Kolleg','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(24,'090','Informatik','Promotion Kolleg','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:38',NULL),
(25,'092','Maschinenbau','Promotion Kolleg','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:38',NULL),
(26,'093','Wirtschaftsrecht','Promotion Kolleg','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:38',NULL),
(27,'095','Chemie','Promotion Kolleg','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(28,'096','Biologie','Promotion Kolleg','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(29,'110','Elektrotechnik kooperativ','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(30,'115','Chemie','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(31,'117','Chemie  Teilzeit','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(32,'140','Wirtschaftsinformatik','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(33,'141','Wirtschaftsinformatik','Master','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(34,'142','Wirtschaftsinformatik dual','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(35,'150','Informatik','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(36,'151','Informatik','Master','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(37,'152','Informatik dual','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(38,'161','Internet-Sicherheit','Master','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:38',NULL),
(39,'165','Polymerwissenschaften','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(40,'166','Polymerwissenschaften Teilzeit','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(41,'180','Molekulare Biologie','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(42,'185','Nachhaltige biologische und chemische Technologien','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(43,'190','Molekulare Biologie','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:38',NULL),
(44,'220','Maschinenbau kooperativ','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(45,'230','Medieninformatik','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(46,'231','Medieninformatik','Master','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(47,'232','Medieninformatik dual','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(48,'235','Informatik und Design','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(49,'260','Digitale Systeme','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(50,'261','Digitale Systeme Teilzeit','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(51,'265','Digitale Systeme kooperativ','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(52,'270','Digitale Systeme','Master','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(53,'277','Mobilität und Logistik','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:39',NULL),
(54,'278','Unternehmenslogistik','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:39',NULL),
(55,'279','Wirtschaftsingenieurwesen','Bachelor','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:39',NULL),
(56,'280','Medizintechnik','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(57,'281','Medizintechnik Teilzeit','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(58,'282','Medizintechnik dual','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(59,'283','Künstliche Intelligenz in der Medizin','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(60,'284','Künstliche Intelligenz in der Medizin ausbildungs-, praxis-, berufsintegrierend','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(61,'285','Medizintechnik','Master','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(62,'286','Künstliche Intelligenz in der Medizin (Teilzeit)','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(63,'287','Künstliche Intelligenz in der Medizin','Master','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:39',NULL),
(64,'301','International Business Law','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:39',NULL),
(65,'302','International Business Law (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:39',NULL),
(66,'303','International Business Law (Teilzeit)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(67,'305','Wirtschaftsrecht (Teilzeit)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(68,'310','International Business Law and Business Management','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(69,'311','International Business Law and Business Management dual','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(70,'320','International Business Law and Business Management','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(71,'321','Energiesystemtechnik','Master','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(72,'325','Journalismus und Public Relations','Bachelor','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(73,'326','Kommunikationsmanagement','Master','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(74,'327','Digitaler Qualitätsjournalismus','Master','Fachbereich Informatik und Kommunikation','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(75,'330','Wirtschaftsrecht','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(76,'331','Wirtschaftsrecht (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(77,'333','Technische Gebäudeausrüstung','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(78,'334','Technische Gebäudeausrüstung','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(79,'335','Technische Gebäudeausrüstung kooperativ','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(80,'336','Technische Gebäudeausrüstung Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(81,'337','Technische Gebäudeausrüstung Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(82,'354','Wirtschaftsrecht - Steuern und Finanzen','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(83,'355','Wirtschaftsrecht - Steuern und Finanzen (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(84,'360','Wirtschaftsrecht - Steuern und Finanzen (Teilzeit)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(85,'365','Wirtschaftsrecht - Arbeitsrecht und Personal','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:40',NULL),
(86,'366','Wirtschaftsingenieurwesen - Technisches Facility Management Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(87,'367','Wirtschaftsingenieurwesen - Technisches Facility Management Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:40',NULL),
(88,'368','Wirtschaftsingenieurwesen - Technisches Facility Management','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(89,'369','Wirtschaftsingenieurwesen - Technisches Facility Management','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(90,'370','Systems Engineering in der Umwelt- und Gebäudetechnik','Master','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(91,'375','Wirtschaftsingenieurwesen - Technisches Facility Management kooperativ','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(92,'376','Mobilität und Logistik','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:41',NULL),
(93,'377','Wirtschaftsingenieurwesen Automotive','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:41',NULL),
(94,'378','Unternehmenslogistik','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:41',NULL),
(95,'379','Wirtschaftsingenieurwesen','Master','Fachbereich Ingenieur- und Naturwissenschaften','Recklinghausen','2026-04-27 09:53:41',NULL),
(96,'380','Wirtschaftsrecht','Master','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:41',NULL),
(97,'384','Wirtschaftsrecht (Teilzeit)','Master','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:41',NULL),
(98,'385','Wirtschaftsrecht - Arbeitsrecht und Personal (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:41',NULL),
(99,'386','Wirtschaftsrecht - Arbeitsrecht und Personal (Teilzeit)','Bachelor','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:41',NULL),
(100,'387','Wirtschaftsrecht (praxis- und berufsintegrierend)','Master','Fachbereich Wirtschaftsrecht','Recklinghausen','2026-04-27 09:53:41',NULL),
(101,'390','Umweltingenieurwissenschaften','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(102,'391','Umweltingenieurwissenschaften Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(103,'392','Umweltingenieurwissenschaften','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(104,'393','Umweltingenieurwissenschaften Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(105,'395','Umweltingenieurwissenschaften kooperativ','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(106,'398','Wasserstoffsysteme und Erneuerbare Energien','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(107,'399','Wasserstoffsysteme und Erneuerbare Energien (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(108,'440','Management','Master','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(109,'441','Accounting und Controlling','Master','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:41',NULL),
(110,'443','Organizational Behavior','Master','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(111,'444','Business Studies','Bachelor','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(112,'445','Business Studies dual','Bachelor','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(113,'446','Wirtschaftspsychologie','Bachelor','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(114,'447','Digital Business und IT-Management','Bachelor','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(115,'448','International Business Studies','Bachelor','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(116,'449','Entertainment-, Event- und Sportbusiness','Bachelor','Fachbereich Wirtschaft','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(117,'490','Elektrotechnik','Bachelor','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(118,'491','Elektrotechnik','Master','Fachbereich Elektrotechnik und angewandte Naturwissenschaften','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(119,'550','Maschinenbau','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(120,'551','Maschinenbau Teilzeit','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(121,'555','Wirtschaftsingenieurwesen','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(122,'556','Wirtschaftsingenieurwesen (Teilzeit)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(123,'660','Maschinenbau','Master','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:42',NULL),
(124,'700','Wirtschaft','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(125,'710','Wirtschaft dual','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(126,'715','Betriebswirtschaftslehre','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(127,'720','Betriebswirtschaftslehre (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(128,'725','International Business and Communication','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(129,'735','Steuern und Wirtschaftsprüfung','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(130,'740','Steuern und Wirtschaftsprüfung  (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(131,'745','Wirtschaftspsychologie','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:42',NULL),
(132,'760','Unternehmensrechnung','Master','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(133,'765','Management','Master','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(134,'770','Wirtschaftsinformatik','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(135,'771','Data Science','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(136,'772','Data Science (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(137,'775','Wirtschaftsinformatik dual','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(138,'780','International Management','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(139,'789','Wirtschaftsingenieurwesen','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(140,'790','Dienstleistungsmanagement','Master','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(141,'791','Business Engineering','Master','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(142,'820','Elektrotechnik - Smart Communication','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(143,'825','Elektrotechnik - Smart Communication dual','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(144,'830','Informatik.Softwaresysteme','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(145,'835','Informatik.Softwaresysteme dual','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Ahaus','2026-04-27 09:53:43',NULL),
(146,'835','Informatik.Softwaresysteme dual','Bachelor','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(147,'888','Informatik - Intelligente Systeme','Master','Fachbereich Wirtschaft und Informationstechnik','Bocholt','2026-04-27 09:53:43',NULL),
(148,'920','Mechatronik','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(149,'921','Maschinenbau','Master','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(150,'930','Bionik','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(151,'940','Bionik (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(152,'950','Mechatronik (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(153,'960','Maschinenbau','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(154,'964','Robotik und Automatisierung','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:43',NULL),
(155,'965','Robotik und Automatisierung (ausbildungs-, praxis- und berufsintegrierend)','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:44',NULL),
(156,'970','Maschinenbau (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:44',NULL),
(157,'995','Sustainable Engineering and Management','Bachelor','Fachbereich  Maschinenbau','Bocholt','2026-04-27 09:53:44',NULL),
(158,'C05','Systems Engineering','Master','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(159,'C06','Systems Engineering (praxis- und berufsintegriert)','Master','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(160,'C07','Systems Engineering (Teilzeit)','Master','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(161,'C10','Technische Gebäudeausrüstung','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(162,'C11','Technische Gebäudeausrüstung (flexibler Einstieg)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(163,'C12','Technische Gebäudeausrüstung (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(164,'C13','Technische Gebäudeausrüstung (Teilzeit)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(165,'C20','Facility Management','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(166,'C21','Facility Management flexibler Einstieg','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(167,'C22','Facility Management (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(168,'C23','Facility Management (Teilzeit)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(169,'C30','Umwelttechnik','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(170,'C31','Umwelttechnik (flexibler Einstieg)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(171,'C32','Umwelttechnik (ausbildungs-, praxis- und berufsintegriert)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL),
(172,'C33','Umwelttechnik (Teilzeit)','Bachelor','Fachbereich Maschinenbau, Umwelt- und Gebäudetechnik','Gelsenkirchen','2026-04-27 09:53:44',NULL);

--
-- Table structure for table `moderator_overrides`
--

DROP TABLE IF EXISTS `moderator_overrides`;
CREATE TABLE `moderator_overrides` (
  `id` int(11) NOT NULL,
  `student_id` tinytext DEFAULT NULL,
  `uid` tinytext DEFAULT NULL,
  `givenName` text DEFAULT NULL,
  `sn` text DEFAULT NULL,
  `mail` text DEFAULT NULL,
  `studyBranch1` text DEFAULT NULL,
  `created_by` tinytext DEFAULT NULL,
  `updated_by` tinytext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `moderator_overrides`
--

INSERT INTO `moderator_overrides` (`id`, `student_id`, `uid`, `givenName`, `sn`, `mail`, `studyBranch1`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1,'2','op12345','Optimus','Prime','optimus.prime@studmail.w-hs.de','Studiengang930','2026-04-27 13:37:41','2026-05-26 12:55:47', NULL, NULL),
(2,'4','lm12345','Lightning','Mcqueen','lightning.mcqueen@studmail.w-hs.de',null,'2026-06-08 12:19:12','2026-06-10 11:47:56', NULL, NULL),
(3,'8',null,null,null,null,'Studiengang007','2026-06-10 14:20:11','2026-06-11 09:30:42', NULL, NULL);

--
-- Table structure for table `students_initial`
--

DROP TABLE IF EXISTS `students_initial`;
CREATE TABLE `students_initial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` tinytext DEFAULT NULL,
  `givenName` text DEFAULT NULL,
  `sn` text DEFAULT NULL,
  `mail` text DEFAULT NULL,
  `studyBranch1` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students_initial`
--

INSERT INTO `students_initial` (`id`, `uid`, `givenName`, `sn`, `mail`, `studyBranch1`, `created_at`, `updated_at`) VALUES
(1,'av12345','Anna','Vogel','anna.vogel@studmail.w-hs.de','Studiengang007','2026-06-08 12:19:12',null),
(2,'po12345','Prime','Orion Pax','prime.orionpax@studmail.w-hs.de','Studiengang007','2026-04-27 13:37:41','2026-05-26 12:55:47'),
(3,'th12345','Tom','Hilger','tom.hilger@studmail.w-hs.de','Studiengang020',NOW(),NOW()),
(4,'lm12345','Lukas','Moritz','lukas.moritz@studmail.w-hs.de','Studiengang019','2026-06-08 12:19:12','2026-06-10 11:47:56'),
(5,'ma12345','Marie','Anders','marie.anders@studmail.w-hs.de','Studiengang083',NOW(),NOW()),
(6,'hm12345','Hannah','Müller','hannah.müller@studmail.w-hs.de','Studiengang086',NOW(),NOW()),
(7,'se12345','Sven','Ebers','sven.ebers@studmail.w-hs.de','Studiengang115',NOW(),NOW()),
(8,'ps12345','Patrick','Star','patrick.star@studmail.w-hs.de','Studiengang115','2026-06-10 14:20:11','2026-06-11 09:30:42');

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;