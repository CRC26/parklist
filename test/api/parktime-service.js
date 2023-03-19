import axios from "axios";
import { mickey, serviceUrl } from "../fixtures.js";

export const parktimeService = {
  parktimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.parktimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.parktimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.parktimeUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.parktimeUrl}/api/users`);
    return res.data;
  },

  async createParklist(parklist) {
    const res = await axios.post(`${this.parktimeUrl}/api/parklists`, parklist);
    return res.data;
  },

  async deleteAllParklists() {
    const response = await axios.delete(`${this.parktimeUrl}/api/parklists`);
    return response.data;
  },

  async deleteParklist(id) {
    const response = await axios.delete(`${this.parktimeUrl}/api/parklists/${id}`);
    return response;
  },

  async getAllParklists() {
    const res = await axios.get(`${this.parktimeUrl}/api/parklists`);
    return res.data;
  },

  async getParklist(id) {
    const res = await axios.get(`${this.parktimeUrl}/api/parklists/${id}`);
    return res.data;
  },

  async getAllParks() {
    const res = await axios.get(`${this.parktimeUrl}/api/parks`);
    return res.data;
  },

  async createPark(id, park) {
    const res = await axios.post(`${this.parktimeUrl}/api/parklists/${id}/parks`, park);
    return res.data;
  },

  async deleteAllParks() {
    const res = await axios.delete(`${this.parktimeUrl}/api/parks`);
    return res.data;
  },

  async getPark(id) {
    const res = await axios.get(`${this.parktimeUrl}/api/parks/${id}`);
    return res.data;
  },

  async deletePark(id) {
    const res = await axios.delete(`${this.parktimeUrl}/api/parks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.parktimeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
