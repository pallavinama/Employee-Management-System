DROP DATABASE IF EXISTS ems_db;

CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  deptname VARCHAR(30) NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary decimal,
  depit_id Foreign key,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  employeeid INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id Foreign Key,
  manager_id INT,
  depitid Foreign key,
  PRIMARY KEY (roleid)
);
