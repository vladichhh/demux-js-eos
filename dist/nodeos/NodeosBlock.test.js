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
const nodeosRawBlock_1 = require("../testHelpers/nodeosRawBlock");
const NodeosBlock_1 = require("./NodeosBlock");
describe('NodeosBlock', () => {
    let eosBlock;
    beforeEach(() => {
        eosBlock = new NodeosBlock_1.NodeosBlock(nodeosRawBlock_1.nodeosRawBlock);
    });
    it('collects actions from blocks', () => __awaiter(this, void 0, void 0, function* () {
        const { actions } = eosBlock;
        expect(actions).toEqual([
            {
                payload: {
                    account: 'testing',
                    actionIndex: 0,
                    authorization: [
                        {
                            actor: 'testing',
                            permission: 'active',
                        },
                    ],
                    data: {
                        memo: 'EOS is awesome!',
                    },
                    name: 'action',
                    transactionId: 'b890beb84a6d1d77755f2e0cdad48e2ffcfd06ff3481917b4875cc5f3a343533',
                },
                type: 'testing::action',
            },
            {
                payload: {
                    account: 'testing',
                    actionIndex: 1,
                    authorization: [
                        {
                            actor: 'testing',
                            permission: 'active',
                        },
                    ],
                    data: {
                        memo: 'Go EOS!',
                    },
                    name: 'action2',
                    transactionId: 'b890beb84a6d1d77755f2e0cdad48e2ffcfd06ff3481917b4875cc5f3a343533',
                },
                type: 'testing::action2',
            },
        ]);
    }));
});
//# sourceMappingURL=NodeosBlock.test.js.map