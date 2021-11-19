import localDB, { getCollection } from '@services/dexie';

export async function setClaims(state, claimsData = []) {
  const claimsCollection = await getCollection('claims');
  const claims = claimsData.data.map(claim => ({
    id: claim.id,
    ...claim.attributes
  }));
  state.claims = claims;

  if ((await claimsCollection.count()) > 0 && !claimsData.params) {
    await claimsCollection.delete([]);
  }
  if (!claimsData.params) {
    await localDB.claims.bulkAdd(claims);
  }
}

export async function setOfflineClaims(state) {
  state.claims = await getCollection('claims').toArray();
  state.claims.sort(function(a, b) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });
}

export function setMortgage(state, mortgage) {
  state.mortgage = {
    ...mortgage.attributes
  };
}
export function setContractDocument(state, signedContractDocument) {
  state.signedContractDocument.push(signedContractDocument);
}
export function setClaimVendors(state, vendorLists) {
  state.vendorLists = {
    ...vendorLists.attributes
  };
}
export function setOfficeTasks(state, tasks) {
  state.tasks = {
    ...tasks.attributes
  };
}
export function setClaim(state, claim) {
  state.claim = {
    id: claim.id,
    ...claim.attributes
  };
}

export function setLog(state, log) {
  state.log = log.map(action => ({
    ...action.attributes,
    id: action.id
  }));
}

export function setDamageInfo(state, damageInfo) {
  state.damageInfo = damageInfo.attributes;
}
export function setClaimNotes(state, claims) {
  state.claimNotes = claims;
}
export function setPersonnel(state, personnel) {
  state.personnel = {
    ...personnel.attributes
  };
}

export function setAllPayment(state, payment) {
  state.payment = {
    ...payment.attributes
  };
}
export function setAllDisbursements(state, disbursements) {
  state.disbursements = {
    ...disbursements.attributes
  };
}

export function setAllExpenses(state, expenses) {
  state.expenses = {
    ...expenses.attributes
  };
}

export function setAccountDetails(state, account) {
  state.account = {
    ...account.attributes
  };
}
export function setPolicy(state, policy) {
  // state.policy = policy.attributes;
  state.policy = {
    ...policy.attributes
  };
}

export function setLossInfo(state, claims) {
  state.lossInfo = claims;
}

export function setSettlementTypes(state, settlementType) {
  state.settlementType = settlementType.map(action => ({
    value: action.attributes.value,
    id: action.id,
    machineValue: action.attributes.machineValue
  }));
}

export function setSettlements(state, settlement) {
  state.settlement = settlement;
}

export function setClaimTasks(state, claimTasks) {
  state.claimTasks = claimTasks.map(task => ({
    id: task.id,
    ...task.attributes
  }));
}

export function setPhases(state, phases) {
  state.phases = phases.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}
export async function setTemplateTypes(state, types) {
  // state.templateOptions = types.map(type => ({
  //   name: type.attributes.value,
  //   machineValue: type.attributes.machineValue,
  //   id: type.id
  // }));

  const templateTypeCollection = await getCollection('templateTypes');
  const templateType = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
  state.templateOptions = templateType;

  if ((await templateTypeCollection.count()) > 0) {
    await templateTypeCollection.delete([]);
  }

  await localDB.templateTypes.bulkAdd(templateType);
}
// setOfflineTemplatesTypes;

export async function setOfflineTemplatesTypes(state) {
  state.templateOptions = await getCollection('templateTypes').toArray();
}

export function setClaimDocument(state, claimDocument) {
  state.claimDocument = claimDocument;
}
export function setPOLClaimDocument(state, claimPOLDocument) {
  state.claimPOLDocument = { ...claimPOLDocument.attributes };
}

export function setClaimPhoto(state, claimPhoto) {
  state.claimPhoto = { ...claimPhoto.attributes };
}
export function setVendorDocument(state, vendorDocument) {
  state.vendorDocument = { ...vendorDocument.attributes };
}

export function setClaimSketch(state, claimSketch) {
  state.claimSketch = { ...claimSketch.attributes };
}

export function setAdditionalDocs(state, additionalDocs) {
  state.additionalDocs = { ...additionalDocs.attributes };
}

export function setEsxDocs(state, esxDocs) {
  state.esxDocs = { ...esxDocs.attributes };
}
export function setClaimStatistics(state, claimStatic) {
  state.claimStatic = {
    ...claimStatic.attributes
  };
}
export function setProofOfLoss(state, proofOfLoss) {
  state.proofOfLoss = { ...proofOfLoss.attributes };
}
export function setEstimator(state, estimator) {
  state.estimator = { ...estimator.attributes };
}
export function setAllActors(state, actors) {
  state.actors = { ...actors.attributes.actors };
}
