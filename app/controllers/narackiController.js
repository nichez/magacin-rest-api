const Naracki = require('../models/narackiModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class NarackiController {
  getAllNaracki = async (req, res, next) => {
    let naracki = await Naracki.find();
    if (!naracki.length) {
      throw new HttpException(404, 'Ne se pronajdeni naracki');
    }

    naracki = naracki.map((item) => {
      return item;
    });

    res.send(naracki);
  };

  getNaracka = async (req, res, next) => {
    const naracki = await Naracki.findOne({ id: req.params.narackaId });
    if (!naracki) {
      throw new HttpException(404, 'Narackata ne e pronajdena');
    }

    res.send(naracki);
  };

  getNarackiByOrderNumber = function (req, res) {
    Naracki.getNarackiByOrderNumber(
      req.params.narackaId,
      function (err, naracki) {
        if (err) res.send(err);
        res.json(naracki);
      }
    );
  };

  createNaracki = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    Naracki.create(req.body, function (err, naracki) {
      if (err) res.send(err);
      res.json(naracki);
    });
  };

  deleteNaracka = async (req, res, next) => {
    const result = await Naracki.delete({ id: req.params.narackaId });
    if (!result) {
      throw new HttpException(404, 'Narackata ne e pronajdena');
    }
    res.send('Narackata e uspeshno izbrishana');
  };

  updateNaracki = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // do the update query and get the result
    // it can be partial edit
    const result = await Naracki.update(req.body, req.params.narackaId);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? 'Narackata ne e pronajdena'
      : affectedRows && changedRows
      ? 'Narackata e uspeshno promeneta'
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

module.exports = new NarackiController();
