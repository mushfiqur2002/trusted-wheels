import { carInfo } from ".";

const uniqueBodyStyle = [...new Set(carInfo.map(car => car.bodyStyle))]
const uniqueFuelType = [...new Set(carInfo.map(car => car.specs?.fuelType))]
const uniqueTransmission = [...new Set(carInfo.map(car => car.specs?.transmission))]
const uniqueEngine = [...new Set(carInfo.map(car => car.specs?.engine))]
const uniqueBrand = [...new Set(carInfo.map(car => car.brand))]


export { uniqueBodyStyle, uniqueFuelType, uniqueTransmission, uniqueEngine, uniqueBrand }