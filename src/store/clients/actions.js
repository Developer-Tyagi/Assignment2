import request from "@api";
import { buildApiData } from "@utils/api";

export async function getClients({ commit, dispatch }) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/clients");
    commit("setClients", data);
    dispatch("setLoading", false);
  } catch (e) {
    console.log(e);
    dispatch("setLoading", false);
    dispatch("setNotification", {
      type: "negative",
      message: e.response.data.title
    });
  }
}

export async function addClient({ dispatch, state }, payload) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.post(
      "/clients",
      buildApiData("clients", payload)
    );
    dispatch("setLoading", false);
    this.$router.push("/clients");
  } catch (e) {
    console.log(e);
    dispatch("setLoading", false);
    dispatch("setNotification", {
      type: "negative",
      message: e.response.data.title
    });
  }
}

export async function getClientTypes({ commit, dispatch }) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/ctypes");
    commit("setClientTypes", data);
    dispatch("setLoading", false);
  } catch (e) {
    console.log(e);
    dispatch("setLoading", false);
    dispatch("setNotification", {
      type: "negative",
      message: e.response.data.title
    });
  }
}
