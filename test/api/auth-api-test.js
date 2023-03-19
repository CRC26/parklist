import { assert } from "chai";
import { parktimeService } from "./parktime-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { mickey, mickeyCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {

  setup(async () => {
    parktimeService.clearAuth();
    await parktimeService.createUser(mickey);
    await parktimeService.authenticate(mickeyCredentials);
    await parktimeService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await parktimeService.createUser(mickey);
    const response = await parktimeService.authenticate(mickeyCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await parktimeService.createUser(mickey);
    const response = await parktimeService.authenticate(mickeyCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    parktimeService.clearAuth();
    try {
      await parktimeService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});