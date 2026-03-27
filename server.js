const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ FIXED: Use connection pool instead of single connection
const db = mysql.createPool({
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: "2n4hg3hwfGkBTHv.root",
  password: "QmUqK9wW8ZUKt3Th",
  database: "portfolio",
  port: 4000,
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// optional: test connection (safe)
db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:");
    console.log(err);
  } else {
    console.log("Connected to TiDB database");
    connection.release();
  }
});

// contact form API
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log("Insert error:");
      console.log(err);
      res.send("Error saving message");
    } else {
      res.send("Message sent successfully!");
    }
  });
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

