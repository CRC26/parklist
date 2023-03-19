import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { parklistController } from "./controllers/parklist-controller.js";
import { parkController } from "./controllers/park-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addparklist", config: dashboardController.addParklist },
  { method: "GET", path: "/dashboard/deleteparklist/{id}", config: dashboardController.deleteParklist },
 
  { method: "GET", path: "/parklist/{id}", config: parklistController.index },
  { method: "POST", path: "/parklist/{id}/addpark", config: parklistController.addPark },
  { method: "GET", path: "/parklist/{id}/deletepark/{parkid}", config: parklistController.deletePark },

  { method: "GET", path: "/park/{id}/editpark/{parkid}", config: parkController.index },
  { method: "POST", path: "/park/{id}/updatepark/{parkid}", config: parkController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];