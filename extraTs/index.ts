import { diamond, equilateral } from './patterns';
import { users } from './constants';
import { validation, hasPermission } from './utils';

diamond(5);
equilateral(6);
validation(users);
const result = hasPermission('getUsers', 'write', 'Trainer');
console.log(result);
