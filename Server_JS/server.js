const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3001;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Ricardo',
    password: '3ti2006',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'Projeto_Merc'))); // Serve arquivos estáticos da pasta Projeto_Merc

// Rota para redirecionar a raiz para index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Projeto_Merc', 'index.html')); // Caminho para index.html
});

// Rota para inserir dados
app.post('/api/inserir', async (req, res) => {
    const { nome, marca, qtde, preco } = req.body;

    try {
        const query = 'INSERT INTO sua_tabela (nome, marca, qtde, preco) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [nome, marca, qtde, preco]);
        res.status(201).json({ message: 'Dados inseridos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir dados.' });
    }
});

// Rota para listar dados
app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sua_tabela');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
