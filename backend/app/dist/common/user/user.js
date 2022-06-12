"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserState = exports.User = void 0;
class User {
    constructor(username, password) {
        this.createdAt = new Date();
        this.state = UserState.CAN_GUESS;
        this.username = username;
        this.password = password;
        this.score = 0;
    }
}
exports.User = User;
var UserState;
(function (UserState) {
    UserState[UserState["CAN_GUESS"] = 0] = "CAN_GUESS";
    UserState[UserState["GUESSING"] = 1] = "GUESSING";
})(UserState = exports.UserState || (exports.UserState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXNlci91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsSUFBSTtJQU9iLFlBQVksUUFBZ0IsRUFBRSxRQUFnQjtRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQWRELG9CQWNDO0FBRUQsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ2pCLG1EQUFTLENBQUE7SUFDVCxpREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCIn0=