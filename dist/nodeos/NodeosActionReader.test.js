"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const demux_1 = require("demux");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const nodeosRawBlock_1 = require("../testHelpers/nodeosRawBlock");
const NodeosActionReader_1 = require("./NodeosActionReader");
describe('NodeosActionReader', () => {
    let reader;
    const blockInfo = {
        last_irreversible_block_num: 10,
        head_block_num: 20,
    };
    beforeAll(() => {
        request_promise_native_1.default.get = jest.fn(() => __awaiter(this, void 0, void 0, function* () { return blockInfo; }));
        request_promise_native_1.default.post = jest.fn(() => __awaiter(this, void 0, void 0, function* () { return nodeosRawBlock_1.nodeosRawBlock; }));
    });
    beforeEach(() => {
        reader = new NodeosActionReader_1.NodeosActionReader({
            nodeosEndpoint: '',
            startAtBlock: 10,
            onlyIrreversible: false
        });
    });
    it('returns head block number', () => __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield reader.getHeadBlockNumber();
        expect(blockNum).toBe(20);
    }));
    it('returns last irreversible block number', () => __awaiter(this, void 0, void 0, function* () {
        const blockNum = yield reader.getLastIrreversibleBlockNumber();
        expect(blockNum).toBe(10);
    }));
    it('gets block with correct block number', () => __awaiter(this, void 0, void 0, function* () {
        const block = yield reader.getBlock(20);
        expect(block.blockInfo.blockNumber).toEqual(20);
    }));
    it('throws if not correctly initialized', () => __awaiter(this, void 0, void 0, function* () {
        request_promise_native_1.default.get = jest.fn(() => __awaiter(this, void 0, void 0, function* () { throw new Error('404: This page does not exist'); }));
        reader.getLastIrreversibleBlockNumber = jest.fn(() => blockInfo);
        const result = reader.getNextBlock();
        yield expect(result).rejects.toThrow(demux_1.NotInitializedError);
    }));
});
//# sourceMappingURL=NodeosActionReader.test.js.map