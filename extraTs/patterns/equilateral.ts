const equilateral = (rows) => {
    let str = '';
    for (let itr = 1; itr <= rows; itr++) {
        for (let space = rows - itr; space > 0; space--) {
            str = str + ' ';
        }

        for (let star = 1; star <= itr; star++) {
            str = str + '* ';
        }
        str += '\n';
    }
    console.log(str);
};

const validateEquilateral = (rows) => {
    const regex = /^([2-9]|1[0])$/;
    try {
        if (!regex.test(rows)) {
            throw Error('Not a valid input.');
        } else {
            equilateral(rows);
        }
    } catch (err) {
        console.log(err.message);
    }
};


export default validateEquilateral;