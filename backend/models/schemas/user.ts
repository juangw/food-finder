/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - password
 *        properties:
 *          username:
 *            type: string
 *            description: Username logging in
 *          password:
 *            type: string
 *            description: Password of username logging in
 *        example:
 *           username: "test"
 *           password: "test"
 */