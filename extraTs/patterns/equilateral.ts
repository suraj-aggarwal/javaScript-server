<<<<<<< HEAD
const equilateral = (rows: number) => {
    let str: string = '';
    for (let itr: number = 1; itr <= rows; itr++) {
        for (let space: number = rows - itr; space > 0; space--) {
            str = str + ' ';
        }

        for (let star: number = 1; star <= itr; star++) {
=======
const equilateral = (rows) => {
    let str = '';
    for (let itr = 1; itr <= rows; itr++) {
        for (let space = rows - itr; space > 0; space--) {
            str = str + ' ';
        }

        for (let star = 1; star <= itr; star++) {
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
            str = str + '* ';
        }
        str += '\n';
    }
    console.log(str);
};

<<<<<<< HEAD
const validateEquilateral = (rows: any) => {
=======
const validateEquilateral = (rows) => {
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
    const regex = /^([2-9]|1[0])$/;
    try {
        if (!regex.test(rows)) {
            throw Error('Not a valid input.');
        } else {
<<<<<<< HEAD
            rows = Number(rows);
=======
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
            equilateral(rows);
        }
    } catch (err) {
        console.log(err.message);
    }
};


export default validateEquilateral;