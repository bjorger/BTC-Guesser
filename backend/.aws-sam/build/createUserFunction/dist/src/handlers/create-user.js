"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const user_dynamoclient_repository_1 = require("../common/user-dynamoclient-repository");
const create_user_app_1 = require("../apps/create-user-app");
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
    const repository = new user_dynamoclient_repository_1.UserDynamoClientRepository();
    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app = new create_user_app_1.CreateUserApp(repository);
    console.log("Running the CreateUserApp");
    return await app.run(event);
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGFuZGxlcnMvY3JlYXRlLXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EseUZBQW9GO0FBQ3BGLDZEQUF3RDtBQUV4RDs7Ozs7Ozs7R0FRRztBQUNJLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUErQixFQUFFO0lBQ2pGLE1BQU0sVUFBVSxHQUFHLElBQUkseURBQTBCLEVBQUUsQ0FBQztJQUVwRCx3R0FBd0c7SUFDeEcsTUFBTSxHQUFHLEdBQWMsSUFBSSwrQkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXJELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN6QyxPQUFPLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFSVyxRQUFBLE9BQU8sV0FRbEIifQ==