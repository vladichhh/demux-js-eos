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
class StateHistoryPostgresAbiProvider {
    constructor(massiveInstance, dbSchema = 'chain') {
        this.massiveInstance = massiveInstance;
        this.dbSchema = dbSchema;
        this.db = this.massiveInstance[this.dbSchema];
    }
    getRawAbi(accountName) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountRow = this.db.account.findOne({ account_name: accountName });
            const binaryAbi = {
                accountName: accountRow.account_name,
                abi: accountRow.abi,
            };
            return binaryAbi;
        });
    }
}
exports.StateHistoryPostgresAbiProvider = StateHistoryPostgresAbiProvider;
//# sourceMappingURL=StateHistoryPostgresAbiProvider.js.map