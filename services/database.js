const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const moment = require('moment');


const pathDBUsers = path.join(__dirname, '../data/users.json');
const pathDBComments = path.join(__dirname, '../data/comments.json');

class Database {

    static getAllComments() {
        return JSON.parse(fs.readFileSync(pathDBComments, 'utf-8'));
    }



    static getCommentById(id) {

        let allComments = Database.getAllComments();
        let findComment = allComments.find(el => el.messageId === id);

        return findComment;
    }


    static getCommentByIdAndDelete(id) {


        let allComments = Database.getAllComments();

        let deletedCom = allComments.filter(i => i.messageId !== id);

        fs.writeFile(pathDBComments, JSON.stringify(deletedCom), () => {
            console.log(`Сообщение было удалено`);
        });
    }


    static getCommentByIdAndUpdate(id, mess) {
        let allComments = Database.getAllComments();
        let comment = Database.getCommentById(id);

        let idx = allComments.findIndex(i => i.messageId === id);

        comment.message = mess;

        allComments[idx] = comment;

        fs.writeFile(pathDBComments, JSON.stringify(allComments), () => {
            console.log(`Сообщение было изменено !`)
        });

    };





    static addComment(email, name, message) {
        let theDate = moment().format('MMMM Do YYYY, h:mm:ss');
        let messageId = uniqid();

        let data = {
            email, name, message, theDate, messageId
        };

        fs.readFile(pathDBComments, 'utf-8', (err, content) => {
            let commentsDB = JSON.parse(content);

            commentsDB.push(data);

            fs.writeFile(pathDBComments, JSON.stringify(commentsDB), () => {
                console.log(`Комментария была добавлена !`);
            });
        });
    }



    static findUser(email) {

        const dataUsers = JSON.parse(fs.readFileSync(pathDBUsers, 'utf-8'));
        const find = dataUsers.find(i => i.email === email);

        if (!find) {
            return false
        }

        return find;
    }

    static addUser = async (name, email, password) => {
        let data = {
            name, email,
            password: await bcrypt.hash(password, 7),
            id: uniqid()
        };

        return fs.readFile(pathDBUsers, 'utf-8', (err, content) => {
            let dataDb = JSON.parse(content);

            const hasUser = dataDb.some(i => i.email === email);

            if (hasUser) {
                console.log('Пользователь с таким email уже зарегистрирован !')
                return;
            }

            dataDb.push(data)

            fs.writeFile(pathDBUsers, JSON.stringify(dataDb), () => {
                console.log(`Database updated !`);
            });
        });


    }

}


module.exports = Database;