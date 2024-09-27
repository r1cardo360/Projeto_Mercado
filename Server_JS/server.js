const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3001;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: 'Ricardo',
    host: 'localhost',
    database: 'Mercado_App',
    password: 'Furla290896*',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'Projeto_Merc'))); // Serve arquivos estáticos da pasta Projeto_Merc

// Rota para redirecionar a raiz para index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Projeto_Merc', 'index.html')); // Caminho para index.html
});

// Rota para inserir dados
app.post('/usuarios', async (req, res) => {
    const {nome_usuario} = req.body;

    if(!nome_usuario || nome_usuario.trim() === ''){
        return res.status(400).json({error: "Nome Obrigatório"});
    }

    try {
        const query = 'INSERT INTO usuarios (nome) VALUES ($1)';
        await pool.query(query, [nome_usuario]);
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
