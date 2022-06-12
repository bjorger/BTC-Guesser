"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserApp = void 0;
class LoginUserApp {
    constructor(repository) {
        this.repository = repository;
    }
    async run(event) {
        let _username;
        let _password;
        try {
            const { username, password } = JSON.parse(event.body);
            if (!username) {
                console.log("Body is missing the username");
                return { statusCode: 422, body: "Body is missing the username" };
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
            const result = await this.repository.loginUser(_username, _password);
            return { statusCode: 201, body: JSON.stringify(result) };
        }
        catch (err) {
            console.log(err.message);
            return { statusCode: 500, body: "Could not login user" };
        }
    }
}
exports.LoginUserApp = LoginUserApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdXNlci1hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwcy9sb2dpbi11c2VyLWFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxNQUFhLFlBQVk7SUFHckIsWUFBWSxVQUEwQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFzQjtRQUM1QixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxTQUFpQixDQUFDO1FBRXRCLElBQUk7WUFDQSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsQ0FBQzthQUNwRTtpQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRSxDQUFDO2FBQ3BFO1lBQ0QsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUNyQixTQUFTLEdBQUcsUUFBUSxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUM5QjtRQUVELElBQUk7WUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQzVEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQztTQUM1RDtJQUNMLENBQUM7Q0FDSjtBQW5DRCxvQ0FtQ0MifQ==