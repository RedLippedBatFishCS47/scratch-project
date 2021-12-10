import React from 'react';

const SecretPage = () => {
  return (
    <main>
      <h2>{Math.random() > .5 ? "purrrr" : "meow"}</h2>
      <img src="https://www.rd.com/wp-content/uploads/2021/04/GettyImages-138468381-scaled-e1619028416767.jpg" style={{width: "80%"}}/>
    </main>
  );
};

export default SecretPage;
