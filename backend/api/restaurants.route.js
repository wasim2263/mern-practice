import express from "express"
import RestaurantsController from "./restaurants.controller.js"
const router = express.Router();

router.route('/').get(RestaurantsController.apiGetRestaurants);
// router.route('/').get((req,res)=>res.send("wasim") );

export default router;