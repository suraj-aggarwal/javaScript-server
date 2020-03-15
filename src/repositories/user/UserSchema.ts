import { VersionableSchema } from '../versionable/VersionableSchema';
class UserSchema extends VersionableSchema {
  constructor(option) {
    const userSchema = {
      name: String,
      email: String,
      password: String,
      role: String,
      address: String,
      mod: Number,
      dob: Date,
      hobbies: [String]
    };
    super(userSchema, option);
  }
}

export default UserSchema;

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          id:
 *              type: interger
 *          name:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 *          hobbies:
 *              type: array
 *          role:
 *              type: string
 *          mod:
 *              type: integer
 *          dob:
 *              type: Date
 *          required:
 *              - name
 *              - email
 *              - password
 *              - role
 */
