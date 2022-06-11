"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdApp = void 0;
/**
 * GetByIdApp is a LambdaApp that queries DynamoDB by the Partition Key and returns the results.
 *
 */
class GetByIdApp {
    constructor(table, repository) {
        this.table = table;
        this.repository = repository;
    }
    async run(event) {
        var _a;
        try {
            if (!((_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id)) {
                console.log('API Gateway event is missing the /{id} parameter path required.');
                return { statusCode: 404 };
            }
            const id = event.pathParameters.id;
            const results = await this.repository.getTodoById(id, this.table);
            return { statusCode: 200, body: JSON.stringify(results) };
        }
        catch (err) {
            console.log(err.message);
            return { statusCode: 500 };
        }
    }
}
exports.GetByIdApp = GetByIdApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWJ5LWlkLWFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBzL2dldC1ieS1pZC1hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0E7OztHQUdHO0FBQ0gsTUFBYSxVQUFVO0lBSW5CLFlBQVksS0FBYSxFQUFFLFVBQTBCO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQXNCOztRQUU1QixJQUFJO1lBQ0EsSUFBSSxDQUFDLENBQUEsTUFBQSxLQUFLLENBQUMsY0FBYywwQ0FBRSxFQUFFLENBQUEsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO2dCQUMvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1lBRUQsTUFBTSxFQUFFLEdBQVcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDM0MsTUFBTSxPQUFPLEdBQWEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FFN0Q7UUFBQyxPQUFNLEdBQUcsRUFBRTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDO0NBQ0o7QUEzQkQsZ0NBMkJDIn0=