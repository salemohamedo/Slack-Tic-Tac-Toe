'use strict';

/**
* generates raw request body from bodyParser middleware
*
* @param req {Object}
* @param res {Object}
* @param buffer {buffer}
* @param encoding {string}
*/
module.exports.rawBodyBuilder = function (req, res, buffer, encoding) {
  if (buffer && buffer.length) {
    req.rawBody = buffer.toString(encoding || 'utf8');
  }
};
