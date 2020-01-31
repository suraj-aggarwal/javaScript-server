const equilateral = (rows: number) => {
    let str: string = '';
    for (let itr: number = 1; itr <= rows; itr++) {
        for (let space: number = rows - itr; space > 0; space--) {
            str = str + ' ';
        }

        for (let star: number = 1; star <= itr; star++) {
            str = str + '* ';
        }
        str += '\n';
    }
    console.log(str);
};

const validateEquilateral = (rows: any) => {
    const regex = /^([2-9]|1[0])$/;
    try {
        if (!regex.test(rows)) {
            throw Error('Not a valid input.');
        } else {
            rows = Number(rows);
            equilateral(rows);
        }
    } catch (err) {
        console.log(err.message);
    }
};


export default validateEquilateral;