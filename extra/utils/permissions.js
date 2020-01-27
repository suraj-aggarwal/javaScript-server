let permissions = {
    getUsers: {
        all: ['head-Trainer'],
        read: ['Trainer', 'Trainee'],
        write: ['Trainer'],
        delete: []
    }
}

function hasPermission(mod, operation, role) {
    console.log("permission", mod, operation, role)
    let mods = Object.keys(permissions)
    let operations = Object.keys(permissions[mod])
    let roles = permissions[mod][operation]
    return linearSearch(mods, mod) && linearSearch(operations, operation) && linearSearch(roles, role)
}

function linearSearch(arr, target) {
    for (element of arr) {
        if (element === target) {
            return true;
        }
    }
    return false;
}

let result = hasPermission('getUsers', 'write', 'Trainer')
console.log(result)