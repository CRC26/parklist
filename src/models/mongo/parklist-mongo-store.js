import { Parklist } from "./parklist.js";
import { parkMongoStore } from "./park-mongo-store.js";

export const parklistMongoStore = {
  async getAllParklists() {
    const parklists = await Parklist.find().lean();
    return parklists;
  },

  async getParklistById(id) {
    if (id) {
      const parklist = await Parklist.findOne({ _id: id }).lean();
      if (parklist) {
        parklist.parks = await parkMongoStore.getParksByParklistId(parklist._id);
      }
      return parklist;
    }
    return null;
  },

  async addParklist(parklist) {
    const newParklist = new Parklist(parklist);
    const parklistObj = await newParklist.save();
    return this.getParklistById(parklistObj._id);
  },

  async getUserParklists(id) {
    const parklist = await Parklist.find({ userid: id }).lean();
    return parklist;
  },

  async deleteParklistById(id) {
    try {
      await Parklist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllParklists() {
    await Parklist.deleteMany({});
  }
};