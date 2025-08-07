const { globalHandler } = require('../handler.js');

const { DynamoDBClient } = require( "@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require( "@aws-sdk/lib-dynamodb");

function toUpper(str) {
return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
 }
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
  let response = {}
  try {
    const params = {
          TableName: "Items",
          ScanIndexForward: true,    // true = ascending, false = descending
          FilterExpression: "contains(#attr, :value)", // Filter to check
          ExpressionAttributeNames: {
            "#attr": "name", // Replace with your attribute name
          },
          ExpressionAttributeValues: {
            ":value": body.data.options[0]['value'].toLowerCase(), // Replace with the value to search for
          },
    };

    const command = new ScanCommand(params);
    const responseDB = await client.send(command);

    let output = "Looked for items with the name: "+body.data.options[0]['value']+"\n"+
    "👀  found "+ responseDB.Count +" items with similar name\n"+
    "👀  out of "+ responseDB.ScannedCount +" total items\n\n";
    const scanResults = [];
    responseDB.Items.forEach((item) => scanResults.push(item));

    scanResults.forEach((item) => {
      output =  output + "**"+toUpper(item.name)+"**\n\t\tPrice: "+item.priceAverage+"gp\n";
    });
    response = {
      "content": output,
    }
  } catch (error) {
    console.error("Error scanning table:", error);
    response = {
      "content": "Error?",
    }
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
