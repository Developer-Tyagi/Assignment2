import request from "@api";
import { buildApiData } from "@utils/api";
export async function getActiveLeadsList(
  { commit, dispatch },
  searchString = ""
) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/leads", { name: searchString });
    commit("setActiveLeads", data);
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
export async function getArchivedLeadsList({ commit, dispatch }, searchString) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get("/leads", {
      name: searchString,
      archive: true
    });
    commit("setArchivedLeads", data);
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
export async function addLeadToArchiveList({ commit, dispatch }, leadId) {
  dispatch("setLoading", true);
  try {
    await request.del(`/leads/${leadId}`);
    commit("moveActiveToArchive", leadId);
    dispatch("setLoading", false);
  } catch (e) {
    console.log(e);
    dispatch("setLoading", false);
    dispatch("setNotification", {
      type: "negative",
      message: "Error in archiving lead."
    });
  }
}

export async function addLeads({ dispatch, state }, payload) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.post(
      "/leads",
      buildApiData("leads", payload)
    );
    dispatch("setLoading", false);
    this.$router.push("/leads");
  } catch (e) {
    console.log(e);
    dispatch("setLoading", false);
    dispatch("setNotification", {
      type: "negative",
      message: e.response.data.title
    });
    return false;
  }
}

export async function getLeadDetails({ commit, dispatch }, id) {
  dispatch("setLoading", true);
  try {
    const { data } = await request.get(`/leads/${id}`);
    commit("setSelectedLead", data);
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

//need to be added later
// export async function removeSelectedLeadDetails({ commit, dispatch }) {
//   dispatch("setLoading", true);
//   try {
//     commit("setSelectedLead", {});
//     dispatch("setLoading", false);
//   } catch (e) {
//     console.log(e);
//     dispatch("setLoading", false);
//     dispatch("setNotification", {
//       type: "negative",
//       message: e.response.data.title
//     });
//   }
// }
