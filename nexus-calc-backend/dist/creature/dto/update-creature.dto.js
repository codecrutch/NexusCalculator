"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreatureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_creature_dto_1 = require("./create-creature.dto");
class UpdateCreatureDto extends (0, mapped_types_1.PartialType)(create_creature_dto_1.CreateCreatureDto) {
}
exports.UpdateCreatureDto = UpdateCreatureDto;
//# sourceMappingURL=update-creature.dto.js.map