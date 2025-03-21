CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(255) NOT NULL
);

CREATE TABLE filmes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_filme VARCHAR(255) NOT NULL,
    nome_indicado VARCHAR(255) NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);