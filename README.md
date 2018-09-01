# Slack Tic Tac Toe

Slack app built with Node.js and Express to play tic tac toe using Slack's slash commands

##### Valid slash command parameters:

**/ttt** *help* - displays all valid */ttt* commands

**/ttt** *play @username* - starts a new game with the opponent

**/ttt** *move #* - moves to spot # on the board

**/ttt** *status* - displays the current game state

**/ttt** *end* - ends the current game

#### App Setup:

1. Create and install a Slack App into your workspace. More info at [Slack's API site](https://api.slack.com/slack-apps#creating_apps)
2. Modify the .env file to include your Slack App settings
3. Deploy this app to your own server or use a hosting service such as [Heroku](https://devcenter.heroku.com/articles/nodejs-support) 
4. Launch the app with the command *node app.js*
5. Add the */ttt* slash command to your Slack App and point it to this app's URL + '/commands'

#### App Architecture:

######Game Manager:
The Game Manager class contains in-memory objects that maintain a list of users in the workspace and the current active channel games. There exists only a single instance of the Game Manager that is instantiated in **app.js**. 

######Commands:
Valid command parameters such as */ttt play* and */ttt move* are routed by **app.js** to their respective command handler functions implemented in **/commands**. These handlers manipulate and extract the current game state by accessing Games via the Game Manager's API.

######Game:

The Game class maintains the state of an active game in a given channel, including the participating players User Id's and the current state of the tic tac toe board. Additionally, the Game class contains methods that implement the logic of tic tac toe. At all times, there can only exist at most one Game object for a given channel. 

##### Potential Improvements:

* Database integration to persist app state
* Frequent updates to the list of workspace users and the users in each channel*  
* Logic to require a user to first accept a 'challenge' before the game can commence
* Buttons instead of emojis to allow users to select their move
* Comprehensive unit testing and error checking for malformed inputs

>*Currently the list of workspace users is populated only once when the app is first deployed. Moreover, the current implementation only validates that the opponent specified in /ttt play @username is a member of the workspace, and not the channel as well. 