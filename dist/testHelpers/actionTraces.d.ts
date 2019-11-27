export declare const actionTraces: {
    _id: string;
    receipt: {};
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
