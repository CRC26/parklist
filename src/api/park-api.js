import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ParkArraySpec, ParkSpec, ParkSpecPlus,  } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";


export const parkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const parks = await db.parkStore.getAllParks();
        return parks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ParkArraySpec, failAction: validationError },
    description: "Get all parkApi",
    notes: "Returns all parkApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const park = await db.parkStore.getParkById(request.params.id);
        if (!park) {
          return Boom.notFound("No park with this id");
        }
        return park;
      } catch (err) {
        return Boom.serverUnavailable("No park with this id");
      }
    },
    tags: ["api"],
    description: "Find a Park",
    notes: "Returns a park",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ParkSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const park = await db.parkStore.addPark(request.params.id, request.payload);
        if (park) {
          return h.response(park).code(201);
        }
        return Boom.badImplementation("error creating park");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a park",
    notes: "Returns the newly created park",
    validate: { payload: ParkSpec,failAction: validationError },
    response: { schema: ParkSpecPlus, failAction: validationError },
  },
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const park = await db.parkStore.getParkById(request.params.id);
        if (!park) {
          return Boom.notFound("No Park with this id");
        }
        await db.parkStore.deletePark(park._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Park with this id");
      }
    },
    tags: ["api"],
    description: "Delete a park",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
  
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.parkStore.deleteAllParks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all parkApi",
  },


};
