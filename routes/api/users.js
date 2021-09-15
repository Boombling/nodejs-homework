const express = require('express');
const { joiSchema } = require('../../models/users');

const { authenticate, validation, controllerWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post("/signup", userValidationMiddleware, controllerWrapper(ctrl.signup));

router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));

router.get("/logout", controllerWrapper(authenticate), controllerWrapper(ctrl.logout));

router.patch("/avatar/:id", upload.single("avatar"), controllerWrapper(ctrl.updateAvatar));

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

module.exports = router;