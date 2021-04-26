export function setMortgages(state, mortgages) {
  state.mortgages = mortgages.map(mortgage => ({
    ...mortgage.attributes,
    id: mortgage.id
  }));
}
export function setSelectedMortgage(state, mortgage = {}) {
  state.selectedMortgage = {
    id: mortgage.id,
    ...mortgage.attributes
  };
}

export function setMortgagePersonnel(state, mortgage) {
  state.mortgagePersonnel = {
    id: mortgage.id,
    ...mortgage.attributes
  };
}
