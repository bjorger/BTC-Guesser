"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const todo_dynamoclient_repository_1 = require("../common/todo-dynamoclient-repository");
const post_app_1 = require("../apps/post-app");
/**
 * Sample Lambda function which creates an instance of a PostApp and executes it.
 * The PostApp takes the HTTP request body, turns it into a TodoItem and stores it in DynamoDB.
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
    const app = new post_app_1.PostApp(table, repository);
    console.log('Running the PostApp');
    return await app.run(event);
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlGQUFvRjtBQUNwRiwrQ0FBMkM7QUFHM0M7Ozs7Ozs7O0dBUUc7QUFDSSxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBK0IsRUFBRTtJQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDZFQUE2RSxDQUFDLENBQUM7UUFDM0YsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUM5QjtJQUVELE1BQU0sS0FBSyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSx5REFBMEIsRUFBRSxDQUFDO0lBRXBELHdHQUF3RztJQUN4RyxNQUFNLEdBQUcsR0FBYyxJQUFJLGtCQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXRELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuQyxPQUFPLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFkVyxRQUFBLE9BQU8sV0FjbEIifQ==