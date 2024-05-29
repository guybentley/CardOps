import express from 'express';
// import { CardRepo } from "./cardRepo.js";
import Debug from 'debug';
import cards from './cards.json' with { type: 'json'};

const cardsRouter = express.Router();

// try {
//     const myProdCards = await cRepo.readCardsByProductId(`CardOps`);
// } catch(err) {
//     Debug.log(err.err);
// }

cardsRouter.route('/')
    .get((req,res) => {
        res.status(200).render('cards', {"cards": cards})
    });

cardsRouter.route('/:cardId').get((req, res) => {
    const cardId = req.params.cardId;
    const card = cards.find(c => c.cardId === cardId);
    res.status(200).render('card', card )
    });

export default cardsRouter