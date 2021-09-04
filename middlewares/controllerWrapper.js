const controllerWrapper = (ctrl) => {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, nex);
        }
        catch (error) {
            next(error)
        }
    }
};

module.exports = controllerWrapper;