"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const user_dynamoclient_repository_1 = require("../common/user-dynamoclient-repository");
const create_user_app_1 = require("../apps/create-user-app");
/**
 * Lambda function which creates an instance of a CreateUserApp and executes it.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGFuZGxlcnMvY3JlYXRlLXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EseUZBQW9GO0FBQ3BGLDZEQUF3RDtBQUV4RDs7Ozs7OztHQU9HO0FBQ0ksTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQStCLEVBQUU7SUFDakYsTUFBTSxVQUFVLEdBQUcsSUFBSSx5REFBMEIsRUFBRSxDQUFDO0lBRXBELHdHQUF3RztJQUN4RyxNQUFNLEdBQUcsR0FBYyxJQUFJLCtCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQVJXLFFBQUEsT0FBTyxXQVFsQiJ9