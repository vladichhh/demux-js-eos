import * as Logger from 'bunyan'
import { nodeosRawBlock } from '../../testHelpers/nodeosRawBlock'
import { NodeosBlock } from './NodeosBlock'

const log = Logger.createLogger({ name: 'NodeosBlockTest', level: 'error' })

describe('NodeosBlock', () => {
  let eosBlock: NodeosBlock

  beforeEach(() => {
    eosBlock = new NodeosBlock(nodeosRawBlock, log)
  })

  it('collects actions from blocks', async () => {
    const { actions } = eosBlock
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
          producer: 'eoscafeblock',
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
          producer: 'eoscafeblock',
          name: 'action2',
          transactionId: 'b890beb84a6d1d77755f2e0cdad48e2ffcfd06ff3481917b4875cc5f3a343533',
        },
        type: 'testing::action2',
      },
    ])
  })
})
