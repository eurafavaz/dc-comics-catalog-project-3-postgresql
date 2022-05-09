const routes = require("express").Router();
const CharacterController = require("../controllers/CharacterController");

routes.get("/", CharacterController.getAll);
routes.get("/register", CharacterController.register);
routes.post("/create", CharacterController.create);
routes.get("/getById/:id/:method", CharacterController.getById);
routes.post("/update/:id", CharacterController.update);
routes.get("/remove/:id", CharacterController.remove);

module.exports = routes;
