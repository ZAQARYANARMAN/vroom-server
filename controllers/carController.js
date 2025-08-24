import fs from "fs";
import path from "path";
import Car from "../models/Car.js";
import jwt from "jsonwebtoken"

const addCar = async (req, res) => {
    try {
        const newCar = await Car.create({ ...req.body, author: req.body.token.id });

        return res.status(201).json({ message: "Congratulations, the car has been added.", data: newCar._id, token: req.body.token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addPicturesForCar = async (req, res) => {
    try {
        if (req.files) {
            const picturesPath = req.files.map(pictureInfo => `http://${req.headers.host}/uploads/carsPictures/${pictureInfo.filename}`); // picturesPath i mej lcnum enq nkarneri linkery
            const updatedCar = await Car.findByIdAndUpdate(req.query.id, { pictures: picturesPath }, { runValidators: true, new: true });

            return res.status(201).json({ message: "Congratulations, car pictures have been added.", data: updatedCar });
        } else {
            return res.status(404).json({ message: "Images are missing." });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteCar = async (req, res) => {
    try {
        req.body.car.pictures.forEach(picture => {
            const fileName = path.basename(picture);
            const filePath = path.resolve("uploads", "carsPictures", fileName);
            fs.unlinkSync(filePath);
        })

        await Car.findByIdAndDelete(req.query.id)

        return res.status(204).json({ message: "Car deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// const updateCar = async (req, res) => {
//     try {
//         const updatedCar = await Car.findByIdAndUpdate(req.query.id, req.body, {
//             runValidators: true,
//             new: true
//         })

//         if (updatedCar) return res.status(201).json({ message: "user is updated", data: updatedCar });

//         return res.status(400).json({ message: "aydpisi id ov meqena goutyun chuni" });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }

const searchCar = async (req, res) => {
    try {
        const car = await Car.findById(req.query.id).populate("author");

        if (car) {
            return res.status(200).json({ message: "Car found", data: car });
        }

        return res.status(404).json({ message: "The car with the specified id does not exist." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const searchCars = async (req, res) => {
    try {
        let query = { $and: [] };
        req.query.brand ? query.$and.push({ brand: req.query.brand }) : "";
        req.query.model ? query.$and.push({ model: req.query.model }) : "";
        req.query.drive ? query.$and.push({ drive: req.query.drive }) : "";
        req.query.interiorColor ? query.$and.push({ interiorColor: req.query.interiorColor }) : "";
        req.query.interiorMaterial ? query.$and.push({ interiorMaterial: req.query.interiorMaterial }) : "";
        req.query.sterringWheel ? query.$and.push({ sterringWheel: req.query.sterringWheel }) : "";
        req.query.gearBox ? query.$and.push({ gearBox: req.query.gearBox }) : "";
        req.query.color ? query.$and.push({ color: req.query.color }) : "";
        req.query.minYear ? query.$and.push({ year: { $gte: Number(req.query.minYear) } }) : "";
        req.query.maxYear ? query.$and.push({ year: { $lte: Number(req.query.maxYear) } }) : "";
        req.query.minEngine ? query.$and.push({ engine: { $gte: Number(req.query.minEngine) } }) : ""
        req.query.maxEngine ? query.$and.push({ engine: { $lte: Number(req.query.maxEngine) } }) : ""
        req.query.minPrice ? query.$and.push({ price: { $gte: Number(req.query.minPrice) } }) : ""
        req.query.maxPrice ? query.$and.push({ price: { $lte: Number(req.query.maxPrice) } }) : ""
        req.query.minRunning ? query.$and.push({ running: { $gte: Number(req.query.minRunning) } }) : ""
        req.query.maxRunning ? query.$and.push({ running: { $lte: Number(req.query.maxRunning) } }) : ""

        req.query.minHorsepower ? query.$and.push({ horsepower: { $gte: Number(req.query.minHorsepower) } }) : ""
        req.query.maxHorsepower ? query.$and.push({ horsepower: { $lte: Number(req.query.maxHorsepower) } }) : ""

        !query.$and.length ? query = {} : "";

        const filteredCars = await Car.find(query).select("brand model year price priceCurrency running runningCurrency pictures");

        return res.status(200).json({ message: filteredCars.length ? "Cars have been filtered successfully" : "No cars found matching your search", data: filteredCars })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getCarsName = async (req, res) => {
    try {
        const response = await fetch("https://www.carqueryapi.com/api/0.3/?cmd=getMakes&sold_in_us=1");
        let data = await response.json();
        data = data.Makes.map(carInfo => carInfo.make_id)

        return res.status(200).json({ message: "Car brands fetched successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch car brands", error: error.message });
    }
}

const carModels = async (req, res) => {
    try {
        let brand = req.query.brand;

        if (brand) {
            while (brand.includes("-")) {
                brand = brand.replace("-", "_")
            }

            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${brand}?format=json`);
            let data = await response.json();

            data = data.Results.map(brandInfo => brandInfo.Model_Name);

            return res.status(200).json({ message: "Car models fetched successfully", data: data });
        } else {
            return res.status(404).json({ message: "Information is missing" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch car models", error: error.message });
    }
}

const getCarsById = async (req, res) => {
    try {
        const { ids } = req.query

        const cars = await Car.find({ _id: { $in: JSON.parse(ids) } }).select("brand model year price priceCurrency running runningCurrency pictures");

        return res.status(200).json({ message: cars.length ? "Cars found" : "There are no cars in the cart", data: cars });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch car models", error: error.message });
    }
}

export { addCar, addPicturesForCar, deleteCar, updateCar, searchCar, searchCars, getCarsName, carModels, getCarsById }