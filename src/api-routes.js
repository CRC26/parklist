import { userApi } from "./api/user-api.js";
import { parklistApi } from "./api/parklist-api.js";
import { parkApi } from "./api/park-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/parklists", config: parklistApi.create },
  { method: "DELETE", path: "/api/parklists", config: parklistApi.deleteAll },
  { method: "GET", path: "/api/parklists", config: parklistApi.find },
  { method: "GET", path: "/api/parklists/{id}", config: parklistApi.findOne },
  { method: "DELETE", path: "/api/parklists/{id}", config: parklistApi.deleteOne },

  { method: "GET", path: "/api/parks", config: parkApi.find },
  { method: "GET", path: "/api/parks/{id}", config: parkApi.findOne },
  { method: "POST", path: "/api/parklists/{id}/parks", config: parkApi.create },
  { method: "DELETE", path: "/api/parks", config: parkApi.deleteAll },
  { method: "DELETE", path: "/api/parks/{id}", config: parkApi.deleteOne },
];