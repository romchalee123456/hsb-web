const { LINE_TK } = require('../utils/secrets');
const axios = require('axios');
const sendnotificationsline = async(userId,messages) => {

    try {
        const response = await axios.post('https://api.line.me/v2/bot/message/push', {
          to: userId,
          messages: [
            {
              type: "text",
              text: messages
            }
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${LINE_TK}`,
            'Content-Type': 'application/json',
          },
        });
    

        console.log(message+ 'Message sent successfully!'+ "response"+ response.data )

      } catch (error) {
        console.error('Error sending message:', error);
       
      }
};


module.exports = {
    sendnotificationsline
}