import * as queryString from 'query-string';


const validateEmail = (str: string) => {
  console.log('validateEmail', str);
  const regex = /^[A-Za-z0-9._%+-]+@successive.tech$/;
  return regex.test(str);
};

const initSearch = async (search) => {
  const filter: object = queryString.parse(search);
  if (Object.keys(filter).length) {
    Object.keys(filter).map(key => {
      const regex = new RegExp('^' + filter[key]);
      filter[key] = { $regex: regex, $options: 'i' };
    });
  }
  return filter;
};

export { validateEmail, initSearch };