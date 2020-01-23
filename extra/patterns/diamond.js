var rows = Number(process.argv[2]);

function diamond(rows) {
    str = "";
    for (itr = 1; itr <= rows; itr++) {
        for(space = rows-itr; space>0; space--) {
            str = str + " "
        }

        for(star = 1; star <= itr; star++ ) {
            str= str + "* "
        }
        str+="\n"
    }

    for (itr = 0; itr <= rows; itr++) {

        for(star = 1; star <= itr; star++ ) {
            str= str + " "
        }

        for(space = rows-itr; space>0; space--) {
            str = str + "* "
        }

        str+="\n"
    }
    console.log(str)
}

diamond(rows)