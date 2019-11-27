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
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const node_fetch_1 = __importDefault(require("node-fetch"));
const util_1 = require("util");
const StateHistoryPostgresAbiProvider_1 = require("./StateHistoryPostgresAbiProvider");
// Wrapper to deal with differences between the definitions of fetch for the browser built-in
// and the node-fetch polyfill for node
// Is there a better way to do this?
const fetchWrapper = (input, init) => {
    const anyInput = input;
    const anyInit = init;
    return node_fetch_1.default(anyInput, anyInit);
};
class StateHistoryPostgresBlock {
    constructor(blockInfo, actionTraceAuthorizations, massiveInstance, dbSchema = 'chain') {
        this.actionTraceAuthorizations = actionTraceAuthorizations;
        this.massiveInstance = massiveInstance;
        this.dbSchema = dbSchema;
        this.actions = [];
        const signatureProvider = new eosjs_jssig_1.JsSignatureProvider([]);
        const rpc = new eosjs_1.JsonRpc('', { fetch: fetchWrapper });
        const abiProvider = new StateHistoryPostgresAbiProvider_1.StateHistoryPostgresAbiProvider(this.massiveInstance, this.dbSchema);
        this.api = new eosjs_1.Api({
            rpc,
            abiProvider,
            signatureProvider,
            textDecoder: new util_1.TextDecoder(),
            textEncoder: new util_1.TextEncoder()
        });
        this.blockInfo = {
            blockNumber: blockInfo.block_index,
            blockHash: blockInfo.block_id,
            previousBlockHash: blockInfo.previous,
            timestamp: blockInfo.timestamp,
        };
    }
    parseActions() {
        return __awaiter(this, void 0, void 0, function* () {
            const actionPromises = this.actionTraceAuthorizations.map((actionTrace) => __awaiter(this, void 0, void 0, function* () {
                const serializedAction = {
                    account: actionTrace.account,
                    name: actionTrace.name,
                    authorization: [{
                            actor: actionTrace.actor,
                            permission: actionTrace.permission,
                        }],
                    data: actionTrace.data,
                };
                const [deserializedAction] = yield this.deserializeActionTraces([serializedAction]);
                const action = {
                    type: `${actionTrace.account}::${actionTrace.name}`,
                    payload: Object.assign({}, deserializedAction, { actionIndex: actionTrace.action_index, transactionId: actionTrace.transaction_id, notifiedAccounts: [actionTrace.receipt_receiver] })
                };
                return action;
            }));
            this.actions = yield Promise.all(actionPromises);
            return this.actions;
        });
    }
    deserializeActionTraces(actionTraces) {
        return __awaiter(this, void 0, void 0, function* () {
            const actions = yield this.api.deserializeActions(actionTraces);
            return actions;
        });
    }
}
exports.StateHistoryPostgresBlock = StateHistoryPostgresBlock;
//# sourceMappingURL=StateHistoryPostgresBlock.js.map