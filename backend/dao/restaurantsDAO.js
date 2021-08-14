let restaurants;

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.NS).collection('restaurants');
            console.log('----',await restaurants.countDocuments())
        } catch (e) {
            console.log('----err',e)
        }
    }

    static async getRestaurants({
                                    filters = null,
                                    page = 0,
                                    restaurantsPerPage: restaurantsPerPage = 20
                                } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = {$text: {search: filters["name"]}}
            }
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
            const restaurantList = await displayCursor.toArray()
            console.log(restaurantList)
            console.log(query)
            const totalNumberOfRestaurants = await restaurants.countDocuments(query)
            console.log(restaurantList, totalNumberOfRestaurants,restaurants.countDocuments)
            return {restaurantList, totalNumberOfRestaurants}

        } catch (e) {
            console.error(e)
            // restaurants.insertOne({
            //     name:'Better Post!',
            //     slug:'a-better-post',
            //
            // })
            return {restaurantList: [], totalNumberOfRestaurants: 0}

        }

    }
}