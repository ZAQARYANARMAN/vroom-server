export const years = [];
export const engineOptions = [];
export const year = new Date().getFullYear();
export const currencyList = ["֏", "₽", "€", "$"];
export const runningCurrency = ["km", "ml"];
export const sides = ["left", "right"];
const interiorMaterial = []
export const colors = [
  "white", "black", "red", "green", "blue", "yellow",
  "orange", "purple", "pink", "brown", "gray", "cyan", "magenta"
];
export const gearBoxTypes = [
  "manual",
  "automatic",
  "variator",
  "cvt",
  "dual-clutch",
  "tiptronic",
  "dsg",
  "robotic"
];
export const interiorMaterials = [
  "Leather",
  "Nappa Leather",
  "Alcantara",
  "Suede",
  "Synthetic Leather",
  "Fabric",
  "Vinyl",
  "Leatherette",
  "Wood Trim",
  "Carbon Fiber Trim"
]
export const bodyTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Crossover",
  "Coupe",
  "Convertible",
  "Station Wagon",
  "Pickup",
  "Van",
  "Minivan",
  "Roadster",
  "Microcar",
  "Electric Vehicle",
  "Luxury Sedan",
  "Off-Road"
];
export const driveTypes = [
  "FWD",
  "RWD",
  "AWD",
  "4WD",
  "4x2",
  "4x4"
];

for (let i = year; i >= 1915; i--) {
  years.push(i);
}

for (let i = 0.1; i <= 10; i += 0.1) {
  const num = Number(i.toFixed(1));
  engineOptions.push(num.toFixed(1));
}