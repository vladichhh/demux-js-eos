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
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const NodeosBlock_1 = require("./NodeosBlock");
/**
 * Reads from an EOSIO nodeos node to get blocks of actions.
 * It is important to note that deferred transactions will not be included,
 * as these are currently not accessible without the use of plugins.
 */
class NodeosActionReader extends demux_1.AbstractActionReader {
    constructor(options = {}) {
        super(options);
        const nodeosEndpoint = options.nodeosEndpoint ? options.nodeosEndpoint : 'http://localhost:8888';
        this.nodeosEndpoint = nodeosEndpoint.replace(/\/+$/g, ''); // Removes trailing slashes
    }
    /**
     * Returns a promise for the head block number.
     */
    getHeadBlockNumber(numRetries = 120, waitTimeMs = 250) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blockNum = yield utils_1.retry(() => __awaiter(this, void 0, void 0, function* () {
                    const blockInfo = yield request_promise_native_1.default.get({
                        url: `${this.nodeosEndpoint}/v1/chain/get_info`,
                        json: true,
                    });
                    return blockInfo.head_block_num;
                }), numRetries, waitTimeMs);
                return blockNum;
            }
            catch (err) {
                throw new errors_1.RetrieveHeadBlockError();
            }
        });
    }
    getLastIrreversibleBlockNumber(numRetries = 120, waitTimeMs = 250) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const irreversibleBlockNum = yield utils_1.retry(() => __awaiter(this, void 0, void 0, function* () {
                    const blockInfo = yield request_promise_native_1.default.get({
                        url: `${this.nodeosEndpoint}/v1/chain/get_info`,
                        json: true,
                    });
                    return blockInfo.last_irreversible_block_num;
                }), numRetries, waitTimeMs);
                return irreversibleBlockNum;
            }
            catch (err) {
                throw new errors_1.RetrieveIrreversibleBlockError();
            }
        });
    }
    /**
     * Returns a promise for a `NodeosBlock`.
     */
    getBlock(blockNumber, numRetries = 120, waitTimeMs = 250) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const block = yield utils_1.retry(() => __awaiter(this, void 0, void 0, function* () {
                    const rawBlock = yield request_promise_native_1.default.post({
                        url: `${this.nodeosEndpoint}/v1/chain/get_block`,
                        json: { block_num_or_id: blockNumber },
                    });
                    return new NodeosBlock_1.NodeosBlock(rawBlock);
                }), numRetries, waitTimeMs);
                return block;
            }
            catch (err) {
                throw new errors_1.RetrieveBlockError();
            }
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            try {
                yield request_promise_native_1.default.get({
                    url: `${this.nodeosEndpoint}/v1/chain/get_info`,
                    json: true,
                });
            }
            catch (err) {
                throw new demux_1.NotInitializedError('Cannot reach supplied nodeos endpoint.', err);
            }
        });
    }
}
exports.NodeosActionReader = NodeosActionReader;
//# sourceMappingURL=NodeosActionReader.js.map