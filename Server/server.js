import express from 'express';
import { CardRepo } from "./cardRepo.js";
import chalk from 'chalk';
import morgan from 'morgan';
import Debug from 'debug';

const debug = Debug('CardOps');

const url = 'mongodb://cardOpsAccess:IzmQvbcL247m4C87gG7AYGn@localhost:27017/';
const dbName = 'CardOps';
const cRepo = new CardRepo(url, dbName, 1);
const webServer = express();

webServer.use(morgan('combined'));

webServer.get('/', (req, res) =>{
    res.send('hello from CardOps')
});

webServer.listen(2883, () => { 
    debug(`listening on port ${chalk.green('2883')}`)
});
