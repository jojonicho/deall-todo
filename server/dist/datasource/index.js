"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const constants_1 = require("src/constants");
const typeorm_1 = require("typeorm");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: constants_1.DATABASE_URL,
    synchronize: true,
    entities: ["src/entity/*.ts"],
    ssl: false,
});
//# sourceMappingURL=index.js.map