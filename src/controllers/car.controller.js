import express from 'express';
import CarService from '../services/car.service.js';
import logger from '../utils/loggers.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser(process.env.SECRET));
export default class CarController {
  constructor() {
    this.carService = new CarService();

    this.addCar = this.addCar.bind(this);
    this.deleteCarById = this.deleteCarById.bind(this);
    this.getProductsFromCar = this.getProductsFromCar.bind(this);
    this.addProductToCarById = this.addProductToCarById.bind(this);
    this.deleteProductFromCarById = this.deleteProductFromCarById.bind(this);
  }

  async addCar(req, res) {
    try {
      const { userId } = req.cookies;
      const response = await this.carService.addCar(userId);
      res
        .status(200)
        .clearCookie('userCarId')
        .cookie('userCarId', response._id.toString(), { maxAge: 1800000 })
        .json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteCarById(req, res) {
    const { id } = req.params;
    try {
      const response = await this.carService.deleteCarById(id);
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async getProductsFromCar(req, res) {
    const { id } = req.params;
    try {
      const response = await this.carService.getProductsFromCar(id);
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async addProductToCarById(req, res) {
    const { id, id_prod } = req.params;

    try {
      const response = await this.carService.addProductToCarById(id, id_prod);
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }

  async deleteProductFromCarById(req, res) {
    const { id, id_prod } = req.params;
    try {
      const response = await this.carService.deleteProductFromCarById(
        id,
        id_prod
      );
      res.status(200).json(response);
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
