"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserApp = void 0;
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
                return { statusCode: 422, body: "Body is missing the title" };
            }
            else if (!password) {
                console.log("Body is missing the password");
                return { statusCode: 422, body: "Body is missing the password" };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXItYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcHMvY3JlYXRlLXVzZXItYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLE1BQWEsYUFBYTtJQUd0QixZQUFZLFVBQTBCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQXNCO1FBQzVCLElBQUksU0FBaUIsQ0FBQztRQUN0QixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSTtZQUNBLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxDQUFDO2FBQ2pFO2lCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFLENBQUM7YUFDcEU7WUFDRCxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxRQUFRLENBQUM7U0FDeEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQzlCO1FBRUQsSUFBSTtZQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDNUQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1NBQzdEO0lBQ0wsQ0FBQztDQUNKO0FBbENELHNDQWtDQyJ9