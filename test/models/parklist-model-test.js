import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testParklists, fingal } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Parklist Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.parklistStore.deleteAllParklists();
    for (let i = 0; i < testParklists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testParklists[i] = await db.parklistStore.addParklist(testParklists[i]);
    }
  });

  test("create a parklist", async () => {
    const parklist = await db.parklistStore.addParklist(fingal);
    assertSubset(fingal, parklist);
    assert.isDefined(parklist._id);
  });

  test("delete all parklists", async () => {
    let returnedParklists = await db.parklistStore.getAllParklists();
    assert.equal(returnedParklists.length, 3);
    await db.parklistStore.deleteAllParklists();
    returnedParklists = await db.parklistStore.getAllParklists();
    assert.equal(returnedParklists.length, 0);
  });

  test("get a parklist - success", async () => {
    const parklist = await db.parklistStore.addParklist(fingal);
    const returnedParklist = await db.parklistStore.getParklistById(parklist._id);
    assertSubset(fingal, parklist);
  });

  test("delete One Parklist - success", async () => {
    const id = testParklists[0]._id;
    await db.parklistStore.deleteParklistById(id);
    const returnedParklists = await db.parklistStore.getAllParklists();
    assert.equal(returnedParklists.length, testParklists.length - 1);
    const deletedParklist = await db.parklistStore.getParklistById(id);
    assert.isNull(deletedParklist);
  });

  test("get a parklist - bad params", async () => {
    assert.isNull(await db.parklistStore.getParklistById(""));
    assert.isNull(await db.parklistStore.getParklistById());
  });

  test("delete One Parklist - fail", async () => {
    await db.parklistStore.deleteParklistById("bad-id");
    const allParklists = await db.parklistStore.getAllParklists();
    assert.equal(testParklists.length, allParklists.length);
  });
});