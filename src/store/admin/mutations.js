export function setPlans(state, plans) {
  state.plans = plans.map(plan => ({ ...plan.attributes, id: plan.id }));
}
