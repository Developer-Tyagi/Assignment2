import request from "@api";

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
