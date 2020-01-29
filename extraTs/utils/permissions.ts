const permissions = {
    'getUsers': {
        all: ['head-Trainer'],
        read: ['Trainer', 'Trainee'],
        write: ['Trainer'],
        delete: []
    }
};

const hasPermission = (mod, operation, role) => {
    console.log('permission', mod, operation, role);
    const commonRoles: string[] = permissions[mod] && permissions[mod][operation];
    const specialRoles: string[] = permissions[mod] && permissions[mod].all;
    let allow: boolean = false;
    if (!commonRoles && !specialRoles) { // special condition undefined.
        return false;
    }
    if (Array.isArray(commonRoles)) {
        allow = commonRoles.includes(role);
    }
    if (!allow && Array.isArray(specialRoles)) {
        allow = specialRoles.includes(role);
    }
    return allow;
};


export default hasPermission;
