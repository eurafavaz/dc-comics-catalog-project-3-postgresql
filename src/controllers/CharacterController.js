const req = require("express/lib/request");
const res = require("express/lib/response");
const Character = require("../models/Character");

const getAll = async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.render("index", { characters, characterPut: null, characterDel: null });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const register = (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const character = req.body;

    if (!character) {
      return res.redirect("/register");
    }
    await Character.create(character);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const method = req.params.method;
    const characters = await Character.findAll();
    const character = await Character.findByPk(req.params.id);

    if (method == "put") {
      res.render("index", {
        characters,
        characterPut: character,
        characterDel: null,
      });
    } else {
      res.render("index", {
        characters,
        characterPut: null,
        characterDel: character,
      });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const update = async (req, res) => {
  try {
    const character = req.body;
    await Character.update(character, { where: { id: req.params.id } });
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Character.destroy({ where: { id: req.params.id } });
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
  register,
  create,
  getById,
  update,
  remove,
};
