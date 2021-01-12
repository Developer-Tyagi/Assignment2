import request from "@api";
<<<<<<< HEAD
=======
import { buildApiData } from "@utils/api";
>>>>>>> master

export async function getClients({ commit, dispatch }) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/clients");
<<<<<<< HEAD
    commit("setClients", data);
=======

    commit("setClients", data);

>>>>>>> master
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

<<<<<<< HEAD
export async function getClientTypes({ commit, dispatch }) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/ctypes");
    commit("setClientTypes", data);
    dispatch("setLoading", false);
=======
export async function addClient({ dispatch, state }, payload) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.post(
      "/clients",
      buildApiData("clients", payload)
    );
    dispatch("setLoading", false);
    this.$router.push("/clients");
>>>>>>> master
  } catch (e) {
    console.log(e);
    dispatch("setLoading", false);
    dispatch("setNotification", {
      type: "negative",
      message: e.response.data.title
    });
<<<<<<< HEAD
=======

    return false;
>>>>>>> master
  }
}
