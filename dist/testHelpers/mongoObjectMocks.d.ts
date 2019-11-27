export declare const mongoBlockState: {
    _id: string;
    block_id: string;
    block_header_state: {
        id: string;
        block_num: number;
        header: {
            timestamp: string;
            producer: string;
            confirmed: number;
            previous: string;
            transaction_mroot: string;
            action_mroot: string;
            schedule_version: number;
            header_extensions: never[];
            producer_signature: string;
        };
        dpos_proposed_irreversible_blocknum: number;
        dpos_irreversible_blocknum: number;
        bft_irreversible_blocknum: number;
        pending_schedule_lib_num: number;
        pending_schedule_hash: string;
        pending_schedule: {
            version: number;
            producers: never[];
        };
        active_schedule: {
            version: number;
            producers: never[];
        };
        blockroot_merkle: {
            _active_nodes: never[];
            _node_count: number;
        };
        producer_to_last_produced: never[][];
        producer_to_last_implied_irb: never[][];
        block_signing_key: string;
        confirm_count: never[];
        confirmations: never[];
    };
    block_num: number;
    createdAt: string;
    in_current_chain: boolean;
    validated: boolean;
};
export declare const mongoRawActions: {
    _id: string;
    receipt: {
        receiver: string;
        act_digest: string;
    };
    act: {
        account: string;
        name: string;
        authorization: {
            actor: string;
            permission: string;
        }[];
        data: {
            from: string;
            to: string;
            quantity: string;
            memo: string;
        };
    };
    elapsed: number;
    console: string;
    trx_id: string;
    block_num: number;
    block_time: string;
    producer_block_id: string;
    account_ram_deltas: never[];
    except: null;
    trx_status: string;
    createdAt: string;
}[];
