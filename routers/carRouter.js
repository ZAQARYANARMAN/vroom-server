import express from "express";
import { verifyJwt } from "../middlwares/userMiddleware.js";
import { addCar, addPicturesForCar, carModels, deleteCar, getCarsById, getCarsName, searchCar, searchCars } from "../controllers/carController.js";
import { carPictureUpload } from "../multerBuilders/carPicturesMulterBuilder.js";
import { verifyAddPicturesForCar, verifyDeleteCar } from "../middlwares/carMiddleware.js";

const carRouter = express.Router();

carRouter.get("/searchCar", searchCar);
carRouter.get("/searchCars", searchCars);
carRouter.post("/addCar", verifyJwt, addCar);
carRouter.put("/addPicturesForCar", verifyJwt, verifyAddPicturesForCar, carPictureUpload.array("image", 10), addPicturesForCar); // verifyJwt
carRouter.delete("/deleteCar", verifyJwt, verifyDeleteCar, deleteCar);
carRouter.get("/getCarsName", getCarsName);
carRouter.get("/carModels", carModels);
carRouter.get("/getCarsById", getCarsById);

export default carRouter