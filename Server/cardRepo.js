import { MongoClient } from "mongodb";
import { logDbAction, LoggingLevel  } from "./errorLogging.js";

export class CardRepo {

    constructor(url, dbName, prodId) {
        this.dbName = dbName;
        this.prodId = prodId;
        this.client = new MongoClient(url);
    }

    async readCardsByProductId(productName) {
        const query = { productId: productName };
        return await this.#readCards(query);

    }
    async readCardById(id) {
        const query = {_id: id};
        return await this.#readCards(query);
    }

    async #readCards(query) {
        try {
            await this.client.connect();       
            logDbAction(LoggingLevel.Medium, "connected", "", null);
            const cardOpsDb = this.client.db(this.dbName);
            const cursor = cardOpsDb.collection(`cards`).find(query); 
            cursor.showRecordId(true);
            const cards = await cursor.toArray();
            return cards;         
       } catch(err) {
           logDbAction(LoggingLevel.Low, `failed to read cards for productId: ${productId}`, err);
       }
       finally {
           await this.client.close();
       }
    }
}
