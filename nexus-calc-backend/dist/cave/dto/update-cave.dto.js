"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCaveDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cave_dto_1 = require("./create-cave.dto");
class UpdateCaveDto extends (0, mapped_types_1.PartialType)(create_cave_dto_1.CreateCaveDto) {
}
exports.UpdateCaveDto = UpdateCaveDto;
//# sourceMappingURL=update-cave.dto.js.map