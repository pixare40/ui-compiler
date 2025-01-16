"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommonPartial = addCommonPartial;
function addCommonPartial(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
        const zone = target.zone ? `"$zone": "${target.zone}",` : '';
        return `{
            "$type": "${this.propertyName || this.constructor.name}",
            ${zone}
            "attributes": ${originalMethod === null || originalMethod === void 0 ? void 0 : originalMethod.call(this)}
        }`;
    };
    return descriptor;
}
