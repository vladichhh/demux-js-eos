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
const massive_1 = __importDefault(require("massive"));
const StateHistoryPostgresBlock_1 = require("./StateHistoryPostgresBlock");
class StateHistoryPostgresActionReader extends demux_1.AbstractActionReader {
    constructor(options) {
        super(options);
        this.massiveInstance = null;
        this.massiveConfig = options.massiveConfig;
        this.dbSchema = options.dbSchema ? options.dbSchema : 'chain';
    }
    getHeadBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const statusRow = yield this.db.fill_status.findOne();
            return statusRow.head;
        });
    }
    getLastIrreversibleBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const statusRow = yield this.db.fill_status.findOne();
            return statusRow.irreversible;
        });
    }
    getBlock(blockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const pgBlockInfo = yield this.db.block_info.findOne({
                block_index: blockNumber,
            });
            // Uses ${<var-name>} for JS substitutions and $<var-name> for massivejs substitutions.
            const query = `
      SELECT at.transaction_id, at.block_index, at.account,
              at.name, at_authorization.actor, at_authorization.permission,
              at.action_index, at.receipt_receiver, at.data
      FROM ${this.dbSchema}.action_trace AS at, ${this.dbSchema}.action_trace_authorization AS at_authorization
      WHERE at.block_index = $1 AND at.transaction_id = at_authorization.transaction_id
    `;
            if (!this.massiveInstance) {
                throw new demux_1.NotInitializedError('Massive was not initialized.');
            }
            const pgActionTraceAuthorizations = yield this.massiveInstance.query(query, [blockNumber]);
            const block = new StateHistoryPostgresBlock_1.StateHistoryPostgresBlock(pgBlockInfo, pgActionTraceAuthorizations, this.massiveInstance, this.dbSchema);
            yield block.parseActions();
            return block;
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            try {
                this.massiveInstance = yield massive_1.default(this.massiveConfig);
                this.db = this.massiveInstance[this.dbSchema];
            }
            catch (err) {
                throw new demux_1.NotInitializedError('', err);
            }
        });
    }
}
exports.StateHistoryPostgresActionReader = StateHistoryPostgresActionReader;
//# sourceMappingURL=StateHistoryPostgresActionReader.js.map