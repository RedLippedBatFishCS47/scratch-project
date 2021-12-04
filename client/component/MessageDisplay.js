import React, { Component, useEffect, setState, useState } from 'react';
import MessageInput from './MessageInput';

//need to store array of message somehow, either here or in separate file

/*
    fetch('/api/characters')
      .then(res => res.json())
      .then(res => this.addCharacters(res.characters))
      .catch(err => console.log('App.componentDidMount: get characters: ERROR: ', err));


useEffect(() => {
    // DELETE request using fetch inside useEffect React hook
    fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' })
        .then(() => setStatus('Delete successful'));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

*/

//username

//content input

//fetch in the app?
//assume we get the array of messages as a prop
const MessageDisplay = () => {
  //messages is an array of Message components
  const [state, setState] = useState([]);
  const messages = [];
  //push messages each message object from database
  //array object
  //jsoned array object
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then(setState)
      .catch((err) => console.log('Get Messages: ERROR', err));
  }, []);
  for (const el of state) {
    //push message components into messages, using el as the source of props
    messages.push(
      <tr>
        <td>{el.time_stamp}</td>
        <td>{el.username}</td>
        <td>{el.content}</td>
        <td>
          <button
            onClick={() =>
              fetch('/api/' + el.id, { method: 'DELETE' })
                .then(() => console.log('Delete Successful'))
                .then(() =>
                  setState((state) => state.filter((msg) => msg.id !== el.id))
                )
                .catch((err) => console.log('Delete Message: ERROR: ', err))
            }
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <table>{messages}</table>
      <br />
      <MessageInput />
    </div>
  );
};

export default MessageDisplay;
