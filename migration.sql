BEGIN;
DROP TABLE IF EXISTS manufacturer;
		
CREATE TABLE manufacturer (
  man_id SERIAL,
  man_name VARCHAR(30) NOT NULL,
  domestic CHAR NOT NULL,
  PRIMARY KEY (man_id)
);

DROP TABLE IF EXISTS models;
		
CREATE TABLE models (
  id SERIAL,
  model_name VARCHAR NOT NULL,
  base_price INTEGER NOT NULL,
  electric CHAR NOT NULL,
  man_id INTEGER NOT NULL,
  CONSTRAINT fk_manModel FOREIGN KEY(man_id) REFERENCES manufacturer(man_id) ON DELETE CASCADE
);
COMMIT;