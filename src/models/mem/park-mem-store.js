import { v4 } from "uuid";

let parks = [];

export const parkMemStore = {
  async getAllParks() {
    return parks;
  },

  async addPark(parklistId, park) {
    park._id = v4();
    park.parklistid = parklistId;
    parks.push(park);
    return park;
  },

  async getParksByParklistId(id) {
    return parks.filter((park) => park.parklistid === id);
  },

  async getParkById(id) {
    return parks.find((park) => park._id === id);
  },

  async getParklistParks(parklistId) {
    return parks.filter((park) => park.parklistid === parklistId);
  },

  async deletePark(id) {
    const index = parks.findIndex((park) => park._id === id);
    parks.splice(index, 1);
  },

  async deleteAllParks() {
    parks = [];
  },

  async updatePark(park, updatedPark) {
    park.title = updatedPark.title;
    park.location = updatedPark.location;
    park.duration = updatedPark.duration;
  },
  
  async getUserParklists(userid) {
    return parklists.filter((parklist) => parklist.userid === userid);
  },
};
