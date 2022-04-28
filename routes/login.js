const { Router } = require('express');
const Database = require('../services/database')
const bcrypt = require('bcrypt');

const loginRouter = Router();

loginRouter.get('/login', (req, res) => {
    res.render('login', {
        title: 'Авторизация'
    });
});


loginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let find = Database.findUser(email);

    if (!find) {
        console.log(`Пользователь с таким email не зарегистрирован !`)
        res.redirect('/auth/login');
    }

    const checkPassword = await bcrypt.compare(password, find.password);

    if (checkPassword) {

        req.session.user = find;
        req.session.isAuthenticated = true;
        req.session.save(err => {

            if (err)
                throw new Error(`Ошибка в сессии ${err}`);

            res.redirect('/');
        })
    } else {
        console.log(`Неверно задан пароль`);
        res.redirect('/auth/login');
    }

});

loginRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
})


module.exports = loginRouter;