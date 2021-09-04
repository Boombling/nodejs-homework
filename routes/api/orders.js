const express = require('express');
const { joiSchema } = require('../../models/orders');

const { authenticate, validation, controllerWrapper } = require("../../middlewares");
const { orders: ctrl } = require("../../controllers");

const router = express.Router();

const orderValidationMiddleware = validation(joiSchema);

router.get("/", controllerWrapper(authenticate), ctrl.getAll);

router.post("/", controllerWrapper(authenticate), orderValidationMiddleware(ctrl.add));

module.exports = router;