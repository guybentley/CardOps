import { MongoClient } from "mongodb";


try {
    const myProdCards = await cRepo.readCardsByProductId(`CardOps`);
    console.log(JSON.stringify(myProdCards, null, 2));
} catch(err) {
    console.log(err.err);
}

