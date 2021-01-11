import request from "@api";

export function setLoading({ commit }, value) {
  commit("setLoading", value);
}

export function setNotification({ commit }, notification) {
  commit("setNotification", notification);
}

export async function getContactTypes({ commit, dispatch }) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/phonetypes");
    commit("setContactTypes", data);
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
