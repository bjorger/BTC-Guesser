"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDynamoClientRepository = void 0;
const aws_sdk_1 = require("aws-sdk");
const user_1 = require("./user");
const bcrypt = __importStar(require("bcrypt"));
class UserDynamoClientRepository {
    constructor() {
        this.docClient = new aws_sdk_1.DynamoDB.DocumentClient();
    }
    async createUser(username, password) {
        const table = process.env["TABLE"] || "";
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);
        const user = new user_1.User();
        user.createdAt = new Date();
        user.password = hashed;
        user.username = username;
        user.score = 0;
        const params = {
            TableName: table,
            Item: user,
            ConditionExpression: "attribute_not_exists(username)",
        };
        try {
            await this.docClient.put(params).promise();
            console.log(`Stored record ${user.username} in the ${table} Table.`);
            return { user };
        }
        catch (_a) {
            throw new Error("Could not create User");
        }
    }
    loginUser(username, password, table) {
        throw new Error("Method not implemented.");
    }
    getUserById(id, table) {
        throw new Error("Method not implemented.");
    }
    updateUserScoreById(id, table, score) {
        throw new Error("Method not implemented.");
    }
    updateUserStateById(id, table) {
        throw new Error("Method not implemented.");
    }
}
exports.UserDynamoClientRepository = UserDynamoClientRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1keW5hbW9jbGllbnQtcmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXNlci1keW5hbW9jbGllbnQtcmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFtQztBQUNuQyxpQ0FBOEI7QUFFOUIsK0NBQWlDO0FBRWpDLE1BQWEsMEJBQTBCO0lBR25DO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQ1osUUFBZ0IsRUFDaEIsUUFBZ0I7UUFJaEIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekMsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZixNQUFNLE1BQU0sR0FBeUM7WUFDakQsU0FBUyxFQUFFLEtBQUs7WUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDVixtQkFBbUIsRUFBRSxnQ0FBZ0M7U0FDeEQsQ0FBQztRQUVGLElBQUk7WUFDQSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksQ0FBQyxRQUFRLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUVyRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDbkI7UUFBQyxXQUFNO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsS0FBYTtRQUN2RCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELFdBQVcsQ0FBQyxFQUFVLEVBQUUsS0FBYTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELG1CQUFtQixDQUFDLEVBQVUsRUFBRSxLQUFhLEVBQUUsS0FBYTtRQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELG1CQUFtQixDQUFDLEVBQVUsRUFBRSxLQUFhO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0o7QUFuREQsZ0VBbURDIn0=