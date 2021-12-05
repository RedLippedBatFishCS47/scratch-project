import React from 'react';
import MessageDisplay from './component/MessageDisplay.js';
import UserCreator from './component/UserCreator';
import UserLogin from './component/UserLogin';


const App = () => {
  return(
    <div> 
              <h1>TOP SECRET ULTRA EXCLUSIVE COOL PEOPLE ONLY MESSAGE BOARD</h1>
        <UserLogin />
        <UserCreator />
        <MessageDisplay />
    </div>
  )
}
  
export default App;