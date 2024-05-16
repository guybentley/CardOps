import express from 'express';
import { CardRepo } from "./cardRepo.js";

const url = 'mongodb://cardOpsAccess:IzmQvbcL247m4C87gG7AYGn@localhost:27017/';
const dbName = 'CardOps';
const cRepo = new CardRepo(url, dbName, 1);
const app = express();

app.get('/', (req, res) =>{
    res.send('hello from CardOps')
});

app.listen(2883, () => console.log(`listening on port 2883`));