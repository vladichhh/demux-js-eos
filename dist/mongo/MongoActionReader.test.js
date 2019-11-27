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
const demux_1 = require("demux");
const mongodb_1 = require("mongodb");
const mongoMock_1 = require("../testHelpers/mongoMock");
const MongoActionReader_1 = require("./MongoActionReader");
mongodb_1.MongoClient.connect = jest.fn(() => mongoMock_1.mockConnect);
describe('MongoActionReader', () => {
    let reader;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        reader = new MongoActionReader_1.MongoActionReader({
            startAtBlock: 0,
            onlyIrreversible: false,
            mongoEndpoint: 'mongodb://127.0.0.1:27017',
            dbName: 'EOS'
        });
        yield reader.initialize();
    }));
    it('returns the head block number', () => __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield reader.getHeadBlockNumber();
        expect(blockNum).toEqual(4);
    }));
    it('returns the last irreversible block number', () => __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield reader.getLastIrreversibleBlockNumber();
        expect(blockNum).toEqual(3);
    }));
    it('returns block with the expected block number', () => __awaiter(this, void 0, void 0, function* () {
        const returnedBlock = yield reader.getBlock(4);
        expect(returnedBlock.blockInfo.blockNumber).toEqual(4);
    }));
    it('throws if not correctly initialized', () => __awaiter(this, void 0, void 0, function* () {
        const failedReader = new MongoActionReader_1.MongoActionReader({
            startAtBlock: 0,
            onlyIrreversible: false,
            mongoEndpoint: 'mongodb://127.0.0.1:27017',
            dbName: 'failed',
        });
        const result = failedReader.getNextBlock();
        yield expect(result).rejects.toThrow(demux_1.NotInitializedError);
    }));
});
//# sourceMappingURL=MongoActionReader.test.js.map