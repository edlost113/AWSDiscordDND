/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')

exports.data = {
  name: 'commands',
  type: 1,
  description: 'shows avrae commands for Pun\'s DND',
}

const action = async (body) => {
  let output = ">>> **Server Commands**\r\n\r\n- **!inspcreate**: used after character creation to create inspiration and level inspiration counters.\r\n"+
  "- **!wheel**: rolls a d20, on odd you get -1 to your rolls, on even +1 something special may happen on a 1 or 20\r\n"+
  "- **!archon**: used with archon sorc boon to roll the dice for you\r\n"+
  "- **!recap**: used before session to roll to see who does recap\r\n"+
  "- **!sane**: used with item name to determine dmg price average with **!price**\r\n"+
  "- **!price**: used with item name to determine price average with **!sane**\r\n"+
  "- **!avgprice**: used with item name to determine price combination of sane and price\r\n"+
  "- **!boon**: used to look up various boons, can either do a search or get the text of a specific boon\r\n"+
  "- **!inspo**: add or subtract from inspiration counter (+x/-x)\r\n"+
  "- **!lev**: add or subtract from level inspiration counter (+x/-x)\r\n"+
  "- **!statgen**: used to roll stats\r\n"+
  "- **!gatcha**: roll for random magic item\r\n"+
  "- **!lvlup**: rolls hit points for next level for specific class\r\n";
  
  let response = {
    "content": output,
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
