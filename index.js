const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const expHB = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const expressSession = require('express-session');
const mainPageRouter = require('./routes/mainPage');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const middleLocals = require('./middleware/middleLocals');
const reqUser = require('./middleware/reqUser');



class App {
    app = express();
    port = process.env.PORT ?? 7777;
    hbs = expHB.create({
        defaultLayout: 'main',
        extname: 'hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        helpers: require('./utils/hbs-helpers')
    });

    constructor() {



        this.app.engine('hbs', this.hbs.engine);
        this.app.set('view engine', 'hbs');
        this.app.set('views', 'views');

        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(expressSession({
            resave: false,
            saveUninitialized: false,
            secret: 'Have a nice day'
        }));
        this.app.use(middleLocals);
        this.app.use(reqUser);


        this.app.use('/', mainPageRouter);
        this.app.use('/auth', loginRouter);
        this.app.use('/auth', registerRouter);

    }





    start = () => {

        try {
            this.app.listen(this.port, () => {
                console.log(`Сервер запущен`);
            });
        } catch (e) {
            throw new Error('Сервер не запустился')
        }
    }
}


const app = new App();

app.start();
