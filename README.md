# what-is-the-deal

Using random words from the [Wordnik](https://www.wordnik.com/) API and related
concepts from [Concept Net](http://conceptnet5.media.mit.edu/) to ask the
eternal question.

## Installation

You'll need (1) a Wordnik API key and (2) Twitter API keys, as specified in the
[Twit documentation](https://github.com/ttezel/twit) and created in [Twitter's
app management console](https://apps.twitter.com/). Add those to a `.env` file like so:

```
WORDNIK_API_KEY=your_api_key
TWITTER_CONSUMER_KEY=your_consumer_key
TWITTER_CONSUMER_SECRET=your_consumer_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

Then:

```
npm install
npm start
```

## License

This work is dedicated to the public domain. Copyright is waived under a
[CC0-1.0 license](LICENSE.md).
