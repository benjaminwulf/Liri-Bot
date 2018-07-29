var Spotify = require('node-spotify-api'); 
var Twitter = require('twitter');
var inquirer = require('inquirer');
var request = require('request');
var dotenv = require('dotenv').config();
var keys = require('./keys.js');

var tweetsArr = [];

console.log(process.argv.slice(2)[0]);
var songName = process.argv.slice(2)[0];:

var defaultMovie = 'What About Bob';
var defaultSong = 'Wikcked Games';

// ? ============================
var nodeSpotify = keys.spotify;
var nodeTwitter = keys.twitter;
var omdbKey = keys.omdbKey;

var client = new Twitter({
  consumer_key: nodeTwitter.consumer_key,
  consumer_secret: nodeTwitter.consumer_secret,
  access_token_key: nodeTwitter.access_token_key,
  access_token_secret: nodeTwitter.access_token_secret
});


// Liri Function
// This will process the inputs
function processCommands(command, commandParam) {
    // console.log(commandParam);

    switch(command) {
        case 'my-tweets':
            getTweets();
            break;
        case 'spotify':
        // Play default song of Wicked Game if no song is specifie
            if(commandParam === undefined) {
                commandParam = defaultSong;
            }
            playSpotify(commandParam);
            break;
        case 'omdb-movie':
        // Display default movie of What About Bob if none is chosen
            if(commandParam === undefined) {
                commandParam = defaultMovie
            }
            omdbMovie(commandParam);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Invalid. Please type one of these commands: my-tweets, spotify, omdb-movie, or do-what-it-says");
    }
}

//=======================================

function myTweets() {
    //bww_add_screen_name
    var params = {screen_name: '#', count: 20, exclude_replies: true, trim_user: true}

    client.get('status/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(response);

            tweetsArr = tweets;

            for(var i = 0; tweetsArr.length; i++) {
                console.log('Created at: ' + tweetsArr[i].created_at);
                console.log('Text: ' + tweetsArr[i].text);
                console.log('------------------------');
            }
        } else {
            console.log(error);
        }
    });
}

//===========================================
var spotify = new Spotify({
    id: nodeSpotify.id,
    secret: nodeSpotify.secret
});

function playSpotify(song) {
    //If not specified, play "Wicked Games" by Chris Issak
    if (song === "") {
        song = 'Wicked Game';
    }

    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
            console.log('Error occured: ' + err);
            return;
        }
        var song = data.tracks.items;

            console.log('_______Preview_______');
            console.log(song[0].name);

            console.log('_______Preview_______');
            console.log(song[0].preview_url);
            
            console.log('_______Preview_______');
            console.log(song[0].album.name);
    });
}


//============================================

function omdbMovie(movieName) {
    // code goes here
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(error);
        }

        var dataArr = data.split(',');

        console.log(dataArr);
        processCommands(dataArr[0], dataArr[i]);
    });
}
// example
processCommands('spotify', songName);
// processCommands(command, commandParam);

