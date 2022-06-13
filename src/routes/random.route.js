import express from 'express';
import randomController from '../controllers/random.controller.js';

export default class randomRoute extends express.Router {
  constructor() {
    super();
    this.randomController = new randomController();

    this.get('/', this.randomController.getRandom);
  }
}
