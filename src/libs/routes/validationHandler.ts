import { Request, Response, NextFunction } from 'express';

const validateTrainee = config => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('-----------validateTrainee----------');
        const parameters: string[] = Object.keys(config);
        const errorLogs: string[] = [];
        parameters.forEach(parametr => {
            const validaters: string[] = Object.keys(config[parametr]);
            const isRequiredAvaliable = validaters.includes('required');
            const isErrorMessageAvaliable = validaters.includes('errorMessage');
            const isNumberAvaliable = validaters.includes('number');
            const isStringAvaliable = validaters.includes('string');
            const isObjectAvaliable = validaters.includes('isObject');
            const isDefaultAvaliable = validaters.includes('default');
            const isRegexAvaliable = validaters.includes('regex');
            const isCustomAvaliable = validaters.includes('custom');
            const isInAvaliable = validaters.includes('in');

            const isRequired: boolean = (isRequiredAvaliable) ? config[parametr]['required'] : isRequiredAvaliable;
            const errorMessage: string = (isErrorMessageAvaliable) ? config[parametr]['errorMessage'] : undefined;
            const isNumber: boolean = (isNumberAvaliable) ? config[parametr]['number'] : isNumberAvaliable;
            const isString: boolean = (isStringAvaliable) ? config[parametr]['string'] : isStringAvaliable;
            const isObject: boolean = (isObjectAvaliable) ? config[parametr]['isObject'] : isObjectAvaliable;
            const constant: number = (isDefaultAvaliable) ? config[parametr]['default'] : undefined;
            const regex: RegExp = (isRegexAvaliable) ? config[parametr]['regex'] : undefined;
            const custom: any = (isCustomAvaliable) ? config[parametr]['custom'] : undefined;
            const input: string = (isInAvaliable) ? config[parametr]['in'] : undefined;



            if (input !== undefined) {

                const clientInputFields: string[] = Object.keys(req[input]);
                const isFieldExits: boolean = clientInputFields.includes(parametr);

                if (!isFieldExits && isRequired) {
                    errorLogs.push(`${parametr} is Required`);
                }

                if (isFieldExits) {   // check the type of Input.
                    const value: string = req[input][parametr];
                    const type: string = typeof value;
                    if (isString && type !== 'string') {
                        errorLogs.push(`${parametr} String type is Required`);
                    } else if (isNumber && isNaN(Number(value))) {
                        errorLogs.push(`${parametr} Number type is Required`);
                    } else if (isObject && type !== 'object') {
                        errorLogs.push(`${parametr} object type is Required`);
                    }
                }

                if (isFieldExits && custom !== undefined) { // check custom case if exits
                    console.log('custom');
                }

                if (isFieldExits && constant !== undefined && (req[input][parametr] === undefined || req[input][parametr] === null)) {
                    req[input][parametr] = constant;
                }

                if (isFieldExits && regex !== undefined && regex.test(req[input][parametr]) && errorMessage !== undefined) {
                    errorLogs.push(` ${req[input][parametr]} format is not correct`);
                }
            }
        });
        if (errorLogs.length !== 0) {
            next(errorLogs);
        }
        next();
    };
};

export default validateTrainee;