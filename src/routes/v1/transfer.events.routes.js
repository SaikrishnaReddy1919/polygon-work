const express = require('express');
const { eventsService } = require('../../services');
const router = express.Router();
const ethers = require('ethers');
const weth = require('../../config/wethABI.json');
const config = require('../../config/config');
const logger = require('../../config/logger');

async function listenForTransferEvents() {
  const addr = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
  const provider = new ethers.providers.InfuraProvider(
    config.infura.network,
    config.infura.infura_key
  );

  const contract = new ethers.Contract(addr, weth, provider);
  contract.on('Transfer', async (from, to, value, event) => {
    const eventBody = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 18),
      blockNumber: event.blockNumber,
      address: event.address,
      txn_hash: event.transactionHash,
      event_name: event.event,
    };
    logger.info(`New event :`);
    logger.info('Saving to DB...');
    //not using try/catch here. all DB add operations - asynchronous
    eventsService.createTransferEvent(eventBody);
  });
}

router.get('/start-listening', async (req, res) => {
  logger.info('starting listening for transfer events...');
  listenForTransferEvents();
  res.send({ message: 'success' });
});
router.get('/fetch-events', async (req, res) => {
  const response = await eventsService.queryEvents(
    req.query.page,
    req.query.address
  );
  res.send({ response });
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ERC20-Transfer Events
 *   description:
 */

/**
 * @swagger
 * /events/start-listening:
 *   get:
 *     summary: Backend will start listening to ERC20 transfer events once this api hits
 *     tags: [Events]
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: success
 */

/**
 * @swagger
 * /events/fetch-events:
 *   get:
 *     summary: Fetches erc-20 transfer events from DB. 5 per page.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: The page number to fetch
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: wallet address. If not passed, fetches all data. If passed, fetches wallet specific events only
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ERC20TransferEvent'
 */

//<----------------- Ex : event response -------------->//
//   const js = {
//     from: '0xE2a487A00E2Ec0f0f5912c26d1DbcA1787207bcD',
//     to: '0x88DCDC47D2f83a99CF0000FDF667A468bB958a78',
//     value: '0.21',
//     data: {
//       blockNumber: 38215712,
//       blockHash:
//         '0x37788f127162ecd59d7ddaa4cb083244cc4c37ecc5e7583456d4a743b6c21a94',
//       transactionIndex: 120,
//       removed: false,
//       address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
//       data:
//         '0x00000000000000000000000000000000000000000000000002ea11e32ad50000',
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x000000000000000000000000e2a487a00e2ec0f0f5912c26d1dbca1787207bcd',
//         '0x00000000000000000000000088dcdc47d2f83a99cf0000fdf667a468bb958a78',
//       ],
//       transactionHash:
//         '0x4a5faa4c5f035b4ec790d48a63028ff5d946f9cbdf48f7b68caccafbfe812e60',
//       logIndex: 581,
//       removeListener: [Function(anonymous)],
//       getBlock: [Function(anonymous)],
//       getTransaction: [Function(anonymous)],
//       getTransactionReceipt: [Function(anonymous)],
//       event: 'Transfer',
//       eventSignature: 'Transfer(address,address,uint256)',
//       decode: [Function(anonymous)],
//       args: [
//         '0xE2a487A00E2Ec0f0f5912c26d1DbcA1787207bcD',
//         '0x88DCDC47D2f83a99CF0000FDF667A468bB958a78',
//       ],
//     },
//   };
