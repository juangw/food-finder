/**
 * @swagger
 *  components:
 *    schemas:
 *      Recipe:
 *        type: object
 *        required:
 *          - results
 *          - offset
 *          - number
 *          - totalResults
 *        properties:
 *          results:
 *            type: array
 *            description: Array of results from request
 *          offset:
 *            type: number
 *            description: Offset for results returned from request
 *          number:
 *            type: number
 *            description: Number of results returned from request
 *          totalResults:
 *            type: number
 *            description: Number of results that matched request
 *        example:
 *           results: [{"id": 654959, "title": "Pasta With Tuna", "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg", "imageType": "jpg"}]
 *           offset: 0
 *           number: 1
 *           totalResults: 210
 */