import { AbstractActionReader, NotInitializedError } from 'demux'
import { Db, MongoClient } from 'mongodb'
import {
  MultipleBlockStateError,
  NoBlockStateFoundError,
  RetrieveBlockError,
  RetrieveHeadBlockError,
  RetrieveIrreversibleBlockError,
} from '../../errors'
import { MongoActionReaderOptions } from '../../interfaces'
import { retry } from '../../utils'
import { MongoBlock } from './MongoBlock'

/**
 * Implementation of an ActionReader that reads blocks from a mongodb instance.
 */
export class MongoActionReader extends AbstractActionReader {
  public dbName: string
  protected mongoEndpoint: string
  private readonly requiredCollections: string[] = ['action_traces', 'block_states']
  private mongodb: Db | null

  constructor(options: MongoActionReaderOptions = {}) {
    super(options)
    this.mongoEndpoint = options.mongoEndpoint ? options.mongoEndpoint : 'mongodb://127.0.0.1:27017'
    this.dbName = options.dbName ? options.dbName : 'EOS'
    this.mongodb = null
  }

  public async getHeadBlockNumber(numRetries: number = 120, waitTimeMs: number = 250): Promise<number> {
    this.throwIfNotInitialized()

    try {
      const blockNum = await retry(async () => {
        if (!this.mongodb) {
          throw new NotInitializedError('Mongo connection not initialized.')
        }
        const [blockInfo] = await this.mongodb.collection('block_states')
          .find({})
          .limit(1)
          .sort({ $natural: -1 })
          .toArray()

        return blockInfo.block_header_state.block_num
      }, numRetries, waitTimeMs)

      return blockNum
    } catch (err) {
      throw new RetrieveHeadBlockError()
    }
  }

  public async getLastIrreversibleBlockNumber(numRetries: number = 120, waitTimeMs: number = 250): Promise<number> {
    this.throwIfNotInitialized()

    try {
      const irreversibleBlockNum = await retry(async () => {
        if (!this.mongodb) {
          throw new NotInitializedError('Mongo connection not initialized.')
        }
        const [blockInfo] = await this.mongodb.collection('block_states')
          .find({})
          .limit(1)
          .sort({ $natural: -1 })
          .toArray()

        return blockInfo.block_header_state.dpos_irreversible_blocknum
      }, numRetries, waitTimeMs)

      return irreversibleBlockNum
    } catch (err) {
      throw new RetrieveIrreversibleBlockError()
    }
  }

  public async getBlock(blockNumber: number, numRetries: number = 120, waitTimeMs: number = 250): Promise<MongoBlock> {
    this.throwIfNotInitialized()

    try {
      const mongoBlock = await retry(async () => {
        if (!this.mongodb) {
          throw new NotInitializedError('Mongo connection not initialized.')
        }
        const blockStates = await this.mongodb.collection('block_states')
          .find({ block_num: blockNumber })
          .toArray()

        this.validateBlockStates(blockStates, blockNumber)
        const [blockState] = blockStates
        const rawActions = await this.mongodb.collection('action_traces')
          .find({
            block_num: blockNumber,
            producer_block_id: blockState.block_id,
          })
          .sort({ 'receipt.global_sequence': 1 })
          .toArray()

        return new MongoBlock(blockState, rawActions)
      }, numRetries, waitTimeMs)

      return mongoBlock
    } catch (err) {
      throw new RetrieveBlockError()
    }
  }

  protected async setup(): Promise<void> {
    const mongoInstance = await MongoClient.connect(this.mongoEndpoint, { useNewUrlParser: true })
    this.mongodb = await mongoInstance.db(this.dbName)

    const dbCollections = await this.mongodb.collections()
    if (dbCollections.length === 0) {
      throw new NotInitializedError('There are no collections in the mongodb database.')
    }

    const dbCollectionsSet = new Set(dbCollections.map((c) => c.collectionName))

    const missingCollections = []
    for (const collection of this.requiredCollections) {
      if (!dbCollectionsSet.has(collection)) {
        missingCollections.push(collection)
      }
    }

    if (missingCollections.length > 0) {
      throw new NotInitializedError(`The mongodb database is missing ${missingCollections.join(', ')} collections.`)
    }
  }

  private throwIfNotInitialized(): void {
    if (!this.mongodb) {
      throw new NotInitializedError()
    }
  }

  private validateBlockStates(blockStates: any, blockNumber: number): void {
    if (blockStates.length === 0) {
      throw new NoBlockStateFoundError(blockNumber)
    } else if (blockStates.length > 1) {
      throw new MultipleBlockStateError(blockNumber)
    }
  }
}
