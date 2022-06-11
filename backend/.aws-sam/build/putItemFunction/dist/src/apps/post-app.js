"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostApp = void 0;
/**
 * PostApp is a LambdaApp that puts a new record into DynamoDB using the API Gateway event body as the record content.
 *
 */
class PostApp {
    constructor(table, repository) {
        this.table = table;
        this.repository = repository;
    }
    async run(event) {
        let todo;
        try {
            todo = JSON.parse(event.body);
            if (!todo.title) {
                console.log('Body is missing the title');
                return { statusCode: 422 };
            }
            else if (!todo.isComplete) {
                todo.isComplete = false;
            }
            else if (!todo.id) {
                console.log('Body is missing the id');
                return { statusCode: 422 };
            }
        }
        catch (err) {
            console.log('Event body could not be parsed as JSON');
            return { statusCode: 400 };
        }
        try {
            await this.repository.putTodo(todo, this.table);
            return { statusCode: 201, body: JSON.stringify(todo) };
        }
        catch (err) {
            console.log(err.message);
            return { statusCode: 500 };
        }
    }
}
exports.PostApp = PostApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwcy9wb3N0LWFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQTs7O0dBR0c7QUFDSCxNQUFhLE9BQU87SUFJaEIsWUFBWSxLQUFhLEVBQUUsVUFBMEI7UUFDakQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBc0I7UUFDNUIsSUFBSSxJQUFjLENBQUE7UUFDbEIsSUFBSTtZQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQzNCO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDOUI7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFFRCxJQUFJO1lBQ0EsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDMUQ7UUFBQyxPQUFNLEdBQUcsRUFBRTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDO0NBQ0o7QUFuQ0QsMEJBbUNDIn0=