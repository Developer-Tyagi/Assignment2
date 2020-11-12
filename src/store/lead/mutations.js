export function updateName (state, payload) {
    console.log("In mutations: ",payload)
    console.log("In state: ",payload.id)
    Object.assign(state.leads[0], payload.updates)
}
