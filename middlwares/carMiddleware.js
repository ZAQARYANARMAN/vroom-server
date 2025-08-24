import Car from "../models/Car.js";

const verifyAddPicturesForCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.query.id);
    if (!car.pictures.length) {
      car ? next() : res.status(404).json({ message: "Transferred id who car does not exist" });
    }
    else {
      return res.status(409).json({ message: "Pictures already exist" })
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const verifyDeleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.query.id);

    if (car){
      req.body.car = car;

      next();
    }
    else {
      return res.status(409).json({ message: "Transferred id who car does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export { verifyAddPicturesForCar, verifyDeleteCar }