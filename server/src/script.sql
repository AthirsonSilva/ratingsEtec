create database dbratings; 
use dbratings;

drop table if exists rating;

create table rating (
	id int(11) not null auto_increment,
	subject varchar(255) not null,
	teacher varchar(255) not null,
	student varchar(255) not null,
	positiveMessage varchar(255) not null,
	negativeMessage varchar(255) not null,
	primary key (id)
);

insert into rating (subject, teacher, student, positiveMessage, negativeMessage)
values 
	('Test subject', 'Fulado', 'Ciclano', 'Fortíssimo', 'Fraquissímo');

select * from rating;
