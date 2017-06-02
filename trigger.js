var request = require('request');
var http = require('http');


function sayHello() {
    console.log('Hello, lets see if it works...');
}
sayHello();
/*
request("http://localhost:3000/sandbox", function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
*/




console.log('Finished?');