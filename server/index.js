import express from "express";
import mysql from "mysql2";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	}),
);
app.use(express.json());

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

db.connect((error) => {
	if (error) {
		throw error;
	}
	console.log("Connected!!!");
});

const port = 3000;

app.get("/", (req, res) => {
	res.send("Working...");
});

app.post("/patients", (req, res) => {
	const { FirstName, LastName, Pesel, Street, City, ZipCode } = req.body;
	const query =
		"INSERT INTO patients (FirstName, LastName, Pesel, Street, City, ZipCode) VALUES (?, ?, ?, ?, ?, ?)";

	db.query(query, [FirstName, LastName, Pesel, Street, City, ZipCode], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: "Adding patient error " });
			return;
		}
		res.status(201).json({ message: `Patient added with ID: ${results.insertId}` });
	});
});
app.get("/patients", (req, res) => {
	const query = "SELECT * FROM patients";

	db.query(query, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: "Error fetching patients" });
			return;
		}
		res.status(200).json(results);
	});
});
app.delete("/patients/:id", (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM patients WHERE id = ?";

	db.query(query, [id], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: "Error deleting patient" });
			return;
		}
		if (results.affectedRows === 0) {
			res.status(404).json({ message: "Patient not found" });
		} else {
			res.status(200).json({ message: `Patient with ID: ${id} has been deleted` });
		}
	});
});
app.patch("/patients/:id", (req, res) => {
	const { id } = req.params;
	const { FirstName, LastName, Pesel, Street, City, ZipCode } = req.body;
	const query = `
    UPDATE patients
    SET FirstName = ?, LastName = ?, Pesel = ?, Street = ?, City = ?, ZipCode = ?
    WHERE id = ?
  `;

	db.query(query, [FirstName, LastName, Pesel, Street, City, ZipCode, id], (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: "Error updating patient" });
			return;
		}
		if (results.affectedRows === 0) {
			res.status(404).json({ message: "Patient not found" });
		} else {
			res.status(200).json({ message: `Patient with ID: ${id} has been updated` });
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
