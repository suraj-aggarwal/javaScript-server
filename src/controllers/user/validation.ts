const validate = {
    create:
    {
        name: {
            required: true,
            regex: /^[a-zA-Z][a-zA-Z ]+$/,
            in: ['body'],
            errorMessage: 'Name is required',
        },
        email: {
            required: true,
            regex: /^[A-Za-z0-9._%+-]+@successive.tech$/,
            in: ['body'],
            errorMessage: 'email is required',
        },
        role: {
            required: true,
            regex: /^trainee|trainer|head-trainer$/,
            in: ['body'],
            errorMessage: 'role is required',
        }
    }, delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    },
    list: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
        limit: {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
        }
    }, update: {
        id: {
            required: true,
            string: true,
            in: ['body']
        },
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: dataToUpdate => {
                console.log('custom function');
            },
        }
    }, get: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    }
};

export default validate;