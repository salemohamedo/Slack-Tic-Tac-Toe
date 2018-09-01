'use strict';

const bodyParser = require('body-parser');
const constants = require('./constants');
const express = require('express');
const { WebClient } = require('@slack/client');
const config = require('./config');
const { move, play, end, status, help } = require('./commands/index');
const { verifySlackSigningSecret } = require('./middleware/authorization');
const { rawBodyBuilder } = require('./helpers/raw-body-builder');
const GameManager = require('./lib/game-manager');

let workspaceUsers = {};
let gameManager;

// Attain list of the usernames in the workspace
// and map them to their userids
const slackClient = new WebClient(config.SLACK_API_TOKEN);
slackClient.users.list().then((res) => {
  for (const user of res.members) {
    workspaceUsers[user.name] = user.id;
  }
  gameManager = new GameManager(workspaceUsers);
}).catch((err) => {
  console.log(err);
});

var app = express();

app.use(bodyParser.json({ verify: rawBodyBuilder }));
app.use(bodyParser.urlencoded({ verify: rawBodyBuilder, extended: true }));
app.use(bodyParser.raw({ verify: rawBodyBuilder, type: () => true }));
app.use(verifySlackSigningSecret);

app.post('/commands', (req, res) => {
  res.set('content-type', 'application/json');
  const channelId = req.body.channel_id;
  const userId = req.body.user_id;
  const params = req.body.text.split(/[ ,]+/);
  switch (params[0]) {
    case 'play':
      play(gameManager, channelId, userId, params, res);
      break;
    case 'status':
      status(gameManager, channelId, res);
      break;
    case 'move':
      move(gameManager, channelId, userId, params, res);
      break;
    case 'end':
      end(gameManager, channelId, userId, res);
      break;
    case 'help':
      help(res);
      break;
    default:
      res.status(200).send(constants.INVALID_COMMAND);
      break;
  }
});

app.get('/', function (req, res) {
  res.send(200);
});

app.listen(process.env.PORT || 3000);
