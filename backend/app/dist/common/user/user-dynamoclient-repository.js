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
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const jsonwebtoken_1 = require("jsonwebtoken");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
    async loginUser(username, password) {
        const params = {
            TableName: this.userTable,
            Key: {
                username,
            },
        };
        const result = await this.docClient.get(params).promise();
        if (!result || !result.Item) {
            throw new Error("User not found");
        }
        const user = (0, util_dynamodb_1.unmarshall)(result.Item);
        const valid_password = await bcrypt.compare(password, user.password);
        if (!valid_password) {
            throw new Error("Passwords do not match");
        }
        const payload = { username: user.username, createdAt: user.createdAt };
        const privateKey = fs.readFileSync(path.join(__dirname, "./../../private.key"));
        const signInOptions = {
            // RS256 uses a public/private key pair. The API provides the private key
            // to generate the JWT. The client gets a public key to validate the
            // signature
            algorithm: "RS256",
            expiresIn: "1h",
        };
        return { JWT: (0, jsonwebtoken_1.sign)(payload, privateKey, signInOptions) };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1keW5hbW9jbGllbnQtcmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXNlci91c2VyLWR5bmFtb2NsaWVudC1yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW1DO0FBQ25DLGlDQUE4QjtBQUU5QiwrQ0FBaUM7QUFFakMsMERBQW9EO0FBQ3BELCtDQUFpRDtBQUNqRCx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBRTdCLE1BQWEsMEJBQTBCO0lBSW5DO1FBRkEsY0FBUyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBR2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhDLE1BQU0sTUFBTSxHQUF5QztZQUNqRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsSUFBSSxFQUFFLElBQUk7WUFDVixtQkFBbUIsRUFBRSxnQ0FBZ0M7U0FDeEQsQ0FBQztRQUVGLElBQUk7WUFDQSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksQ0FBQyxRQUFRLFdBQVcsSUFBSSxDQUFDLFNBQVMsU0FBUyxDQUFDLENBQUM7WUFDOUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRXhDLE9BQU87Z0JBQ0gsUUFBUTtnQkFDUixLQUFLO2dCQUNMLEtBQUs7YUFDUixDQUFDO1NBQ0w7UUFBQyxXQUFNO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUM5QyxNQUFNLE1BQU0sR0FBeUM7WUFDakQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLEdBQUcsRUFBRTtnQkFDRCxRQUFRO2FBQ1g7U0FDSixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDckM7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFBLDBCQUFVLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBUyxDQUFDO1FBQzdDLE1BQU0sY0FBYyxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsTUFBTSxPQUFPLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBRWhGLE1BQU0sYUFBYSxHQUFnQjtZQUMvQix5RUFBeUU7WUFDekUsb0VBQW9FO1lBQ3BFLFlBQVk7WUFDWixTQUFTLEVBQUUsT0FBTztZQUNsQixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDO1FBRUYsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFBLG1CQUFJLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFDRCxXQUFXLENBQUMsRUFBVTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELG1CQUFtQixDQUFDLEVBQVUsRUFBRSxLQUFhO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsbUJBQW1CLENBQUMsRUFBVTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBOUVELGdFQThFQyJ9