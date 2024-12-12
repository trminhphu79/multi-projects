/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_module_1 = __webpack_require__(5);
const profile_module_1 = __webpack_require__(24);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            profile_module_1.ProfileModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(6);
const auth_controller_1 = __webpack_require__(15);
const sequelize_1 = __webpack_require__(14);
const account_1 = __webpack_require__(8);
const conversation_1 = __webpack_require__(11);
const message_1 = __webpack_require__(23);
const profile_1 = __webpack_require__(10);
const friend_1 = __webpack_require__(13);
const user_conversation_1 = __webpack_require__(12);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [message_1.Message, profile_1.Profile, friend_1.Friend, conversation_1.Conversation, account_1.Account, user_conversation_1.UserConversation],
                autoLoadModels: true,
                synchronize: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                message_1.Message,
                profile_1.Profile,
                friend_1.Friend,
                conversation_1.Conversation,
                account_1.Account,
                user_conversation_1.UserConversation,
            ]),
        ],
    })
], AuthModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(7);
const account_1 = __webpack_require__(8);
const sequelize_1 = __webpack_require__(14);
const profile_1 = __webpack_require__(10);
let AuthService = class AuthService {
    constructor(userModel, profileModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
    }
    createOne(payload) {
        return (0, rxjs_1.from)(this.userModel.findOrCreate({
            where: { username: payload.username },
            defaults: {
                username: payload.username,
                password: payload.password, // Make sure to hash the password before saving
            },
        })).pipe((0, rxjs_1.switchMap)(async ([account, isCreated]) => {
            if (!isCreated) {
                return {
                    message: 'User already exists!',
                    data: payload,
                };
            }
            // Create a profile for the newly created account
            const profile = await this.profileModel.create({
                accountId: account.id,
                fullName: account.username || 'default-name',
                avatarUrl: this.randomImg(),
                bio: 'Chat with me',
            });
            const result = account.toJSON();
            delete result.password;
            return {
                message: 'Account and profile created successfully!',
                account: result,
                profile,
            };
        }));
    }
    signIn(payload) {
        return (0, rxjs_1.from)(this.userModel.findOne({
            where: {
                username: payload.username,
                password: payload.password,
            },
        })).pipe((0, rxjs_1.switchMap)((response) => {
            if (!response) {
                return (0, rxjs_1.throwError)(() => new common_1.BadRequestException('Invalid credentials'));
            }
            return (0, rxjs_1.of)(response);
        }), (0, rxjs_1.tap)((response) => {
            console.log('response: ', response);
        }));
    }
    randomImg() {
        const images = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpTxZYsXlSi3QjP1ourPWa0ceS1-3qMP2yGw&s',
            'https://wallpapershome.com/images/pages/pic_v/25654.jpg',
            'https://imgcdn.stablediffusionweb.com/2024/9/19/c86d2133-6b44-4892-a830-a2b403df5798.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynVaVrlGzFHaL33Qx5QVLGdNiT1bB2IgS-g&s',
        ];
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(account_1.Account)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(profile_1.Profile)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], AuthService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(9);
const profile_entity_1 = __webpack_require__(10);
let Account = class Account extends sequelize_typescript_1.Model {
};
exports.Account = Account;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_entity_1.Profile),
    tslib_1.__metadata("design:type", Array)
], Account.prototype, "profiles", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Account.prototype, "username", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Account.prototype, "password", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Account.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Account.prototype, "updatedAt", void 0);
exports.Account = Account = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'account' })
], Account);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Profile = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(9);
const conversation_entity_1 = __webpack_require__(11);
const account_entity_1 = __webpack_require__(8);
const user_conversation_entity_1 = __webpack_require__(12);
const friend_entity_1 = __webpack_require__(13);
let Profile = class Profile extends sequelize_typescript_1.Model {
};
exports.Profile = Profile;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => account_entity_1.Account),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => account_entity_1.Account),
    tslib_1.__metadata("design:type", typeof (_a = typeof account_entity_1.Account !== "undefined" && account_entity_1.Account) === "function" ? _a : Object)
], Profile.prototype, "account", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => conversation_entity_1.Conversation, () => user_conversation_entity_1.UserConversation),
    tslib_1.__metadata("design:type", Array)
], Profile.prototype, "conversations", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "fullName", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "avatarUrl", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: null,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Profile.prototype, "dob", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Profile.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Profile.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Profile, () => friend_entity_1.Friend, 'profileId', 'friendId'),
    tslib_1.__metadata("design:type", Array)
], Profile.prototype, "friends", void 0);
exports.Profile = Profile = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profile' })
], Profile);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Conversation = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(9);
const profile_entity_1 = __webpack_require__(10);
const user_conversation_entity_1 = __webpack_require__(12);
let Conversation = class Conversation extends sequelize_typescript_1.Model {
};
exports.Conversation = Conversation;
tslib_1.__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Conversation.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Conversation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: false }),
    tslib_1.__metadata("design:type", Boolean)
], Conversation.prototype, "isGroup", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => profile_entity_1.Profile, () => user_conversation_entity_1.UserConversation),
    tslib_1.__metadata("design:type", Array)
], Conversation.prototype, "members", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Conversation.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Conversation.prototype, "updatedAt", void 0);
exports.Conversation = Conversation = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'conversation' })
], Conversation);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserConversation = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(9);
const conversation_entity_1 = __webpack_require__(11);
const profile_entity_1 = __webpack_require__(10);
let UserConversation = class UserConversation extends sequelize_typescript_1.Model {
};
exports.UserConversation = UserConversation;
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => conversation_entity_1.Conversation),
    (0, sequelize_typescript_1.Column)({ field: 'conversationId' }),
    tslib_1.__metadata("design:type", Number)
], UserConversation.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_entity_1.Profile),
    (0, sequelize_typescript_1.Column)({ field: 'userId' }),
    tslib_1.__metadata("design:type", Number)
], UserConversation.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: sequelize_typescript_1.DataType.NOW }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserConversation.prototype, "joinedAt", void 0);
exports.UserConversation = UserConversation = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'conversation_members' })
], UserConversation);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Friend = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(9);
const profile_entity_1 = __webpack_require__(10);
let Friend = class Friend extends sequelize_typescript_1.Model {
};
exports.Friend = Friend;
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_entity_1.Profile),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Friend.prototype, "profileId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_entity_1.Profile),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Friend.prototype, "friendId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Friend.prototype, "isBestFriend", void 0);
exports.Friend = Friend = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'friend' })
], Friend);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(16);
const auth_1 = __webpack_require__(17);
const account_1 = __webpack_require__(20);
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    createAccount(body) {
        return this.service.createOne(body);
    }
    signIn(body) {
        return this.service.signIn(body);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: auth_1.MESSAGE_PATTERN_AUTH.CREATE }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_1.CreateAccountDto !== "undefined" && account_1.CreateAccountDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "createAccount", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: auth_1.MESSAGE_PATTERN_AUTH.SIGN_IN }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_1.CreateAccountDto !== "undefined" && account_1.CreateAccountDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(18), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MESSAGE_PATTERN_PROFILE = exports.MESSAGE_PATTERN_AUTH = void 0;
