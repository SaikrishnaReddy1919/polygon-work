const mongoose = require('mongoose');

const transferSchema = mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    blockNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    txn_hash: {
      type: String,
      trim: true,
      required: true,
    },
    event_name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// transferSchema.plugin(toJSON);

/**
 * @typedef TransferEvent
 */
const TransferEvent = mongoose.model('TransferEvent', transferSchema);

module.exports = TransferEvent;
