import { ParklistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const parklists = await db.parklistStore.getAllParklists(loggedInUser._id);
      const viewData = {
        title: "Parktime Dashboard",
        user: loggedInUser,
        parklists: parklists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addParklist: {
    validate: {
      payload: ParklistSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Parklist error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newParkList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.parklistStore.addParklist(newParkList);
      return h.redirect("./dashboard");
    },
  },

  deleteParklist: {
    handler: async function (request, h) {
      const parklist = await db.parklistStore.getParklistById(request.params.id);
      await db.parklistStore.deleteParklistById(parklist._id);
      return h.redirect("./dashboard");
    },
  },
};