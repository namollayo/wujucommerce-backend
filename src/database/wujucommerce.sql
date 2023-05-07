-- Active: 1680562191368@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,   
    name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME())
);

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name text NOT NULL,
    price REAL NOT NULL,
    price_night REAL NOT NULL,
    description TEXT NOT NULL,
    universe TEXT NOT NULL,
    image_url TEXT NOT NULL
);


DROP TABLE products;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME()),
    paid INTEGER NOT NULL DEFAULT(0), 
    FOREIGN KEY (buyer) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT,
    product_id TEXT,
    quantity INTEGER,
    nights INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE purchases_products;

SELECT * from purchases_products;