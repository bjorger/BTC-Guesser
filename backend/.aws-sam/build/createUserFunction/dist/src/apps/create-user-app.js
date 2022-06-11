"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserApp = void 0;
/**
 * PostApp is a LambdaApp that puts a new record into DynamoDB using the API Gateway event body as the record content.
 *
 */
class CreateUserApp {
    constructor(repository) {
        this.repository = repository;
    }
    async run(event) {
        let _username;
        let _password;
        try {
            const { username, password } = JSON.parse(event.body);
            if (!username) {
                console.log("Body is missing the title");
                return { statusCode: 422 };
            }
            else if (!password) {
                console.log("Body is missing the password");
                return { statusCode: 422 };
            }
            _username = username;
            _password = password;
        }
        catch (err) {
            console.log("Event body could not be parsed as JSON");
            return { statusCode: 400 };
        }
        try {
            const result = await this.repository.createUser(_username, _password);
            return { statusCode: 201, body: JSON.stringify(result) };
        }
        catch (err) {
            console.log(err.message);
            return { statusCode: 500, body: "Could not create user" };
        }
    }
}
exports.CreateUserApp = CreateUserApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXItYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcHMvY3JlYXRlLXVzZXItYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BOzs7R0FHRztBQUNILE1BQWEsYUFBYTtJQUd0QixZQUFZLFVBQTBCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQXNCO1FBQzVCLElBQUksU0FBaUIsQ0FBQztRQUN0QixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSTtZQUNBLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1lBQ0QsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUNyQixTQUFTLEdBQUcsUUFBUSxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUM5QjtRQUVELElBQUk7WUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN0RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQzVEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztTQUM3RDtJQUNMLENBQUM7Q0FDSjtBQWxDRCxzQ0FrQ0MifQ==