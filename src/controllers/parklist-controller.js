import { db } from "../models/db.js";
import { ParkSpec } from "../models/joi-schemas.js";

export const parklistController = {
  index: {
    handler: async function (request, h) {
      const parklist = await db.parklistStore.getParklistById(request.params.id);
      const viewData = {
        title: "Parklist",
        parklist: parklist,
      };
      return h.view("parklist-view", viewData);
    },
  },

  addPark: {
    validate: {
      payload: ParkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("parklist-view", { title: "Add park error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const parklist = await db.parklistStore.getParklistById(request.params.id);
      const newPark = {
        title: request.payload.title,
        location: request.payload.location,
        duration: Number(request.payload.duration),
      };
      await db.parkStore.addPark(parklist._id, newPark);
      return h.redirect(`/parklist/${parklist._id}`);
    },
  },

  deletePark: {
    handler: async function(request, h) {
      const parklist = await db.parklistStore.getParklistById(request.params.id);
      await db.parkStore.deletePark(request.params.parkid);
      return h.redirect(`/parklist/${parklist._id}`);
    },
  },
};