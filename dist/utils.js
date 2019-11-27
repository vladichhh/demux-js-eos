"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function retry(func, maxNumAttempts, waitMs) {
    return __awaiter(this, void 0, void 0, function* () {
        let numAttempts = 1;
        while (numAttempts <= maxNumAttempts) {
            try {
                return func();
            }
            catch (err) {
                if (numAttempts - 1 === maxNumAttempts) {
                    throw err;
                }
            }
            numAttempts += 1;
            yield wait(waitMs);
        }
        throw new Error(`${maxNumAttempts} retries failed`);
    });
}
exports.retry = retry;
//# sourceMappingURL=utils.js.map