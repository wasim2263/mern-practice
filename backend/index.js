import app from "./server.js"
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js"

dotenv.config();
const mongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000
mongoClient.connect(
    process.env.DB_URI,
    {
        poolSize: 50,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 1000,
        writeConcern: {
            j: true
        }
    }
).catch(error => {
        console.error(error);
        process.exit(1);
    }
).then(async client => {
    await RestaurantsDAO.injectDB(client);
    app.listen(port, () => {console.log(`Listen on port ${port}`)});
})