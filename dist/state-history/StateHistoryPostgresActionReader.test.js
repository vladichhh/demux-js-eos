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
const StateHistoryPostgresActionReader_1 = require("./StateHistoryPostgresActionReader");
describe('StateHistoryPostgresActionReader', () => {
    let reader;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        reader = new StateHistoryPostgresActionReader_1.StateHistoryPostgresActionReader({
            massiveConfig: {
                host: 'localhost',
                port: 5432,
                database: 'statehistory',
                user: 'docker',
                password: 'docker'
            },
            dbSchema: 'chain',
        });
        yield reader.setup();
    }));
    it('returns the head block number', () => __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield reader.getHeadBlockNumber();
        expect(blockNum).toEqual(4);
    }));
    it('returns the last irreversible block number', () => __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield reader.getLastIrreversibleBlockNumber();
        expect(blockNum).toEqual(3);
    }));
    it('returns block with expected block number', () => __awaiter(this, void 0, void 0, function* () {
        const returnedBlock = yield reader.getBlock(4);
        expect(returnedBlock.blockInfo.blockNumber).toEqual(4);
    }));
});
//# sourceMappingURL=StateHistoryPostgresActionReader.test.js.map