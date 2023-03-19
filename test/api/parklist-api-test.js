import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { parktimeService } from "./parktime-service.js";
import { mickey, mickeyCredentials, fingal, testParklists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Parklist API tests", () => {

  let user = null;

  setup(async () => {
    parktimeService.clearAuth();
    user = await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    await parktimeService.deleteAllParklists();
    await parktimeService.deleteAllUsers();
    user = await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    fingal.userid = user._id;
  });
  teardown(async () => {});

  test("create a parklist", async () => {
    const returnedParklist = await parktimeService.createParklist(fingal);
    assert.isNotNull(returnedParklist);
    assertSubset(fingal, returnedParklist);
  });

  test("delete a parklist", async () => {
    const parklist = await parktimeService.createParklist(fingal);
    const response = await parktimeService.deleteParklist(parklist._id);
    assert.equal(response.status, 204);
    try {
      const returnedParklist = await parktimeService.getParklist(parklist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Parklist with this id", "Incorrect Response Message");
    }
  });
    
  test("create multiple parklists", async () => {
    for (let i = 0; i < testParklists.length; i += 1) {
      testParklists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await parktimeService.createParklist(testParklists[i]);
    }
    let returnedLists = await parktimeService.getAllParklists();
    assert.equal(returnedLists.length, testParklists.length);
    await parktimeService.deleteAllParklists();
    returnedLists = await parktimeService.getAllParklists();
    assert.equal(returnedLists.length, 0);
  });
    
  test("remove non-existant parklist", async () => {
    try {
      const response = await parktimeService.deleteParklist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Parklist with this id", "Incorrect Response Message");
   }
  });
});