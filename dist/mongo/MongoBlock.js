"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoBlock {
    constructor(blockState, rawActions) {
        this.actions = this.parseActions(rawActions);
        this.blockInfo = {
            blockNumber: blockState.block_num,
            blockHash: blockState.block_id,
            previousBlockHash: blockState.block_header_state.header.previous,
            timestamp: new Date(blockState.block_header_state.header.timestamp),
        };
    }
    parseActions(rawActions) {
        const eosActions = [];
        let currentTx = '';
        let actionIndex = 0;
        let currentActionDigest = '';
        for (const rawAction of rawActions) {
            if (rawAction.trx_id !== currentTx) {
                currentTx = rawAction.trx_id;
                actionIndex = 0;
            }
            if (rawAction.receipt.act_digest === currentActionDigest) {
                eosActions[eosActions.length - 1].payload.notifiedAccounts.push(rawAction.receipt.receiver);
                continue;
            }
            currentActionDigest = rawAction.receipt.act_digest;
            eosActions.push({
                type: `${rawAction.act.account}::${rawAction.act.name}`,
                payload: {
                    account: rawAction.act.account,
                    actionIndex,
                    authorization: rawAction.act.authorization,
                    data: rawAction.act.data,
                    name: rawAction.act.name,
                    transactionId: rawAction.trx_id,
                    notifiedAccounts: [rawAction.receipt.receiver],
                },
            });
            actionIndex += 1;
        }
        return eosActions;
    }
}
exports.MongoBlock = MongoBlock;
//# sourceMappingURL=MongoBlock.js.map