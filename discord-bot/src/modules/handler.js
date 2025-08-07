const axios = require('axios').default;

exports.globalHandler = async (event, action) => {
  /*
   * Should be changed to respond differently depending on interaction type.
   * Now it only edits "Loading..." message, therefore only answers to
   * text interactions.
   */
  let body = JSON.parse(event.Records[0].Sns.Message);
  const response = await action(body)
  axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, response)
      .then(function (response) {
      })
      .catch(function (error) {
        if (error.response) {
          console.log('Error data:', error.response.data);
          console.log('Error status:', error.response.status);
          console.log('Error headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response received
          console.log('Error request:', error.request);
        } else {
          // Something else happened while setting up the request
          console.log('Error message:', error.message);
        }
        return error;
      });
}
