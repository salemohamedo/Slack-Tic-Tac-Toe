'use strict';

/**
* Generates an array of Slack attachment objects from attachment messages
*
* @param attachmentMessages {[]String]}
* @return {[]Object}
*/
function _buildAttachments (attachmentMessages) {
  let attachments = [];
  for (const message of attachmentMessages) {
    attachments.push({
      'text': message
    });
  }
  return attachments;
}

/**
* Generates a Slack message object from attachments and main text
*
* @param mainMessage {String}
* @param attachments {[]Object}
* @return {Object}
*/
function _buildMessage (mainMessage, attachments) {
  return {
    'response_type': 'in_channel',
    'text': mainMessage,
    'attachments': attachments
  };
}

/**
* Generates message JSON and sends to Slack channel with 200 Status
*
* @param res {Object} - the response object to post back to channel
* @param mainMessage {String}
* @param attachmentMessages {[]String}
*/
function sendMessage (res, mainMessage, attachmentMessages) {
  const attachments = _buildAttachments(attachmentMessages);
  const message = _buildMessage(mainMessage, attachments);
  res.status(200).json(message);
}

module.exports = sendMessage;
