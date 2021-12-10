const request = require("supertest");

const server = "http://localhost:8080";

describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it("responds with 200 status", () => {
        return request(server).get("/").expect(200);
      });
    });
  });
});
