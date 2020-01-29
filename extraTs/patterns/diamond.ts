const diamond = (rows) => {
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

    for (let itr = 0; itr <= rows; itr++) {
        for (let star = 1; star <= itr; star++) {
            str = str + ' ';
        }
        for (let space = rows - itr; space > 0; space--) {
            str = str + '* ';
        }
        str += '\n';
    }
    console.log(str);
};

const validateDiamond = (rows) => {
    const regex = /^([2-9]|1[0])$/;
    try {
        if (!regex.test(rows)) {
            throw new Error('Not a valid input.');
        } else {
            diamond(rows);
        }
    } catch (err) {
        console.log(err.message);
    }
};

export default validateDiamond;



