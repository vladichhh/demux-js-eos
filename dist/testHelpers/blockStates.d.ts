export declare const blockStates: {
    block_num: number;
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
            producers: {
                producer_name: string;
                block_signing_key: string;
            }[];
        };
        blockroot_merkle: {
            _active_nodes: string[];
            _node_count: number;
        };
        producer_to_last_produced: (string | number)[][];
        producer_to_last_implied_irb: (string | number)[][];
        block_signing_key: string;
        confirm_count: never[];
        confirmations: never[];
    };
    block_id: string;
    createdAt: string;
    validated: boolean;
    irreversible: boolean;
    updatedAt: string;
}[];
