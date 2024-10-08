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

const sendnotificationslineFlex = async(messages) => {

  try {
      const response = await axios.post('https://api.line.me/v2/bot/message/push', messages, {
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

const accessToken = LINE_TK; // Replace with your access token

// Function to get all user IDs
async function getAllUserIds() {
    try {
        const response = await axios.get('https://api.line.me/v2/bot/followers/ids', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.userIds; // List of user IDs
    } catch (error) {
        console.error('Error fetching user IDs:', error);
        return [];
    }
}

// Function to get user profile
async function getUserProfile(userId) {
    try {
        const response = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // User profile info
    } catch (error) {
        console.error(`Error fetching profile for user ${userId}:`, error);
        return null;
    }
}

// Main function to get profiles of all users

const getAllUserProfiles = async() => {
    const userIds = await getAllUserIds();
    const profiles = [];
    
    for (const userId of userIds) {
        const profile = await getUserProfile(userId);
        if (profile) {
          console.log(profile);
            profiles.push(profile);
        }
    }
    
    return profiles;
}


module.exports = {
    sendnotificationsline,
    getAllUserProfiles,
    sendnotificationslineFlex
    
}