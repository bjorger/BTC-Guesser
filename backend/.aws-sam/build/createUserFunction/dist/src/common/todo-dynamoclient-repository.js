"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDynamoClientRepository = void 0;
const aws_sdk_1 = require("aws-sdk");
class TodoDynamoClientRepository {
    constructor() {
        this.docClient = new aws_sdk_1.DynamoDB.DocumentClient();
    }
    // Stores the given TodoItem in the DynamoDB Table specified.
    async putTodo(todoItem, table) {
        const params = {
            TableName: table,
            Item: todoItem
        };
        console.log(`Storing record ${todoItem.id} in the ${table} Table.`);
        await this.docClient.put(params).promise();
        return;
    }
    // Fetches a TodoItem with an Id matching the requested id from DynamoDB.
    async getTodoById(id, table) {
        const params = {
            TableName: table,
            Key: {
                "id": id
            }
        };
        console.log(`Fetching record ${id} from the ${table} Table.`);
        const result = await this.docClient.get(params).promise();
        return result.Item;
    }
}
exports.TodoDynamoClientRepository = TodoDynamoClientRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby1keW5hbW9jbGllbnQtcmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdG9kby1keW5hbW9jbGllbnQtcmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBbUM7QUFLbkMsTUFBYSwwQkFBMEI7SUFJbkM7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsNkRBQTZEO0lBQzdELEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBa0IsRUFBRSxLQUFhO1FBRTNDLE1BQU0sTUFBTSxHQUF5QztZQUNqRCxTQUFTLEVBQUUsS0FBSztZQUNoQixJQUFJLEVBQUUsUUFBUTtTQUNqQixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsUUFBUSxDQUFDLEVBQUUsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0MsT0FBTztJQUNYLENBQUM7SUFFRCx5RUFBeUU7SUFDekUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFVLEVBQUUsS0FBYTtRQUV2QyxNQUFNLE1BQU0sR0FBeUM7WUFDakQsU0FBUyxFQUFFLEtBQUs7WUFDaEIsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1g7U0FDSixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUM7UUFDOUQsTUFBTSxNQUFNLEdBQTBDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakcsT0FBTyxNQUFNLENBQUMsSUFBZ0IsQ0FBQztJQUNuQyxDQUFDO0NBQ0o7QUFuQ0QsZ0VBbUNDIn0=