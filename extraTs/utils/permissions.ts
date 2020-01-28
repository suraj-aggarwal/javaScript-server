import { permissions } from '../constants';

const hasPermission = (mod: string, operation: string, role: string): boolean => {
    console.log('permission', mod, operation, role);
    const mods = Object.keys(permissions);
    const operations = Object.keys(permissions[mod]);
    const roles = permissions[mod][operation];
    return linearSearch(mods, mod) && linearSearch(operations, operation) && linearSearch(roles, role);
};

const linearSearch = (arr: string[], target: string): boolean => {
    let element: string;
    for (element of arr) {
        if (element === target) {
            return true;
        }
    }
    return false;
};

export default hasPermission;