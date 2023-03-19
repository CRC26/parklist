import { userMemStore } from "./mem/user-mem-store.js";
import { parklistMemStore } from "./mem/parklist-mem-store.js";
import { parkMemStore } from "./mem/park-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { parklistJsonStore } from "./json/parklist-json-store.js";
import { parkJsonStore } from "./json/park-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { parklistMongoStore } from "./mongo/parklist-mongo-store.js";
import { parkMongoStore } from "./mongo/park-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  parklistStore: null,
  parkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.parklistStore = parklistJsonStore;
        this.parkStore = parkJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.parklistStore = parklistMongoStore;
        this.parkStore = parkMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.parklistStore = parklistMemStore;
        this.parkStore = parkMemStore;
    }
  }
};