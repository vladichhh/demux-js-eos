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
const StateHistoryPostgresBlock_1 = require("./StateHistoryPostgresBlock");
describe('StateHistoryPostgresBlock', () => {
    let stateHistoryPostgresBlock;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        stateHistoryPostgresBlock = new StateHistoryPostgresBlock_1.StateHistoryPostgresBlock({
            block_index: 4,
            block_id: 'qwerty1234',
            previous: 'qwerty1233',
            timestamp: new Date('2018-08-12').toString(),
        }, [{
                account: 'token',
                action_index: 1,
                transaction_id: '12345',
                receipt_receiver: 'userbbbbbbbb',
                name: 'transfer',
                actor: 'useraaaaaaaa',
                permission: 'active',
                data: [100, 100, 100, 100, 100, 100, 100],
            }], {});
        yield stateHistoryPostgresBlock.parseActions();
    }));
    it('collects blockInfo from blocks', () => {
        expect(stateHistoryPostgresBlock.blockInfo).toEqual({
            blockHash: 'qwerty1234',
            blockNumber: 4,
            previousBlockHash: 'qwerty1233',
            timestamp: new Date('2018-08-12').toString(),
        });
    });
    it('collects actions from blocks', () => {
        expect(stateHistoryPostgresBlock.actions).toEqual([{
                type: 'token::transfer',
                payload: {
                    account: 'token',
                    name: 'transfer',
                    authorization: [{
                            actor: 'useraaaaaaaa',
                            permission: 'active',
                        }],
                    data: {
                        from: 'useraaaaaaaa',
                        to: 'userbbbbbbbb',
                        memo: '',
                        quantity: '0.0100 EOS',
                    },
                    actionIndex: 1,
                    transactionId: '12345',
                    notifiedAccounts: ['userbbbbbbbb'],
                }
            }]);
    });
});
//# sourceMappingURL=StateHistoryPostgresBlock.test.js.map