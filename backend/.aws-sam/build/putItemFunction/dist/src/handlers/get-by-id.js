"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_by_id_app_1 = require("../apps/get-by-id-app");
const todo_dynamoclient_repository_1 = require("../common/todo-dynamoclient-repository");
/**
 * Sample Lambda function which creates an instance of a GetByIdApp and executes it.
 * The GetByIdApp evaluates the request path parameters and queries DynamoDB for the Id given.
 *
 * @param {Object} event - Input event to the Lambda function
 *
 * @returns {Object} object - Object containing the TodoItem stored.
 *
 */
const handler = async (event) => {
    if (!process.env['SAMPLE_TABLE']) {
        console.log('Lambda environment variables is missing the SAMPLE_TABLE variable required.');
        return { statusCode: 500 };
    }
    const table = process.env['SAMPLE_TABLE'];
    const repository = new todo_dynamoclient_repository_1.TodoDynamoClientRepository();
    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app = new get_by_id_app_1.GetByIdApp(table, repository);
    console.log('Running the GetByIdApp');
    return await app.run(event);
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWJ5LWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hhbmRsZXJzL2dldC1ieS1pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx5REFBbUQ7QUFDbkQseUZBQW9GO0FBR3BGOzs7Ozs7OztHQVFHO0FBQ0ksTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQStCLEVBQUU7SUFDakYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO1FBQzNGLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDOUI7SUFFRCxNQUFNLEtBQUssR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUkseURBQTBCLEVBQUUsQ0FBQztJQUVwRCx3R0FBd0c7SUFDeEcsTUFBTSxHQUFHLEdBQWMsSUFBSSwwQkFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV6RCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBZFcsUUFBQSxPQUFPLFdBY2xCIn0=