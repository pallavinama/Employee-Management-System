DROP DATABASE IF EXISTS ems_DB;

CREATE DATABASE ems_DB;

USE ems_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary decimal not null,
  department_id int,
  PRIMARY KEY (id),
  foreign key (department_id) references department(id) on delete cascade  
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name varchar(30) not null,
  role_id int,
  manager_id int,
  PRIMARY KEY (id),
  foreign key (role_id) references role(id) on delete cascade  
);

