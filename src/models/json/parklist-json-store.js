import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { parkJsonStore } from "./park-json-store.js";

const db = new Low(new JSONFile("./src/models/json/parklists.json"));
db.data = { parklists: [] };

export const parklistJsonStore = {
  async getAllParklists() {
    await db.read();
    return db.data.parklists;
  },

  async addParklist(parklist) {
    await db.read();
    parklist._id = v4();
    db.data.parklists.push(parklist);
    await db.write();
    return parklist;
  },

  async getParklistById(id) {
    await db.read();
    let list = db.data.parklists.find((parklist) => parklist._id === id);
    if (list) {
      list.parks = await parkJsonStore.getParksByParklistId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserParklists(userid) {
    await db.read();
    return db.data.parklists.filter((parklist) => parklist.userid === userid);
  },

  async deleteParklistById(id) {
    await db.read();
    const index = db.data.parklists.findIndex((parklist) => parklist._id === id);
    if (index !== -1) db.data.parklists.splice(index, 1);
    await db.write();
  },

  async deleteAllParklists() {
    db.data.parklists = [];
    await db.write();
  },
};