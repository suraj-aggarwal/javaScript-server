var rows = Number(process.argv[2]);

function equilateral(rows) {
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
    console.log(str)
}

equilateral(rows)