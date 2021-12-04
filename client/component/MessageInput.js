import React, { Component } from 'react';

//username

//content
/*

    fetch('/api/info', {
      method: 'POST',
      body: JSON.stringify({ character }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        const updatedCharacter = { ...character };
        updatedCharacter.moreInfo = {};
        updatedCharacter.moreInfo.homeworld = data.homeworld;
        updatedCharacter.moreInfo.films = data.films;
        this.props.updateCharacter(character.id, updatedCharacter);
      })
      .catch(err => console.log('getDetails: ERROR: ', err));
*/
//fetch in the app?
const MessageInput = () => {
  return(
    <div>
      <form action="/api" method="post">
        <input className="textInput" name="username" placeholder="Enter username"></input>
        <input className="textInput" name="content" placeholder="Type message here"></input>
        <button className = "submitButton" type="submit">Send</button>
      </form>
    </div>
  )
}

export default MessageInput;