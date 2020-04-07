DROP DATABASE IF EXISTS ems_DB;

CREATE DATABASE ems_DB;

USE ems_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

-- CREATE TABLE role (
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NULL,
--   salary decimal,
--   department_id Foreign key,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE employee (
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   role_id Foreign Key,
--   manager_id INT,
--   PRIMARY KEY (id)
-- );
