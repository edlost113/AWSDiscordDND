const { globalHandler } = require('../handler.js');

exports.data = {
  name: 'newitem',
  type: 1,
  description: 'Add or Update the price of an item',
  "options": [
        {
            "name": "name",
            "description": "Item Name",
            "type": 3,
            "required": true
        },
        {
            "name": "price",
            "description": "Item Price",
            "type": 3,
            "required": true
        },
  ]
}

const action = async (body) => {  
    console.log(body.data.options[0]['value']);
    console.log(body.data.options[1]['value']);
    
    let output = "⚔️ "+ body.data.options[0]['value'] + " has been updated to have price " + body.data.options[1]['value'];
    response = {
    "content": output,
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
