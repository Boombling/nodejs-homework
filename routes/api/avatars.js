const express = require('express')

const { joiSchema } = require('../../models/users');
const { validation, controllerWrapper } = require("../../middlewares");
const { avatars: ctrl } = require("../../controllers");

const validationMiddleware = validation(joiSchema);

const router = express.Router()

router.get("/", controllerWrapper(ctrl.getAll));

router.post("/", validationMiddleware, controllerWrapper(ctrl.add));

// router.patch("/:id", )