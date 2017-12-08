import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import helpers from './helpers.js';

import emojis from 'emojibase-data/en/data.json';
// import compact from 'emojibase-data/en/compact.json';


emojis.forEach(emoji => {
  if (emoji.annotation) {
    emoji.urlName = helpers.urlName(emoji.annotation);
    emoji.cleanName = helpers.cleanName(emoji.annotation);
  } else {
    emoji.urlName = helpers.urlName(emoji.name);
    emoji.cleanName = helpers.cleanName(emoji.name);
  }
})

// const details = emojis.map(emoji => {
//   <pre>{JSON.stringify(emoji)}</pre>
// });

const EmojiList = ({ match }) => (
  <div>
    <h1>Emoji</h1>

    <Route path={`${match.url}/:name`}  component={EmojiDetails}/>
    <Route exact path={match.url} render={() => (
      <div>
        {emojis.map(emoji => (
          <div key={emoji.order} className="character-box">
            <Link 
              style={{ textDecoration: 'none' }}
              to={{
                pathname: match.url + '/' + emoji.urlName
              }}
            >
              {emoji.emoji}
            </Link>

          </div>
        ))}
      </div>
    )}/>


  </div>
);

const EmojiDetails = ({ match }) => {
  let details;
  let urlName = match.params.name
  details = emojis.find(emoji => (emoji.urlName === urlName));

  if (!details) {
    return (
    <div>
      <p>Emoji not found.</p>
    </div>
  );
  }

  return (
    <div>
      <h1>{details.emoji}</h1>
      <p>{details.cleanName}</p>
      <pre>{details.hexcode}</pre>
      <pre>{JSON.stringify(details, null, '\t')}</pre>
    </div>
  );
}


export default EmojiList;