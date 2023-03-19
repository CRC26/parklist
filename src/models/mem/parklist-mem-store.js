import { v4 } from "uuid";
import { parkMemStore } from "./park-mem-store.js";

let parklists = [];

export const parklistMemStore = {
  async getAllParklists() {
    return parklists;
  },

  async addParklist(parklist) {
    parklist._id = v4();
    parklists.push(parklist);
    return parklist;
  },

  async getParklistById(id) {
    const list = parklists.find((parklist) => parklist._id === id);
    if (list) {
      list.parks = await parkMemStore.getParksByParklistId(list._id);
      return list;
    }
    return null;
  },

  async getUserParklists(userid) {
    return parklists.filter((parklist) => parklist.userid === userid);
  },

  async deleteParklistById(id) {
    const index = parklists.findIndex((parklist) => parklist._id === id);
    if (index !== -1) parklists.splice(index, 1);
  },

  async deleteAllParklists() {
    parklists = [];
  },
};