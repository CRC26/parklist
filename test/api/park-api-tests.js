import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { parktimeService } from "./parktime-service.js";
import { mickey, fingal, mickeyCredentials, testParklists, testParks, santry } from "../fixtures.js";

suite("Park API tests", () => {
  let user = null;
  let dccParks = null;

  setup(async () => {
    parktimeService.clearAuth();
    user = await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    await parktimeService.deleteAllParklists();
    await parktimeService.deleteAllParks();
    await parktimeService.deleteAllUsers();
    user = await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    fingal.userid = user._id;
    dccParks = await parktimeService.createParklist(fingal);
  });

  teardown(async () => {});

  test("create park", async () => {
    const returnedPark = await parktimeService.createPark(dccParks._id, santry);
    assertSubset(santry, returnedPark);
  });

  test("create Multiple parks", async () => {
    for (let i = 0; i < testParks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await parktimeService.createPark(dccParks._id, testParks[i]);
    }
    const returnedParks = await parktimeService.getAllParks();
    assert.equal(returnedParks.length, testParks.length);
    for (let i = 0; i < returnedParks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const park = await parktimeService.getPark(returnedParks[i]._id);
      assertSubset(park, returnedParks[i]);
    }
  });

  test("Delete ParkApi", async () => {
    for (let i = 0; i < testParks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await parktimeService.createPark(dccParks._id, testParks[i]);
    }
    let returnedParks = await parktimeService.getAllParks();
    assert.equal(returnedParks.length, testParks.length);
    for (let i = 0; i < returnedParks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const park = await parktimeService.deletePark(returnedParks[i]._id);
    }
    returnedParks = await parktimeService.getAllParks();
    assert.equal(returnedParks.length, 0);
  });

  test("denormalised parklist", async () => {
    for (let i = 0; i < testParks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await parktimeService.createPark(dccParks._id, testParks[i]);
    }
    const returnedParklist = await parktimeService.getParklist(dccParks._id);
    assert.equal(returnedParklist.parks.length, testParks.length);
    for (let i = 0; i < testParks.length; i += 1) {
      assertSubset(testParks[i], returnedParklist.parks[i]);
    }
  });
});
