"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const user_dynamoclient_repository_1 = require("../common/user/user-dynamoclient-repository");
const create_user_app_1 = require("../apps/create-user-app");
const handler = async (event) => {
    const repository = new user_dynamoclient_repository_1.UserDynamoClientRepository();
    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app = new create_user_app_1.CreateUserApp(repository);
    console.log("Running the CreateUserApp");
    return await app.run(event);
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMvY3JlYXRlLXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsOEZBQXlGO0FBQ3pGLDZEQUF3RDtBQUVqRCxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBK0IsRUFBRTtJQUNqRixNQUFNLFVBQVUsR0FBRyxJQUFJLHlEQUEwQixFQUFFLENBQUM7SUFFcEQsd0dBQXdHO0lBQ3hHLE1BQU0sR0FBRyxHQUFjLElBQUksK0JBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVyRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDekMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBUlcsUUFBQSxPQUFPLFdBUWxCIn0=