/* 2021-03-20 21:56:42 [138 ms] */
CREATE TABLE tenants(
  id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
  firstName varchar(255),
  lastName varchar(255),
  email varchar(255),
  phoneNumber varchar(15),
  waNumber varchar(15),
  dateOfBirth DATE,
  isActive int,
  notes varchar(255)
) default charset utf8 comment '';
/* 2021-03-20 22:42:36 [130 ms] */
CREATE TABLE contracts(
  id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
  signed_date DATETIME,
  property_id int,
  tenant_id int
) default charset utf8 comment '';
/* 2021-03-21 08:40:50 [276 ms] */
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `propertyName` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `isActive` int DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8;
/* 2021-03-21 09:24:38 [94 ms] */
CREATE TABLE `managers` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `waNumber` varchar(15) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8;
/* 2021-03-21 14:40:37 [123 ms] */
CREATE TABLE templates(
  id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
  t_name varchar(255),
  content text
) default charset utf8 comment '';
CREATE TABLE template_sections(
  id int NOT NULL AUTO_INCREMENT,
  template_id varchar(255),
  content text,
  PRIMARY KEY (id, template_id)
) default charset utf8 comment '';