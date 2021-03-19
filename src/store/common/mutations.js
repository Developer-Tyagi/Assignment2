export function setLoading(state, value) {
  state.showLoading = value;
}
export function setClientTypes(state, types) {
  state.clientTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}
export function setNotification(state, value) {
  state.notification = value;
}
export function setTitles(state, titles) {
  state.titles = titles.map(titles => ({
    value: titles.attributes.value,
    id: titles.id,
    machineValue: titles.attributes.machineValue
  }));
}

export function setContactTypes(state, types) {
  state.contactTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue
  }));
}

export function setPlans(state, plans) {
  state.plans = plans.map(plan => ({ ...plan.attributes, id: plan.id }));
}
export function setLossCause(state, types) {
  state.lossCauses = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}

export function setRoles(state, roles) {
  state.roleTypes = roles.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    isPaid: type.attributes.isPaid
  }));
}
