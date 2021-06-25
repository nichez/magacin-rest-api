const Proizvoditel = require('../models/proizvoditelModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class ProizvoditelController {
  getAllProizvoditeli = async (req, res, next) => {
    let proizvoditeli = await Proizvoditel.find();
    if (!proizvoditeli.length) {
      throw new HttpException(404, 'Ne se pronajdeni proizvoditeli');
    }

    proizvoditeli = proizvoditeli.map((item) => {
      return item;
    });

    res.send(proizvoditeli);
  };

  getProizvoditel = async (req, res, next) => {
    const proizvoditel = await Proizvoditel.findOne({ id: req.params.proizvoditelId });
    if (!proizvoditel) {
      throw new HttpException(404, 'Proizvoditelot ne e pronajden');
    }

    res.send(proizvoditel);
  };

  createProizvoditel = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const result = await Proizvoditel.create(req.body);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send('Proizvoditelot e kreiran!');
  };

  deleteProizvoditel = async (req, res, next) => {
    const result = await Proizvoditel.delete({ id: req.params.proizvoditelId });
    if (!result) {
      throw new HttpException(404, 'Proizvoditelot ne e pronajden');
    }
    res.send('Proizvoditelot e uspeshno izbrishan');
  };

  updateProizvoditel = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // do the update query and get the result
    // it can be partial edit
    const result = await Proizvoditel.update(req.body, req.params.proizvoditelId);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? 'Proizvoditelot ne e pronajden'
      : affectedRows && changedRows
      ? 'Proizvoditelot e uspeshno promenet'
      : 'Neuspeshna promena';

    res.send({ message, info });
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, 'Validation faild', errors);
    }
  };

  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  };
}

module.exports = new ProizvoditelController();