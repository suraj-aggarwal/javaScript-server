import { Request, Response, NextFunction } from 'express';

const validateTrainee = config => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('-----------validateTrainee----------');
        const parameters: string[] = Object.keys(config);
        const errorLogs: string[] = [];
        parameters.forEach(parameter => {
            const validaters: string[] = Object.keys(config[parameter]);
            const isRequiredAvaliable = validaters.includes('required');
            const isErrorMessageAvaliable = validaters.includes('errorMessage');
            const isNumberAvaliable = validaters.includes('number');
            const isStringAvaliable = validaters.includes('string');
            const isObjectAvaliable = validaters.includes('isObject');
            const isDefaultAvaliable = validaters.includes('default');
            const isRegexAvaliable = validaters.includes('regex');
            const isCustomAvaliable = validaters.includes('custom');
            const isInAvaliable = validaters.includes('in');

            const isRequired: boolean = (isRequiredAvaliable) ? config[parameter]['required'] : isRequiredAvaliable;
            const errorMessage: string = (isErrorMessageAvaliable) ? config[parameter]['errorMessage'] : undefined;
            const isNumber: boolean = (isNumberAvaliable) ? config[parameter]['number'] : isNumberAvaliable;
            const isString: boolean = (isStringAvaliable) ? config[parameter]['string'] : isStringAvaliable;
            const isObject: boolean = (isObjectAvaliable) ? config[parameter]['isObject'] : isObjectAvaliable;
            const constant: number = (isDefaultAvaliable) ? config[parameter]['default'] : undefined;
            const regex: RegExp = (isRegexAvaliable) ? config[parameter]['regex'] : undefined;
            const custom: any = (isCustomAvaliable) ? config[parameter]['custom'] : undefined;
            const inputs: string[] = (isInAvaliable) ? config[parameter]['in'] : undefined;



            if (inputs !== undefined) {

                inputs.forEach(input => {

                    const clientinputsFields: string[] = Object.keys(req[input]);
                    const isFieldExits: boolean = clientinputsFields.includes(parameter);

                    if (!isFieldExits && isRequired) {
                        errorLogs.push(`${parameter} is Required`);
                    }

                    if (isFieldExits) {   // check the type of input.
                        const value: string = req[input][parameter];
                        const type: string = typeof value;
                        if (isString && type !== 'string') {
                            errorLogs.push(`${parameter} String type is Required`);
                        } else if (isNumber && isNaN(Number(value))) {
                            errorLogs.push(`${parameter} Number type is Required`);
                        } else if (isObject && type !== 'object') {
                            errorLogs.push(`${parameter} object type is Required`);
                        }
                    }

                    if (isFieldExits && custom !== undefined) { // check custom case if exits
                        console.log('custom');
                    }

                    if (isFieldExits && constant !== undefined && (req[input][parameter] === undefined || req[input][parameter] === null)) {
                        req[input][parameter] = constant;
                    }

                    if (isFieldExits && regex !== undefined && !regex.test(req[input][parameter]) && errorMessage !== undefined) {
                        errorLogs.push(` ${req[input][parameter]} format is not correct`);
                    }
                });
            }
        });
        if (errorLogs.length !== 0) {
            next(errorLogs);
        }
        next();
    };
};

export default validateTrainee;