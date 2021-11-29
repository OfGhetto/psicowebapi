-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'psicologia infantil'),(2,'psicologia laboral');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'pendiente'),(2,'aprobado'),(3,'rechazado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_reserva`
--

DROP TABLE IF EXISTS `estado_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `estado_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_horario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_reserva`
--

LOCK TABLES `estado_reserva` WRITE;
/*!40000 ALTER TABLE `estado_reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ficha_clinica`
--

DROP TABLE IF EXISTS `ficha_clinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficha_clinica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `motivo_consulta` varchar(45) NOT NULL,
  `paciente_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ficha_clinica_paciente1_idx` (`paciente_id`),
  CONSTRAINT `fk_ficha_clinica_paciente1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ficha_clinica`
--

LOCK TABLES `ficha_clinica` WRITE;
/*!40000 ALTER TABLE `ficha_clinica` DISABLE KEYS */;
INSERT INTO `ficha_clinica` VALUES (1,'2021-07-21','depresion',1),(2,'2021-07-21','depresion',8),(3,'2021-07-21','sdjfkasdfjokfsdf',7),(4,'2021-07-21','Estres',6),(5,'2021-07-21','Estres',5);
/*!40000 ALTER TABLE `ficha_clinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_sesiones`
--

DROP TABLE IF EXISTS `historial_sesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_sesiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `asistencia` tinyint NOT NULL,
  `anamnesis` varchar(2000) DEFAULT NULL,
  `ficha_clinica_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_historial_sesiones_ficha_clinica1_idx` (`ficha_clinica_id`),
  CONSTRAINT `fk_historial_sesiones_ficha_clinica1` FOREIGN KEY (`ficha_clinica_id`) REFERENCES `ficha_clinica` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_sesiones`
--

LOCK TABLES `historial_sesiones` WRITE;
/*!40000 ALTER TABLE `historial_sesiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_sesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) NOT NULL,
  `hora` varchar(45) NOT NULL,
  `profesional_id` int NOT NULL,
  `estado_horario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_horas_profesional1_idx` (`profesional_id`),
  KEY `fk_horario_estado_horario1_idx` (`estado_horario_id`),
  CONSTRAINT `fk_horario_estado_horario1` FOREIGN KEY (`estado_horario_id`) REFERENCES `estado_horario` (`id`),
  CONSTRAINT `fk_horas_profesional1` FOREIGN KEY (`profesional_id`) REFERENCES `profesional` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_de_nacimiento` date NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_paciente_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_paciente_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1,'1997-08-03',2),(2,'2001-07-13',14),(3,'2002-07-13',15),(4,'2003-07-13',16),(5,'1997-08-03',1),(6,'1998-07-13',17),(7,'2003-07-13',18),(8,'2001-07-13',19);
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesional`
--

DROP TABLE IF EXISTS `profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesional` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activo` tinyint NOT NULL,
  `rnpi` int NOT NULL,
  `fecha_solicitud` date NOT NULL,
  `actualizacion_solicitud` date DEFAULT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `estado_id` int NOT NULL,
  `especialidad_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profesional_usuario1_idx` (`usuario_id`),
  KEY `fk_profesional_estado1_idx` (`estado_id`),
  KEY `fk_profesional_especialidad1_idx` (`especialidad_id`),
  CONSTRAINT `fk_profesional_especialidad1` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidad` (`id`),
  CONSTRAINT `fk_profesional_estado1` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`),
  CONSTRAINT `fk_profesional_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesional`
--

LOCK TABLES `profesional` WRITE;
/*!40000 ALTER TABLE `profesional` DISABLE KEYS */;
INSERT INTO `profesional` VALUES (1,1,4546546,'2021-07-19','2021-07-21','profesional capacitado en terapia infantil',1,1,1),(2,1,4565465,'2021-07-19','2021-07-21','profesional capacitado en terapia infantil',4,1,1),(3,1,2345455,'2021-07-20','2021-07-21','profesional capacitado en psicologia laboral',10,1,1),(4,1,3547389,'2021-07-21','2021-07-21','profesional especializado en el área infantil',20,2,1);
/*!40000 ALTER TABLE `profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `profesional_id` int NOT NULL,
  `paciente_id` int NOT NULL,
  `estado_reserva_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reserva_profesional_idx` (`profesional_id`),
  KEY `fk_reserva_paciente1_idx` (`paciente_id`),
  KEY `fk_reserva_estado_reserva1_idx` (`estado_reserva_id`),
  CONSTRAINT `fk_reserva_estado_reserva1` FOREIGN KEY (`estado_reserva_id`) REFERENCES `estado_reserva` (`id`),
  CONSTRAINT `fk_reserva_paciente1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id`),
  CONSTRAINT `fk_reserva_profesional` FOREIGN KEY (`profesional_id`) REFERENCES `profesional` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'paciente'),(2,'profesional'),(3,'admin');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `pass_recovery` varchar(45) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `rut` varchar(45) NOT NULL,
  `genero` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  KEY `fk_usuario_rol1_idx` (`rol_id`),
  CONSTRAINT `fk_usuario_rol1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'ejemplo@gmail.com','12345',NULL,NULL,'Fabian','Soto','19123123-3','Masculino','912312312',2),(2,'ejemplo1@gmail.com','12345',NULL,NULL,'Fabian','Alarcon','19123133-4','Masculino','946536225',1),(4,'ejemplo2@gmail.com','12345',NULL,NULL,'Matias','Elgueta','19999999-3','Masculino','965473565',2),(6,'ejemplo3@gmail.com','12345',NULL,NULL,'Jose','Perez','19999549-1','Masculino','945375675',2),(7,'ejemplo4@gmail.com','12345',NULL,NULL,'Milton','Rodriguez','19432434-3','Masculino','965463456',2),(9,'ejemplo5@gmail.com','1234',NULL,NULL,'Alexis','Sanchez','19564654-3','Masculino','967454366',2),(10,'ejemplo6@gmail.com','1234',NULL,NULL,'Mauricio','Isla','19624565-4','Masculino','965436455',2),(11,'ejemplo7@gmail.com','1234',NULL,NULL,'Patricia','Rojas','19736366-3','Femenino','923465643',1),(12,'ejemplo8@gmail.com','123',NULL,NULL,'Brayan','Pereira','19652477-5','Masculino','953465477',1),(13,'ejemplo9@gmail.com','123',NULL,NULL,'Jorge','Silva','19825462-3','Masculino','967584776',1),(14,'ejemplo10@gmail.com','123',NULL,NULL,'Daniela','Vasquez','19236534-6','Femenino','924354566',1),(15,'ejemplo11@gmail.com','123',NULL,NULL,'Tirsa','Herrera','15527654-5','Femenino','934354434',1),(16,'ejemplo12@gmail.com','123',NULL,NULL,'Juan','San Martin','14324654-8','Masculino','956554433',1),(17,'ejemplo13@gmail.com','123',NULL,NULL,'Luz','Duarte','17456464-2','Femenino','922233344',1),(18,'ejemplo14@gmail.com','123',NULL,NULL,'Jose','Martinez','19863569-3','Masculino','967655666',1),(19,'ejemplo15@gmail.com','123',NULL,NULL,'Sebastian','Soto','20432435-6','Masculino','96556644',1),(20,'franciscosaez@gmail.com','1234',NULL,NULL,'Francisco','Saez','19483745-5','Masculino','93284756',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-01 23:07:09
