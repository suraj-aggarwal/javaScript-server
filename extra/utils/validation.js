const users = [
    {
        traineeName : 'suraj.aggarwal@successive.tech',
        reveiwerName : 'madhav.bansal@successive.tech'
    },
    {
        traineeName : 'anjali.shah@succesive.tech',
        reveiwerName : 'pooja.thapa@successive.tech'
    }
] 

const validateEmail = str => {
    console.log("------validateEmail--------", str)
    let regex = /^[A-Za-z0-9._%+-]+@successive.tech$/;
    return regex.test(str)
};

const validateUsers = users => {
    let validUsers = [];
    let invalidUsers = [];

users.forEach( user => {
    let {traineeName , reveiwerName} = user
    if(validateEmail(traineeName) && validateEmail(reveiwerName)) {
        validUsers.push(user);
    }else{
        invalidUsers.push(user);
    }
});

console.log("valid users : ",validUsers," ",validUsers.length);
console.log("Invalid users",invalidUsers," ",invalidUsers.length);
}

export default validateUsers