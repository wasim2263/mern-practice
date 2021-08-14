import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }
        const {restaurantList, totalNumberOfRestaurants} = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,

        })
        let response = {
            restaurants:restaurantList,
            filters: filters,
            page:page,
            entities_per_page:restaurantsPerPage,
            total_results: totalNumberOfRestaurants

        }
        console.log(response)
        res.json(response)
    }
}