users = [
    {
        traineeName: "suraj.aggarwal@succesive.tech",
        reveiwerName: "madhav.bansal@successive.tech"
    },
    {
        traineeName: "anjali.shah@successive.tech",
        reveiwerName: "pooja.thapa@successive.tech"
    }
]

function validateEmail(str) {
    console.log("validateEmail", str)
    let regex = /^[A-Za-z0-9._%+-]+@successive.tech$/
    return regex.test(str)
}

function validateUsers(users) {
    let validUsers = [];
    let invalidUsers = [];

    users.forEach(function (user) {
        let { traineeName, reveiwerName } = user
        if (validateEmail(traineeName)) {
            validUsers.push(traineeName)
        } else {
            invalidUsers.push(traineeName)
        }

        if (validateEmail(reveiwerName)) {
            validUsers.push(reveiwerName)
        } else {
            invalidUsers.push(reveiwerName)
        }
    })

    console.log(validUsers, " ", validUsers.length)
    console.log(invalidUsers, " ", invalidUsers.length)
}

validateUsers(users)

