//require axios https://github.com/axios/axios
//can make XMLHttpRequests from browser
const axios = require("axios");

//require and configure dotenv npm; create .env file in root directory
//https://www.npmjs.com/package/dotenv
require("dotenv").config();

const api = {
    getUser(username) {
        return axios
            .get(
                `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
            )
            .catch(err =>{
                console.log('Username not found')
                process.exit(1);
            });
    },
    getTotalStars(username) {
        return axios
            .get(
                `https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
            )
            .then(response => {
                //After retrieving username, acquire repo star count
                return response.data.reduce((account, current) => {
                    account += current.stargazers_count;
                    return account;
            }, 0);
        });
    }
};

module.exports = api;