CREATE database AndroGallery;

use AndroGallery

CREATE TABLE user(
    id int(11) NOT NULL auto_increment, auto_increment=2 PRIMARY key,
    email varchar(255) NOT NULL,
    password varchar(60) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

alter TABLE user
    add nick varchar(25) NOT NULL;

create TABLE profile(
    user_id int,
    image varchar(255),
    age_of_birth date ,
	gender varchar(60) ,
	image_header varchar(255),
	biografia text,
	public_web varchar(255) ,
    foreign key (user_id) references user(id)
);

alter TABLE profile
    add primary key (user_id);

create TABLE post(
    id int(20) NOT NULL auto_increment PRIMARY key,
    src varchar(255),
    title varchar(200),
    user_id int,
    descripcion text,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foreign key (user_id) references user(id)
);





insert into user (nick, email, password) values ("prueba","asd@asd.com","123asd");