import express from 'express';
import { CardRepo } from "./cardRepo.js";
import chalk from 'chalk';
import morgan from 'morgan';
import Debug from 'debug';
import cardsRouter from './cardsRouter.js';

const debug = Debug('CardOps');
const port = 2883;

const url = 'mongodb://cardOpsAccess:IzmQvbcL247m4C87gG7AYGn@localhost:27017/';
const dbName = 'CardOps';
const cRepo = new CardRepo(url, dbName, 1);
const webServer = express();

webServer.listen(port, () => { 
    debug(`listening on port ${chalk.green(port)}`)
});

webServer.use(morgan('combined'));
webServer.set('views', './src/views');
webServer.set('view engine', 'ejs');

webServer.get('/', (req, res) =>{
    res.status(200).render('index', {title: 'CardOps', data: ['a', 'b', 'c'] } )
});

webServer.use('/cards', cardsRouter);