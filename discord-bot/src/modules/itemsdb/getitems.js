const { globalHandler } = require('../handler.js');

const { DynamoDBClient } = require( "@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require( "@aws-sdk/lib-dynamodb");


exports.data = {
  name: 'price',
  type: 1,
  description: 'Lookup the price of an item',
  "options": [
        {
            "name": "name",
            "description": "Item Name",
            "type": 3,
            "required": true
        }
  ]
}

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const action = async (body) => {  

    const command = new GetCommand({
        TableName: "Items",
        Key: {
        name: "Amulet",
        },
    });

    const dynamoResponse = await docClient.send(command);
    console.log(dynamoResponse);

    let output = "⚔️ "+ body.data.options[0]['value'];
    response = {
    "content": output,
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
