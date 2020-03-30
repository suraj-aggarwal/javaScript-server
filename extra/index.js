import { diamond, equilateral } from './patterns'
import { users } from './constants'
import { validation, hasPermission } from './utils'

diamond(process.argv[2])
equilateral(process.argv[3])
validation(users)
let result = hasPermission('getUsers', 'write', 'Trainer');
console.log("::::::::::::Has Permission:::::::::::", result);