const microservice_1 = __webpack_require__(19);
const MODULES_NAME = Object.freeze({
    AUTH: `${microservice_1.MICRO_SERVICE_NAMES.AUTH_SERVICE}/AUTH_MODULE`,
    PROFILE: `${microservice_1.MICRO_SERVICE_NAMES.AUTH_SERVICE}/PROFILE_MODULE`,
});
exports.MESSAGE_PATTERN_AUTH = Object.freeze({
    CREATE: `${MODULES_NAME.AUTH}/create`,
    UPDATE: `${MODULES_NAME.AUTH}/update`,
    DELETE: `${MODULES_NAME.AUTH}/delete`,
    SIGN_IN: `${MODULES_NAME.AUTH}/sign-in`,
    REFRESH_TOKEN: `${MODULES_NAME.AUTH}/refresh-token`,
});
exports.MESSAGE_PATTERN_PROFILE = Object.freeze({
    UPDATE: `${MODULES_NAME.PROFILE}/update`,
    ADD_FRIEND: `${MODULES_NAME.PROFILE}/add-friend`,
    SEARCH_FRIEND: `${MODULES_NAME.PROFILE}/search-friend`,
    GET_USER_FRIENDS: `${MODULES_NAME.PROFILE}/get-user-friend`,
});


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MICRO_SERVICE_NAMES = void 0;
exports.MICRO_SERVICE_NAMES = Object.freeze({
    AUTH_SERVICE: 'AUTH_SERVICE',
    CHAT_SERVICE: 'CHAT_SERVICE',
});


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
class CreateAccountDto {
}
exports.CreateAccountDto = CreateAccountDto;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInAccountDto = void 0;
class SignInAccountDto {
}
exports.SignInAccountDto = SignInAccountDto;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(9);
const profile_entity_1 = __webpack_require__(10);
const conversation_entity_1 = __webpack_require__(11);
let Message = class Message extends sequelize_typescript_1.Model {
};
exports.Message = Message;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Message.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => conversation_entity_1.Conversation),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Message.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_entity_1.Profile),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Message.prototype, "senderId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Message.prototype, "content", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: 'TEXT' }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "messageType", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Message.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Message.prototype, "updatedAt", void 0);
exports.Message = Message = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'message', timestamps: true })
], Message);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const profile_service_1 = __webpack_require__(25);
const profile_controller_1 = __webpack_require__(27);
const sequelize_1 = __webpack_require__(14);
const account_1 = __webpack_require__(8);
const conversation_1 = __webpack_require__(11);
const message_1 = __webpack_require__(23);
const profile_1 = __webpack_require__(10);
const friend_1 = __webpack_require__(13);
const user_conversation_1 = __webpack_require__(12);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [profile_service_1.ProfileService],
        controllers: [profile_controller_1.ProfileController],
        exports: [profile_service_1.ProfileService],
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [
                    friend_1.Friend,
                    account_1.Account,
                    message_1.Message,
                    profile_1.Profile,
                    conversation_1.Conversation,
                    user_conversation_1.UserConversation,
                ],
                autoLoadModels: true,
                synchronize: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                friend_1.Friend,
                message_1.Message,
                profile_1.Profile,
                account_1.Account,
                conversation_1.Conversation,
                user_conversation_1.UserConversation,
            ]),
        ],
    })
], ProfileModule);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(14);
const profile_1 = __webpack_require__(10);
const conversation_1 = __webpack_require__(11);
const rxjs_1 = __webpack_require__(7);
const sequelize_2 = __webpack_require__(26);
let ProfileService = class ProfileService {
    constructor(model, conversationModel) {
        this.model = model;
        this.conversationModel = conversationModel;
    }
    updateOne(payload) {
        const payloadUpdate = { ...payload };
        delete payloadUpdate.id;
        return (0, rxjs_1.from)(this.model.update(payloadUpdate, { where: { id: payload.id } }));
    }
    async addFriend(payload) {
        const { profileId, friendId } = payload;
        const profile = await this.model.findByPk(profileId, {
            include: { model: this.model, as: 'friends' },
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Profile with id ${profileId} not found`);
        }
        const friend = await this.model.findByPk(friendId);
        if (!friend) {
            throw new common_1.NotFoundException(`Profile with id ${friendId} not found`);
        }
        const isAlreadyFriend = profile.friends.some((existingFriend) => existingFriend.id === friendId);
        if (isAlreadyFriend) {
            throw new common_1.BadRequestException(`Profile with id ${friendId} is already a friend`);
        }
        common_1.Logger.log("Add friend " + friend.fullName + " successfully!");
        await profile.$add('friends', friend);
        const createdConversation = await this.conversationModel.create({
            name: `Conversation between ${profileId} and ${friendId}`,
        });
        await createdConversation.$set('members', [profileId, friendId]);
        common_1.Logger.log("Create conversation between " + profile.fullName + " and " + friend.fullName + " successfully!");
        return {
            data: friend,
            message: 'Add friend successfully!',
        };
    }
    searchFriend(payload) {
        const { keyword, offset = 0, limit = 10, sortField = 'fullName', sortOrder = 'ASC', } = payload;
        return (0, rxjs_1.from)(this.model.findAndCountAll({
            where: {
                [sequelize_2.Op.or]: [
                    {
                        fullName: {
                            [sequelize_2.Op.iLike]: `%${keyword}%`, // Case-insensitive partial match
                        },
                    },
                    {
                        bio: {
                            [sequelize_2.Op.iLike]: `%${keyword}%`,
                        },
                    },
                ],
            },
            offset,
            limit,
            order: [[sortField, sortOrder]], // Dynamic sorting
        })).pipe((0, rxjs_1.map)((result) => ({
            data: result.rows, // List of friends
            totalCount: result.count, // Total number of matching records
            pagination: {
                offset,
                limit,
                currentPage: Math.ceil(offset / limit) + 1,
                totalPages: Math.ceil(result.count / limit),
            },
            message: 'Search completed successfully!',
        })));
    }
    getUserFriends(profileId) {
        return (0, rxjs_1.from)(this.model.findOne({
            where: { accountId: profileId },
            include: [
                {
                    model: profile_1.Profile,
                    as: 'friends', // Alias defined in the relationship
                    through: { attributes: [] }, // Exclude the join table from the result
                },
            ],
        }));
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(profile_1.Profile)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(conversation_1.Conversation)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ProfileService);


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(16);
const profile_1 = __webpack_require__(28);
const auth_1 = __webpack_require__(17);
const profile_service_1 = __webpack_require__(25);
const rxjs_1 = __webpack_require__(7);
let ProfileController = class ProfileController {
    constructor(service) {
        this.service = service;
    }
    updateProfile(body) {
        return this.service.updateOne(body).pipe((0, rxjs_1.map)((response) => {
            if (response[0] > 0) {
                return {
                    message: 'Update successfully!!',
                    data: response,
                };
            }
            return {
                message: 'Update failed!!',
                data: null,
            };
        }));
    }
    addFriend(body) {
        return (0, rxjs_1.from)(this.service.addFriend(body)).pipe((0, rxjs_1.map)((response) => {
            return {
                message: 'Addfriend successfully!!',
                data: body,
            };
        }));
    }
    searchFriend(body) {
        return this.service.searchFriend(body);
    }
    getUserFriends(profileId) {
        console.log('ID: ', profileId);
        return this.service.getUserFriends(profileId).pipe();
    }
};
exports.ProfileController = ProfileController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: auth_1.MESSAGE_PATTERN_PROFILE.UPDATE }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof profile_1.UpdateProfileDto !== "undefined" && profile_1.UpdateProfileDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "updateProfile", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: auth_1.MESSAGE_PATTERN_PROFILE.ADD_FRIEND }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof profile_1.AddFriendDto !== "undefined" && profile_1.AddFriendDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "addFriend", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: auth_1.MESSAGE_PATTERN_PROFILE.SEARCH_FRIEND }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof profile_1.SearchFriendDto !== "undefined" && profile_1.SearchFriendDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "searchFriend", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: auth_1.MESSAGE_PATTERN_PROFILE.GET_USER_FRIENDS }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "getUserFriends", null);
exports.ProfileController = ProfileController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _a : Object])
], ProfileController);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileDto = void 0;
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddFriendDto = void 0;
class AddFriendDto {
}
exports.AddFriendDto = AddFriendDto;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchFriendDto = void 0;
class SearchFriendDto {
}
exports.SearchFriendDto = SearchFriendDto;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(16);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: [process.env.NATS_URL],
        },
    });
    await app.listen();
    common_1.Logger.log('Auth Microservice is Running!');
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map