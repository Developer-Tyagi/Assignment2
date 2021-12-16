import localDB, { getCollection } from '@services/dexie';

export async function setMortgages(state, mortgagesData) {
  const mortgagesCollection = await getCollection('mortgages');
  const mortgages = mortgagesData.data.map(mortgage => ({
    ...mortgage.attributes,
    id: mortgage.id
  }));
  if (mortgagesData.params.offset == 0) state.mortgages = []; // Initially we make  blank the data of  Mortgage List otherwise it we create the duplication error.

  if (mortgagesData.params.limit == 0 && mortgagesData.params.offset == 0) {
    // this condition is used to store the entire data in local DB which is used for the offline mode.
    await mortgagesCollection.delete([]);
    await localDB.mortgages.bulkAdd(mortgages);
  }

  if (mortgagesData.params.name) {
    // this condition is use for searching Mortgage item.
    state.mortgages = mortgages;
  } // this condition is used to store the fetching data.
  else state.mortgages = state.mortgages.concat(mortgages);
}

export async function setOfflineMortgages(state) {
  state.mortgages = await getCollection('mortgages').toArray();
  state.mortgages.sort(function (a, b) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });
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
