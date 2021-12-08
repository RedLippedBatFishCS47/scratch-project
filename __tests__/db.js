const fs = require("fs");
const path = require("path");
const { isTypedArray } = require("util/types");
const db = require("../server/models/userModel.js");

xdescribe("database connection and query", () => {
  describe("USERS", () => {
    beforeEach((done) => {
      const params = ["forTesting", "forTesting123"];
      const text = `
        INSERT INTO users(username, passcode) 
        VALUES($1,$2);
        `;
        db.query(text, params)
          .then((received) => done());
      });


    afterEach((done) => {
      const text = `
      DELETE FROM users
      WHERE username = 'forTesting'
      `
      db.query(text)
        .then((received) => done());
    });


      it("server is receiving from 'users' table", () => {
      const text = `
        SELECT * FROM users
        ;`;
      db.query(text)
        .then((received) => expect(received).not.toBe(null))
      
    });
  });
});
