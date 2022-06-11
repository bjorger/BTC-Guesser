"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserState = exports.User = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
let User = class User {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.autoGeneratedHashKey)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", Number)
], User.prototype, "score", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", Number)
], User.prototype, "state", void 0);
User = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)("users")
], User);
exports.User = User;
var UserState;
(function (UserState) {
    UserState[UserState["CAN_GUESS"] = 0] = "CAN_GUESS";
    UserState[UserState["GUESSINg"] = 1] = "GUESSINg";
})(UserState = exports.UserState || (exports.UserState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0RkFBeUc7QUFHekcsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtDQWtCaEIsQ0FBQTtBQWhCRztJQURDLElBQUEsdURBQW9CLEdBQUU7O2dDQUNaO0FBR1g7SUFEQyxJQUFBLDJDQUFRLEdBQUU7OEJBQ0EsSUFBSTt1Q0FBQztBQUdoQjtJQURDLElBQUEsNENBQVMsR0FBRTs7c0NBQ0s7QUFHakI7SUFEQyxJQUFBLDRDQUFTLEdBQUU7O3NDQUNLO0FBR2pCO0lBREMsSUFBQSw0Q0FBUyxHQUFFOzttQ0FDRTtBQUdkO0lBREMsSUFBQSw0Q0FBUyxHQUFFOzttQ0FDSztBQWpCUixJQUFJO0lBRGhCLElBQUEsd0NBQUssRUFBQyxPQUFPLENBQUM7R0FDRixJQUFJLENBa0JoQjtBQWxCWSxvQkFBSTtBQW9CakIsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ2pCLG1EQUFTLENBQUE7SUFDVCxpREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCIn0=