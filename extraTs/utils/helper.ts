<<<<<<< HEAD
const validateEmail = (str: string) => {
=======
const validateEmail = (str) => {
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
    console.log('validateEmail', str);
    const regex = /^[A-Za-z0-9._%+-]+@successive.tech$/;
    return regex.test(str);
};

export { validateEmail };