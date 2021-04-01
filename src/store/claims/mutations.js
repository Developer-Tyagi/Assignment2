export function setClaims(state, claims) {
  state.claims = claims;
}
export function setLog(state, log) {
  state.log = log;
}
export function setClaimNotes(state, claims) {
  state.claimNotes = claims;
}
export function setPersonnel(state, claims) {
  state.personnel = claims;
}
export function setPolicy(state, policy) {
  state.policy = policy;
}
export function setLossInfo(state, claims) {
  state.lossInfo = claims;
}
export function setClaimTasks(state, claimTasks) {
  state.claimTasks = claimTasks.map(task => ({
    id: task.id,
    ...task.attributes
  }));
}
