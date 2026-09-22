const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// ==============================
// CONEXÃO COM O MYSQL
// ==============================

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_teste'

});


db.connect((err) => {

    if (err) {

        console.error('Erro ao conectar ao MySQL:', err);

        return;

    }

    console.log('Conectado ao MySQL com sucesso!');

});


// ==============================
// CADASTRO
// ==============================

app.post('/api/cadastro', (req, res) => {

    const { email, senha } = req.body;


    // Verifica os campos

    if (!email || !senha) {

        return res.status(400).json({

            success: false,

            message: 'Preencha todos os campos.'

        });

    }


    // Verifica se o e-mail já existe

    const verificar = `
        SELECT id
        FROM usuarios
        WHERE email = ?
    `;


    db.query(verificar, [email], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({

                success: false,

                message: 'Erro ao verificar o usuário.'

            });

        }


        // E-mail já cadastrado

        if (results.length > 0) {

            return res.status(400).json({

                success: false,

                message: 'Este e-mail já está cadastrado.'

            });

        }


        // Cadastra o novo usuário

        const sql = `
            INSERT INTO usuarios (email, senha)
            VALUES (?, ?)
        `;


        db.query(sql, [email, senha], (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message: 'Erro ao cadastrar usuário.'

                });

            }


            return res.json({

                success: true,

                message: 'Cadastro realizado com sucesso!'

            });

        });

    });

});


// ==============================
// LOGIN
// ==============================

app.post('/api/login', (req, res) => {

    const { email, senha } = req.body;


    const sql = `
        SELECT id, email
        FROM usuarios
        WHERE email = ? AND senha = ?
    `;


    db.query(sql, [email, senha], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({

                success: false,

                message: 'Erro ao consultar o banco de dados.'

            });

        }


        if (results.length > 0) {

            return res.json({

                success: true,

                message: 'Login realizado com sucesso!'

            });

        }


        else {

            return res.status(401).json({

                success: false,

                message: 'E-mail ou senha inválidos!'

            });

        }

    });

});


// ==============================
// INICIAR SERVIDOR
// ==============================

app.listen(3000, () => {

    console.log(
        'Servidor rodando em http://localhost:3000'
    );

});