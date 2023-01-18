const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min per window
  max: 20, // in 15min one can try 20 times
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
