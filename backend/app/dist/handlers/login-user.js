"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const user_dynamoclient_repository_1 = require("../common/user/user-dynamoclient-repository");
const login_user_app_1 = require("../apps/login-user-app");
const handler = async (event) => {
    const repository = new user_dynamoclient_repository_1.UserDynamoClientRepository();
    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app = new login_user_app_1.LoginUserApp(repository);
    console.log("Running the LoginUserApp");
    return await app.run(event);
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9sb2dpbi11c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDhGQUF5RjtBQUN6RiwyREFBc0Q7QUFFL0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQStCLEVBQUU7SUFDakYsTUFBTSxVQUFVLEdBQUcsSUFBSSx5REFBMEIsRUFBRSxDQUFDO0lBRXBELHdHQUF3RztJQUN4RyxNQUFNLEdBQUcsR0FBYyxJQUFJLDZCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQVJXLFFBQUEsT0FBTyxXQVFsQiJ9