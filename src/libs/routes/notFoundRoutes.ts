const notFoundRoutes = (req, res, next) => {
    const err = new Error('Not Found');
    next(err);
};

export default notFoundRoutes;