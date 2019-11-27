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
const StateHistoryPostgresAbiProvider_1 = require("./StateHistoryPostgresAbiProvider");
describe('StateHistoryPostgresAbiProvider', () => {
    let stateHistoryPostgresAbiProvider;
    beforeEach(() => {
        const massiveMock = {
            chain: {
                account: {
                    findOne: () => ({
                        account_name: 'test',
                        abi: [10, 11, 12],
                    }),
                },
            }
        };
        stateHistoryPostgresAbiProvider = new StateHistoryPostgresAbiProvider_1.StateHistoryPostgresAbiProvider(massiveMock);
    });
    it('retrieves abis', () => __awaiter(this, void 0, void 0, function* () {
        const abi = yield stateHistoryPostgresAbiProvider.getRawAbi('test');
        expect(abi).toEqual({
            accountName: 'test',
            abi: [10, 11, 12],
        });
    }));
});
//# sourceMappingURL=StateHistoryPostgresAbiProvider.test.js.map