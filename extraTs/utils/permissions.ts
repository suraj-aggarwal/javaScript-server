<<<<<<< HEAD
import { permissions } from '../constants';
=======
const permissions = {
    'getUsers': {
        all: ['head-Trainer'],
        read: ['Trainer', 'Trainee'],
        write: ['Trainer'],
        delete: []
    }
};
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5

const hasPermission = (mod: string, operation: string, role: string) => {
    console.log('permission', mod, operation, role);
    const commonRoles: string[] = permissions[mod] && permissions[mod][operation];
    const specialRoles: string[] = permissions[mod] && permissions[mod].all;
    let allow: boolean = false;
    if (!commonRoles && !specialRoles) { // special condition undefined.
        return false;
    }
    if (Array.isArray(commonRoles)) {
        allow = commonRoles.indexOf(role) > -1;
    }
    if (!allow && Array.isArray(specialRoles)) {
        allow = specialRoles.indexOf(role) > -1;
    }
    return allow;
};


export default hasPermission;
