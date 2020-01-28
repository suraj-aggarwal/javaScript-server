import { diamond, equilateral } from './patterns/index'
import { users } from './constants'
import { validation, hasPermission } from './utils/index'

diamond(process.argv[2])
equilateral(process.argv[3])
validation(users)
let result = hasPermission('getUsers', 'write', 'Trainer')
console.log(result)