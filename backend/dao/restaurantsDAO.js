let restaurants;

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.NS).collection('restaurants');
            console.log(restaurants)
        } catch (e) {
            console.log(e)
        }
    }

    static async getRestaurants({
                                    filters = null,
                                    page = 0,
                                    restaurantsPerPage: restaurantsPerPage = 20
                                } = {}) {
        let query
        if (filters) {

        }
        let cursor
        try {
            cursor = await restaurants.find(query)
        } catch (e) {
            console.error(e)
            return {restaurants: [], totalNumberOfRestaurants: 0}
        }
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        try {
            const restaurants = await displayCursor.toArray()
            const totalNumberOfRestaurants = await restaurants.countDcoument(query)
            return {restaurants, totalNumberOfRestaurants}

        } catch (e) {
            console.error(e)
            return {restaurants: [], totalNumberOfRestaurants: 0}

        }

    }
}