import React, { Component, useEffect, setState, useState } from "react";


//document.getElementById(prop.el.id).style.display="none";
const EditMessageModal = (prop) => {

  return (
    <div id={"modal"+prop.el.id} style={{display: "none"}}>
      <input type="text" id="updatedContent" defaultValue={prop.el.content}></input>
      <button id="saveChanges" onClick={() => prop.updateMessage(prop.el)}>
        Save
      </button>
    </div>
  );
}

export default EditMessageModal;