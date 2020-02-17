import { Request, Response, NextFunction } from 'express';

const validateTrainee = config => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('-----------validateTrainee----------');
        const parameters: string[] = Object.keys(config);
        const errorLogs: string[] = [];
        parameters.forEach(parameter => {
            const isRequired: boolean = config[parameter].required ? config[parameter].required : false;
            const errorMessage: string = config[parameter].errorMessage ? config[parameter].errorMessage : undefined;
            const isNumber: boolean = config[parameter].number ? config[parameter].number : false;
            const isString: boolean = config[parameter].string ? config[parameter].string : false;
            const isObject: boolean = config[parameter].isObject ? config[parameter].isObject : false;
            const constant: number = config[parameter].default ? config[parameter].default : undefined;
            const regex: RegExp = config[parameter].regex ? config[parameter].regex : undefined;
            const custom: any = config[parameter].custom ? config[parameter].custom : undefined;
            const inputs: string[] = config[parameter].in ? config[parameter].in : undefined;
            if (inputs) {
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
                    if (isFieldExits && custom) { // check custom case if exits
                        try {
                           //custom(req[input][parameter]);
                        } catch (err) {
                            errorLogs.push(err);
                        }
                    }
                    if (constant && !req[input][parameter]) {
                        req[input][parameter] = constant;
                    }
                    if (isFieldExits && regex && !regex.test(req[input][parameter]) ) {
                        errorLogs.push(` ${parameter} is Invalid`);
                    }
                });
            }
        });
         (errorLogs.length !== 0) ?  next(errorLogs) : next();
    };
};
export default validateTrainee;