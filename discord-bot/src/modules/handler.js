const axios = require('axios').default;

exports.globalHandler = async (event, action) => {
  /*
   * Should be changed to respond differently depending on interaction type.
   * Now it only edits "Loading..." message, therefore only answers to
   * text interactions.
   */
  let body = JSON.parse(event.Records[0].Sns.Message);
  const topic = event.Records[0].Sns.TopicArn;
  const response = await action(body)

  axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, response)
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log("got error when talking to discord");
        console.log(error);
        return error;
      });
}
