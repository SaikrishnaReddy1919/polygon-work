const httpStatus = require('http-status');
const { TransferEvent } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a event
 * @param {Object} transferEventBody
 * @returns {Promise<TransferEvent>}
 */
const createTransferEvent = async (transferEventBody) => {
  const transferEvent = await TransferEvent.create(transferEventBody);
  return transferEvent;
};

/**
 * Query for events
 * @returns {Promise<QueryResult>}
 */
const queryEvents = async (pageNumber, address) => {
  const resultsPerPage = 5;
  let page = pageNumber >= 1 ? pageNumber : 1;

  page = page - 1;

  const transferEvents = await TransferEvent.find({
    $or: [{ from: address }, { to: address }],
  })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page);

  return transferEvents;
};

module.exports = {
  createTransferEvent,
  queryEvents,
};
