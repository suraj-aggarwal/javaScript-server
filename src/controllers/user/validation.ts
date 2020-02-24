const validate = {
    create:
    {
<<<<<<< HEAD
        id: {
            required: false,
            string: true,
            in: ['body'],
            custom: value => {
                console.log('Value', value);
                // throw {
                //     error: 'Error Occured',
                //     message: 'Message'
                // };
            }
        },
=======
>>>>>>> be8cb4ec034b2ffa545c2e0c6bed4276ab9a5459
        name: {
            required: true,
            regex: /^[a-zA-Z][a-zA-Z ]+$/,
            in: ['body'],
            errorMessage: 'Name is required',
        }
    }, delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    },
    get: {
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
    }
};

export default validate;