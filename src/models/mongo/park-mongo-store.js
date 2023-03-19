import { Park } from "./park.js";
import { Parklist } from "./parklist.js";

export const parkMongoStore = {
  async getAllParks() {
    const parks = await Park.find().lean();
    return parks;
  },

  async addPark(parklistId, park) {
    park.parklistid = parklistId;
    const newPark = new Park(park);
    const parkObj = await newPark.save();
    return this.getParkById(parkObj._id);
  },

  async getParksByParklistId(id) {
    const parks = await Park.find({ parklistid: id }).lean();
    return parks;
  },

  async getParkById(id) {
    if (id) {
      const park = await Park.findOne({ _id: id }).lean();
      return park;
    }
    return null;
  },

  async deletePark(id) {
    try {
      await Park.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllParks() {
    await Park.deleteMany({});
  },

  async updatePark(park, updatedPark) {
    const parkDoc = await park.findOne({ _id: park._id });
    parkDoc.title = updatedPark.title;
    parkDoc.location = updatedPark.location;
    parkDoc.duration = updatedPark.duration;
    await parkDoc.save();
  },
};