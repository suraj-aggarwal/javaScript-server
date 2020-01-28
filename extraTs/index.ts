import { diamond, equilateral } from './patterns/index';
import { users } from './constants';
import { validation, hasPermission } from './utils/index';

diamond(5);
equilateral(5);
validation(users);
const result = hasPermission('getUsers', 'write', 'Trainer');
console.log(result);