import React, { Component, useEffect, setState, useState } from "react";
import MessageInput from "../component/MessageInput";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";


const MessageDisplay = () => {
  const [state, setState] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    // if no cookies then user is not logged in, send them to login
    if (document.cookie === "") navigate("/");
  });

  function formatDate(d) {
    //const datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    //      d.getHours() + ":" + d.getMinutes();
    const pstDate = new Date(Number(d) + 8 * 60 * 60 * 1000);
    return dateFormat(pstDate, "yyyy/mm/d h:MM TT");
  }
  
  function fetchMessages() {
    console.log("attempting fetch");
    fetch("/api/messages")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((data) => {
        setState(data);
        fetchMessagesLongPolling();
      })
      .catch((err) => console.log("Get Messages: ERROR", err));
  }

  function fetchMessagesLongPolling() {
    fetch("/api/messagesLongPolling")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((data) => {
        setState(data);
        fetchMessagesLongPolling();
      })
      .catch((err) => {
        console.log(err.status);
        // if(err.status === 504) fetchMessagesLongPolling();
        console.log("Get Messages: ERROR", err);
      });
  }
  
  useEffect(fetchMessages, []);
  useEffect(fetchMessagesLongPolling, []);

  // send delete message to back end, front end deletes message w/o need for response
  function deleteMessage(el) {
    fetch("/api/messages/" + el.id, { method: "DELETE" })
      .then(() => console.log("Delete Successful"))
      .then(() => setState((state) => state.filter((msg) => msg.id !== el.id)))
      .catch((err) => console.log("Delete Message: ERROR: ", err));
  }

  function editMessage(el) {
    document.getElementById(`editMessageInput${el.id}`).style.display = "block";
    document.getElementById(`message${el.id}`).style.display = "none";
    document.getElementById("edit" + el.id).style.display = "none";
    document.getElementById("saveChanges" + el.id).style.display = "block";
  }

  function updateMessage(el) {
    fetch("/api/messages/" + el.id, {
      method: "PUT",
      body: JSON.stringify({
        content: document.getElementById(`editMessageInput${el.id}`).value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => console.log("Put successful"))
      .then(() => fetchMessages());
    document.getElementById(`${"editMessageInput" + el.id}`).style.display =
      "none";
    document.getElementById(`message${el.id}`).style.display = "block";
    document.getElementById("saveChanges" + el.id).style.display = "none";
    document.getElementById("edit" + el.id).style.display = "block";
  }

  const messages = [];
  messages.push(
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Message</th>
      <th>Actions</th>
    </tr>
  );

  let count = 0;

  for (const el of state) {
    let actionButtons = <td></td>;
    let editStatus = (
      <span
        style={{ display: "inline-block", padding: "0px 0px 0px 20px" }}
      ></span>
    );
    if (el.edit) {
      editStatus = (
        <span
          id="editedFlag"
          style={{ display: "inline-block", padding: "0px 0px 0px 20px" }}
        >
          (edited)
        </span>
      );
    }
    if (el.permission) {
      actionButtons = (
        <td className="actionButtons">
          <button
            id={"saveChanges" + el.id}
            className="saveBtn"
            onClick={() => updateMessage(el)}
            style={{ display: "none" }}
          >
            Save
          </button>
          <button
            id={"edit" + el.id}
            className="editBtn"
            onClick={() => editMessage(el)}
          >
            {/* <img src="./Images/editPencil.png" width="90" height="90" alt="Edit" /> */}
            ✏️
          </button>
          <button
            id={"delete" + el.id}
            className="deleteBtn"
            onClick={() => deleteMessage(el)}
          >
            ⌫
          </button>
        </td>
      );
    }
    //cut off long usernames
    let currUsername = el.username;
    if (currUsername.length > 10) {
      currUsername.slice(0, 10);
    }

    //push message components into messages, using el as the source of props
    messages.push(
      <tr id={count++} key={el.id}>
        <td className="timestamp">{formatDate(new Date(el.time_stamp))}</td>
        <td className="usernameMessage">{currUsername}</td>
        <td className="messageContents">
          <p id={`message${el.id}`} style={{ display: "block" }}>
            {el.content} {editStatus}
          </p>
          <textarea
            id={`editMessageInput${el.id}`}
            style={{ display: "none" }}
            defaultValue={el.content}
          ></textarea>
        </td>
        {actionButtons}
      </tr>
    );
  }

  const logout = () => {
    // remove cookies 'username' and 'session_id' then navigate home
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    navigate("/");
  };

  return (
    <div>
      <button className="submitButton" style={{float: "right"}} onClick={logout}>Logout</button>
      <div id="MessageContent">
        <div id="MessageDisplay">
          <table>
            <tbody>{messages}</tbody>
          </table>
          <br />
        </div>
      </div>
      <MessageInput
        state={state}
        setState={setState}
        fetchMessages={fetchMessages}
      />
    </div>
  );
};

export default MessageDisplay;
