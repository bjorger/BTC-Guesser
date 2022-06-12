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
        this.userTable = process.env["USER_TABLE"] || "";
        this.docClient = new aws_sdk_1.DynamoDB.DocumentClient();
    }
    async createUser(username, password) {
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);
        const user = new user_1.User(username, hashed);
        const params = {
            TableName: this.userTable,
            Item: user,
            ConditionExpression: "attribute_not_exists(username)",
        };
        try {
            await this.docClient.put(params).promise();
            console.log(`Stored record ${user.username} in the ${this.userTable} Table.`);
            const { username, state, score } = user;
            return {
                username,
                state,
                score,
            };
        }
        catch (_a) {
            throw new Error("Could not create User");
        }
    }
    loginUser(username, password) {
        throw new Error("Method not implemented.");
    }
    getUserById(id) {
        throw new Error("Method not implemented.");
    }
    updateUserScoreById(id, score) {
        throw new Error("Method not implemented.");
    }
    updateUserStateById(id) {
        throw new Error("Method not implemented.");
    }
}
exports.UserDynamoClientRepository = UserDynamoClientRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1keW5hbW9jbGllbnQtcmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXNlci91c2VyLWR5bmFtb2NsaWVudC1yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW1DO0FBQ25DLGlDQUE4QjtBQUU5QiwrQ0FBaUM7QUFHakMsTUFBYSwwQkFBMEI7SUFJbkM7UUFGQSxjQUFTLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFHaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRCxNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQXlDO1lBQ2pELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSTtZQUNWLG1CQUFtQixFQUFFLGdDQUFnQztTQUN4RCxDQUFDO1FBRUYsSUFBSTtZQUNBLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLFFBQVEsV0FBVyxJQUFJLENBQUMsU0FBUyxTQUFTLENBQUMsQ0FBQztZQUM5RSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFeEMsT0FBTztnQkFDSCxRQUFRO2dCQUNSLEtBQUs7Z0JBQ0wsS0FBSzthQUNSLENBQUM7U0FDTDtRQUFDLFdBQU07WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxXQUFXLENBQUMsRUFBVTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELG1CQUFtQixDQUFDLEVBQVUsRUFBRSxLQUFhO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsbUJBQW1CLENBQUMsRUFBVTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBL0NELGdFQStDQyJ9