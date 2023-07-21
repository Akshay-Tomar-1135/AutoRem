const express=require('express');
const router=express.Router();

const Registeration=require('../controllers/user');
// const LocationController=require("../Controllers/Locations");
// const MealTypeController=require('../Controllers/MealTypes');
// const UserController=require('../Controllers/Users');


router.post('/signup',Registeration.userRegister);
router.post('/login', Registeration.userLogin);
// router.get('/getRestaurantByName/:name',RestaurantController.getRestaurantByName)
// router.get('/getRestaurantByCity/:city',RestaurantController.getRestaurantByCity);
// router.get('/getRestaurantById/:id',RestaurantController.getRestaurantById)
// router.post('/FilterRestaurants',RestaurantController.FilterRestaurants);
// router.get('/getAllLocations',LocationController.getAllLocations);
// router.get('/getAllMealTypes',MealTypeController.getAllMealTypes);
// router.post('/UserSignUp',UserController.UserSignUp);
// router.post('/UserLogin',UserController.UserLogIn)

module.exports=router;