CREATE DATABASE clinic_db;
USE clinic_db;

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Pesel CHAR(20),
    Street VARCHAR(100),
    City VARCHAR(50),
    ZipCode CHAR(10)
);

INSERT INTO patients (FirstName, LastName, Pesel, Street, City, ZipCode) VALUES
('Patryk', 'Mrzygłod', '10234568912', 'Fabryczna', 'Kraków', '11-431'),
('Anna', 'Lewandowska', '12345678901', 'Złota', 'Warszawa', '11-234'),
('Robert', 'Błaszczykowski', '12345678901', 'Główna', 'Gdańsk', '13-301'),
('Weronika', 'Zakrzewska', '12345678901', 'Globalna', 'Piaseczno', '11-034'),
('Mariusz', 'Wilanowski', '12345678901', 'Długa', 'Myślenice', '72-001'),
('Waldemar', 'Kowalski', '9876543211', 'Milanowska', 'Gdów', '65-012'),
('Krystian', 'Nowogórski', '12345673212', 'Warmińska', 'Poznań', '23-631'),
('Waleria', 'Nowogrodzka', '10234568912', 'Kalwaryjska', 'Wrocław', '00-002'),
('Emilia', 'Zwolińska', '12345678901', 'Owocowa', 'Lublin', '96-908'),
('Kamil', 'Ostafiński', '98763801982', 'Krupnicza', 'Kraków', '93-932');
