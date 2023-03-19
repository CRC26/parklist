import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/parks.json"));
db.data = { parks: [] };

export const parkJsonStore = {
  async getAllParks() {
    await db.read();
    return db.data.parks;
  },

  async addPark(parklistId, park) {
    await db.read();
    park._id = v4();
    park.parklistid = parklistId;
    db.data.parks.push(park);
    await db.write();
    return park;
  },

  async getParksByParklistId(id) {
    await db.read();
    return db.data.parks.filter((park) => park.parklistid === id);
  },

  async getParkById(id) {
    await db.read();
    return db.data.parks.find((park) => park._id === id);
  },

  async deletePark(id) {
    await db.read();
    const index = db.data.parks.findIndex((park) => park._id === id);
    if (index !== -1) db.data.parks.splice(index, 1);
    await db.write();
  },

  async deleteAllParks() {
    db.data.parks = [];
    await db.write();
  },

  async updatePark(park, updatedPark) {
    park.title = updatedPark.title;
    park.location = updatedPark.location;
    park.rating = updatedPark.rating;
    await db.write();
  },
};