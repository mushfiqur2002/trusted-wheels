import { CarInfoType } from ".";

export function getCarDerivedData(carInfo: CarInfoType[]) {
    return {
        uniqueBodyStyle: [...new Set(carInfo.map(car => car.bodyStyle).filter(Boolean))],

        uniqueFuelType: [...new Set(carInfo.map(car => car.specs?.fuelType).filter(Boolean))],

        uniqueTransmission: [...new Set(carInfo.map(car => car.specs?.transmission).filter(Boolean))],

        uniqueEngine: [...new Set(carInfo.map(car => car.specs?.engine).filter(Boolean))],

        uniqueBrand: [...new Set(carInfo.map(car => car.brand).filter(Boolean))],

        carousel: carInfo.filter(car => car.carousel === true),
    };
}