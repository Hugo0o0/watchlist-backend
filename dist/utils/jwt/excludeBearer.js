"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excludeBearer = (token) => {
    const splittedToken = token.split(" ");
    if (splittedToken.length !== 2)
        return token;
    return splittedToken[1];
};
exports.default = excludeBearer;
//# sourceMappingURL=excludeBearer.js.map