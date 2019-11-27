"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionTraces_1 = require("./actionTraces");
const blockStates_1 = require("./blockStates");
const deepCloneBlockStates = (bStates) => {
    return JSON.parse(JSON.stringify(bStates));
};
// Do a reverse sort
const sortFunction = (a, b) => {
    return b.block_num - a.block_num;
};
exports.mockConnect = {
    db: (name) => {
        if (name === 'failed') {
            return {
                collections: () => ([
                    { collectionName: 'block_states' },
                    { collectionName: '1234' },
                ]),
            };
        }
        else {
            return {
                collection: (col) => {
                    if (col === 'block_states') {
                        return {
                            find: (options) => ({
                                limit: () => ({
                                    sort: () => {
                                        const newBlockStates = deepCloneBlockStates(blockStates_1.blockStates);
                                        newBlockStates.sort(sortFunction);
                                        return {
                                            toArray: () => [newBlockStates[0]],
                                        };
                                    },
                                }),
                                toArray: () => {
                                    for (const bState of blockStates_1.blockStates) {
                                        if (bState.block_num === options.block_num) {
                                            return [bState];
                                        }
                                    }
                                    return [];
                                },
                            }),
                        };
                    }
                    else if (col === 'action_traces') {
                        return ({
                            find: () => ({
                                sort: () => ({
                                    toArray: () => actionTraces_1.actionTraces,
                                }),
                            }),
                        });
                    }
                    return;
                },
                collections: () => ([
                    { collectionName: 'block_states' },
                    { collectionName: 'action_traces' },
                    { collectionName: 'testing' },
                    { collectionName: '987123' },
                ]),
            };
        }
    },
};
//# sourceMappingURL=mongoMock.js.map