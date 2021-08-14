import RestaurantsDAO from "../dao/restaurantsDAO";

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }
        const {restaurants, totalNumberOfRestaurants} = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        })
        let response = {
            restaurants:restaurants,
            filters: filters,
            page:page,
            entities_per_page:restaurantsPerPage,
            total_results: totalNumberOfRestaurants

        }
        res.json(response)
    }
}