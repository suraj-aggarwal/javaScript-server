const diamond = (rows: number) => {
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

    for (let itr: number = 0; itr <= rows; itr++) {
        for (let space: number = 1; space <= itr; space++) {
            str = str + ' ';
        }
        for (let star: number = rows - itr; star > 0; star--) {
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
            const noOfRows: number = Number(rows);
            diamond(noOfRows);
        }
    } catch (err) {
        console.log(err.message);
    }
};

export default validateDiamond;



