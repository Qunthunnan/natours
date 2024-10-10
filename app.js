"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const testUser = {
    login: 'qunthunnan',
    name: 'superUser',
    id: 0,
};
app.get('/', (request, response) => {
    //   response.status(200).send('Hello from Express server!');
    response.status(200).json(testUser);
});
const port = 5000;
app.listen(port, () => {
    console.log(`App runnting on port ${port}`);
});
