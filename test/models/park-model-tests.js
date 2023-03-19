import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testParklists, testParks, fingal, dcc, santry, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Park Model tests", () => {

  let dccList = null;

  setup(async () => {
    db.init("mongo");
    await db.parklistStore.deleteAllParklists();
    await db.parkStore.deleteAllParks();
    dccList = await db.parklistStore.addParklist(dcc);
    for (let i = 0; i < testParks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testParks[i] = await db.parkStore.addPark(dccList._id, testParks[i]);
    }
  });

  test("create single park", async () => {
    const fingalList = await db.parklistStore.addParklist(fingal);
    const park = await db.parkStore.addPark(fingalList._id, santry)
    assert.isNotNull(park._id);
    assertSubset (santry, park);
  });

  test("create multiple parkApi", async () => {
    const parks = await db.parklistStore.getParklistById(dccList._id);
    assert.equal(testParks.length, testParks.length)
  });

  test("delete all parkApi", async () => {
    const parks = await db.parkStore.getAllParks();
    assert.equal(testParks.length, parks.length);
    await db.parkStore.deleteAllParks();
    const newParks = await db.parkStore.getAllParks();
    assert.equal(0, newParks.length);
  });

  test("get a park - success", async () => {
    const fingalList = await db.parklistStore.addParklist(fingal);
    const park = await db.parkStore.addPark(fingalList._id, santry)
    const newPark = await db.parkStore.getParkById(park._id);
    assertSubset (santry, newPark);
  });

  test("delete One Park - success", async () => {
    const id = testParks[0]._id;
    await db.parkStore.deletePark(id);
    const parks = await db.parkStore.getAllParks();
    assert.equal(parks.length, testParklists.length - 1);
    const deletedPark = await db.parkStore.getParkById(id);
    assert.isNull(deletedPark);
  });

  test("get a parklist - bad params", async () => {
    assert.isNull(await db.parkStore.getParkById(""));
    assert.isNull(await db.parkStore.getParkById());
  });

  test("delete One User - fail", async () => {
    await db.parkStore.deletePark("bad-id");
    const parks = await db.parkStore.getAllParks();
    assert.equal(parks.length, testParklists.length);
  });
});