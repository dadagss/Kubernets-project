require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 3001;

// Configuração do banco de dados MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Função para criar tabelas (se não existirem)
async function createTables() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS minha_tabela (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createTableQuery);
    console.log("Tabela 'minha_tabela' criada ou já existente.");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  }
}

// Rota principal
app.get("/", async (req, res) => {
  try {
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_PORT:", process.env.DB_PORT);

    // Executa a consulta
    const [rows] = await pool.query("SELECT NOW() AS db_time");
    console.log("Query result:", rows);
    res.send(`Hello World! Database time: ${rows[0].db_time}`);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Error connecting to the database.");
  }
});

// Inicializa o servidor e cria as tabelas
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await createTables(); 
});

app.get('/healthz',   (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/example', async (req, res) => {
  try {
    
    const insertQuery = `
      INSERT INTO minha_tabela (nome)
      VALUES (?)
    `;
    const [insertResult] = await pool.query(insertQuery, ["Exemplo de Nome"]);
    console.log("Novo registro inserido com ID:", insertResult.insertId);

    
    const [rows] = await pool.query("SELECT * FROM minha_tabela");
    console.log("Registros recuperados:", rows);

    
    res.status(200).json({
      message: "Exemplo concluído com sucesso!",
      insertedId: insertResult.insertId,
      data: rows,
    });
  } catch (err) {
    console.error("Erro na rota /example:", err);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

app.get('/readyz', async (req, res) => {
  try {
    // Verifica se a conexão com o banco de dados está funcionando
    const [rows] = await pool.query("SELECT 1 AS status");
    if (rows[0].status === 1) {
      res.status(200).json({ status: 'READY', message: 'Application is ready to handle traffic.' });
    } else {
      res.status(500).json({ status: 'NOT READY', message: 'Database connection check failed.' });
    }
  } catch (err) {
    console.error("Error in /ready route:", err);
    res.status(500).json({ status: 'NOT READY', message: 'Error connecting to the database.' });
  }
});