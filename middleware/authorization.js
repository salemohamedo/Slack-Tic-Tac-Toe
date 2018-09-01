'use strict';

const config = require('../config');
const crypto = require('crypto');

/**
* Middleware to verify that request came from Slack by executing
* Slack's signing secret validation protocol
*
* @param req {Object}
* @param res {Object}
* @param next {function}
*/
module.exports.verifySlackSigningSecret = function (req, res, next) {
  if (req.headers['x-slack-signature']) {
    const slackSignature = req.headers['x-slack-signature'];
    const slackTimestamp = req.headers['x-slack-request-timestamp'];
    const sigBasestring = `v0:${slackTimestamp}:${req.rawBody}`;
    const hmac = crypto.createHmac('sha256', config.SIGNING_SECRET);
    const hmacSignature = `v0=${hmac.update(sigBasestring).digest('hex')}`;
    if (hmacSignature === slackSignature) {
      next();
      return;
    }
  }
  res.status(401).json({ error: 'Unauthorized client request' });
};
