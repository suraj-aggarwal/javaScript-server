const errorHandler = (err, req, res, next) => {
    const errorMessage = {
        error: err.message,
        message: 'error',
        status: 500,
        timestamp: new Date()
    };
    res.send(errorMessage);
};

export default errorHandler;
