CREATE DATABASE login_teste;

USE login_teste;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (email, senha)
VALUES ('admi@email.com', 'Ablubleble');
SELECT * FROM usuarios;
