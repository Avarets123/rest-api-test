const { Router } = require('express');
const Database = require('../services/database')

const registerRouter = Router();

registerRouter.get('/register', (req, res) => {
    res.render('register', {
        title: 'Регистрация'
    });


    registerRouter.post('/register', async (req, res) => {
        const { email, password, name } = req.body;

        console.log(req.body)

        await Database.addUser(name, email, password);

        res.redirect('/auth/login');


    });
});

module.exports = registerRouter;