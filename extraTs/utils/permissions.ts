import { permissions } from '../constants';

const hasPermission = (mod: string, operation: string, role: string) => {
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
