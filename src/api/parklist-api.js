import Boom from "@hapi/boom";
import { IdSpec, ParklistArraySpec, ParklistSpec, ParklistSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const parklistApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const parklists = await db.parklistStore.getAllParklists();
        return parklists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ParklistArraySpec, failAction: validationError },
    description: "Get all parklists",
    notes: "Returns all parklists",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const parklist = await db.parklistStore.getParklistById(request.params.id);
        if (!parklist) {
          return Boom.notFound("No Parklist with this id");
        }
        return parklist;
      } catch (err) {
        return Boom.serverUnavailable("No Parklist with this id");
      }
    },
    tags: ["api"],
    description: "Find a Parklist",
    notes: "Returns a parklist",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ParklistSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const parklist = request.payload;
        const newParklist = await db.parklistStore.addParklist(parklist);
        if (newParklist) {
          return h.response(newParklist).code(201);
        }
        return Boom.badImplementation("error creating parklist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Parklist",
    notes: "Returns the newly created parklist",
    validate: { payload: ParklistSpec, failAction: validationError },
    response: { schema: ParklistSpecPlus, failAction: validationError },
  },
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const parklist = await db.parklistStore.getParklistById(request.params.id);
        if (!parklist) {
          return Boom.notFound("No Parlist with this id");
        }
        await db.parklistStore.deleteParklistById(parklist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Parklist with this id");
      }
    },
    tags: ["api"],
    description: "Delete a parklist",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.parklistStore.deleteAllParklists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all ParklistApi",
  },

};
