import { ParkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const parkController = {
  index: {
    handler: async function (request, h) {
      const parklist = await db.parklistStore.getParklistById(request.params.id);
      const park = await db.parkStore.getParkById(request.params.parkid);
      const viewData = {
        title: "Edit Playgrounds",
        parklist: parklist,
        park: park,
      };
      return h.view("park-view", viewData);
    },
  },

  update: {
    validate: {
      payload: ParkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("park-view", { title: "Edit Playground error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const park = await db.parkStore.getParkById(request.params.parkid);
      const newPark = {
        title: request.payload.title,
        location: request.payload.location,
        duration: Number(request.payload.duration),
      };
      await db.parkStore.updatePark(park, newPark);
      return h.redirect(`/parklist/${request.params.id}`);
    },
  },
};
