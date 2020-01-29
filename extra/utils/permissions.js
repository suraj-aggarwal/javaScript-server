let permissions = {
    'getUsers' : {
        all : ['head-Trainer'],
        read : ['Trainer', 'Trainee'],
        write : ['Trainer'],
        delete : []
    }
};

const hasPermission = (mod, operation, role) => {
    console.log("permission", mod, operation, role);
    let commonRoles = permissions[mod] && permissions[mod][operation];
    let specialRoles = permissions[mod] && permissions[mod].all;
    let allow = false;
    if(!commonRoles && !specialRoles) { // special condition undefined.
        return false;
    }
    if(Array.isArray(commonRoles)) {
        allow = commonRoles.includes(role)
    }
    if(!allow && Array.isArray(specialRoles)) {
        allow = specialRoles.includes(role)
    }
    return allow;
};

let result = hasPermission('getUsers' ,'read','Trainee');
console.log(result);