import {permissions} from '../constants'

const hasPermission = (mod, operation, role) => {
    console.log("permission", mod, operation, role)
    let mods = Object.keys(permissions)
    let operations = Object.keys(permissions[mod])
    let roles = permissions[mod][operation]
    return linearSearch(mods, mod) && linearSearch(operations, operation) &&  linearSearch(roles, role) 
}

const linearSearch = (arr, target) => {
    for (let element of arr) {
        if (element === target) {
            return true;
        }
    }
    return false;
}

export default hasPermission;