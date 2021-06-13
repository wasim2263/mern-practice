let restaurants;

export default class RestaurantsDAO{
    static async injectDB(conn){
        if (restaurants){
            return
        }
        try {
            restaurants = await conn.db(process.env.NS).collection('restaurants');
            console.log(restaurants)
        }catch (e){
            console.log(e)
        }
    }
}