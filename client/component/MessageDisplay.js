import React, { Component, useEffect, setState, useState } from "react";
import MessageInput from "./MessageInput";
import EditMessageModal from "./EditMessageModal";

//need to store array of message somehow, either here or in separate file

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
  function fetchMessages() {
    fetch("/api")
      .then((res) => res.json())
      .then(setState)
      .catch((err) => console.log("Get Messages: ERROR", err));
  }

  function deleteMessage(el) {
    fetch("/api/" + el.id, { method: "DELETE" })
      .then(() => console.log("Delete Successful"))
      .then(() => setState((state) => state.filter((msg) => msg.id !== el.id)))
      .catch((err) => console.log("Delete Message: ERROR: ", err));
  }

  //redraw the page with the input box
  //if we want to have a modal invisibly generated for each element of the state
  //we need editMessage to toggle it visible
  function editMessage(el) {
    console.log("trying to edit!");
        //make element visible
//"edit"+el.id
    //if doc.get elem display = block => make it none
    if (document.getElementById(`modal${el.id}`).style.display ==="block"){
      document.getElementById(`modal${el.id}`).style.display="none";
      document.getElementById(`edit${el.id}`).innerText="Edit";
    } else {
      document.getElementById(`modal${el.id}`).style.display="block";
      document.getElementById(`edit${el.id}`).innerText="Cancel";
    }
  }

  function updateMessage(el) {
    fetch("/api/" + el.id, {
      method: "PUT",
      body: JSON.stringify({
        content: document.getElementById("updatedContent").value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => console.log("Put Successful"))
      .then(() => fetchMessages());
    document.getElementById(`${"modal"+el.id}`).style.display="none";
  }

  useEffect(fetchMessages, []);
  for (const el of state) {
    //push message components into messages, using el as the source of props
    messages.push(
      <tr key={el.id}>
        <td>{el.time_stamp}</td>
        <td>{el.username}</td>
        <td>{el.content}</td>
        <td>
          <EditMessageModal el={el} updateMessage={updateMessage}/>
          <button id = {"edit"+el.id} onClick={() => editMessage(el)}>Edit</button>
          <button id={"delete"+el.id} onClick={() => deleteMessage(el)}>Delete</button>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <table>
        <tbody>{messages}</tbody>
      </table>
      <br />
      <MessageInput
        state={state}
        setState={setState}
        fetchMessages={fetchMessages}
      />
    </div>
  );
};

export default MessageDisplay;
