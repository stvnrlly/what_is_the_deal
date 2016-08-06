'use strict';

var ConceptNet = require('concept-net');
var natural = require('natural');
var Wordnik = require('wordnik');
var Twit = require('twit');
require('dotenv').config();

// Connect to concept net
var conceptNet = new ConceptNet();

// Initialize noun inflector to change singular ↔ plural
var nounInflector = new natural.NounInflector();

// var Tagger = require('natural').BrillPOSTagger;
// var baseFolder = './node_modules/natural/lib/natural/brill_pos_tagger/data/English';
// var rulesFile = baseFolder + '/tr_from_posjs.txt';
// var lexiconFile = baseFolder + '/lexicon_from_posjs.json';
// var defaultCategory = 'N';

// Set up Wordnik API
var wn = new Wordnik({
  api_key: process.env.WORDNIK_API_KEY
});

// Set up Twitter API
var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var deals = ['What\'s', 'What is'];

var tweet = function(text) {
  T.post('statuses/update', {
    status: text
  }, function(err, data, response) {
    if (err) {
      console.log(err);
    }
    // console.log(data);
  });
};

function getConcepts(thing) {
  conceptNet.search({
    rel: ['/r/IsA', '/r/DefinedAs','/r/RelatedTo'],
    end: '/c/en/'+thing
  }, function onDone( err, result ) {
    if (err) {
      console.log(err);
    } else {
      if (result.edges.length > 1) {
        var deal = deals[Math.floor(Math.random() * (deals.length))];
        for (var i = 0; i < 100; i++) {
          var first = result.edges[Math.floor(Math.random() * (result.edges.length))].surfaceStart;
          var second = result.edges[Math.floor(Math.random() * (result.edges.length))].surfaceStart;
          if (first && second && (first !== second)) {
            if ((first.slice(-1) !== 's')) {
              first = nounInflector.pluralize(first);
            }
            if ((second.slice(-1) !== 's')) {
              second = nounInflector.pluralize(second);
            }
            var query = deal+' the deal with '+nounInflector.pluralize(thing)+
              '? Are they '+first+' or are they '+second+'?';
            tweet(query);
            break;
          }
        }
      }
    }
  });
}

function getWord() {
  wn.randomWord({
    minCorpusCount: 10000,
    includePartOfSpeech: ['noun'],
    excludePartOfSpeech: ['noun-plural','proper-noun']
  }, function (err, word) {
    if (err) {
      console.log(err);
    }
    getConcepts(nounInflector.singularize(word.word));
  });
}

getWord();
