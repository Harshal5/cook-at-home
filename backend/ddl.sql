create table user (
    user_id int not null auto_increment ,
    name varchar(100) not null,
    mobile numeric(10) not null ,
    email varchar(50) not null,
    password varchar(50) not null
    primary key(user_id)
)