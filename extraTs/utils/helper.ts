const validateEmail = (str) => {
    console.log('validateEmail', str);
    const regex = /^[A-Za-z0-9._%+-]+@successive.tech$/;
    return regex.test(str);
};

export { validateEmail };