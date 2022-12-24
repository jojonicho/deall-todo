"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: constants_1.DATABASE_URL,
    synchronize: true,
    entities: ["src/entity/*.ts"],
    ssl: false,
});
//# sourceMappingURL=datasource.js.map