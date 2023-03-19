import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { parktimeService } from "./parktime-service.js";
import { mickey, mickeyCredentials,testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    parktimeService.clearAuth();
    await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    await parktimeService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await parktimeService.createUser(testUsers[i]);
    }
    await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await parktimeService.createUser(mickey);
    assertSubset(mickey, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await parktimeService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await parktimeService.deleteAllUsers();
    await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    returnedUsers = await parktimeService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await parktimeService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await parktimeService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      // assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await parktimeService.deleteAllUsers();
    await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    try {
      const returnedUser = await parktimeService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});