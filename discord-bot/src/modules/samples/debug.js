/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')

exports.data = {
  name: 'debug',
  type: 1,
  description: 'tests some output.',
  "options": [
        {
            "name": "key",
            "description": "do something when this is defined",
            "type": 3,
            "required": false
        }
  ]
}

const action = async (body) => {
  // May do something here with body
  // Body contains Discord command details
  console.log(body);
  const channel = body.channel.name;
  const parent = body.channel.parent_id;
  const options = JSON.stringify(body.data.options);
  console.log(options);
  let output = "from channel " + channel + " with parent: " + parent;
  let response = {
    "content": output,
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
