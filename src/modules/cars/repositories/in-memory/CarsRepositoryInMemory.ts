import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create({
    description,
    name,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      description,
      name,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const all = this.cars
      .filter(car => {
        if (car.available ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)) {
            return car;
          }
          return null;
      });

    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }
}

export { CarsRepositoryInMemory };