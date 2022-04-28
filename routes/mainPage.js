const { Router } = require('express');
const Database = require('../services/database');

const mainPageRouter = Router();




mainPageRouter.get('/', (req, res) => {


    res.render('index', {
        title: 'REST-API',
        user: req.user,
        message: Database.getAllComments(),

    });

});


mainPageRouter.post('/addPost', (req, res) => {

    const { email, name } = req.user;
    const { message } = req.body;

    Database.addComment(email, name, message);
    res.redirect('/');

});

mainPageRouter.get('/editPost:id', (req, res) => {

    let comment = Database.getCommentById(req.params.id);
    res.render('editPost', {
        title: "Редактор комментарий",
        user: req.user,
        comment
    })
});

mainPageRouter.post('/editPost:id', (req, res) => {
    Database.getCommentByIdAndUpdate(req.params.id, req.body.messEdit);
    res.redirect('/');
});


mainPageRouter.post('/delPost:id', (req, res) => {
    Database.getCommentByIdAndDelete(req.params.id);

    res.redirect('/');
})

module.exports = mainPageRouter;