const express = require('express');
const { joiSchema } = require('../../models/users');

const { authenticate, validation, controllerWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post("/register", userValidationMiddleware, controllerWrapper(ctrl.register));

router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));

router.get("/logout", controllerWrapper(ctrl.logout));

module.exports = router;