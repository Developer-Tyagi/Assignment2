import localDB, { getCollection } from '@services/dexie';

export async function setClaims(state, claimsData) {
  const claimsCollection = await getCollection('claims');
  const claims = claimsData.map(claim => ({
    ...claim
  }));
  state.claims = claims;
  if ((await claimsCollection.count()) > 0) {
    await claimsCollection.delete([]);
  }
  await localDB.claims.bulkAdd(claims);
}

export async function setOfflineClaims(state) {
  state.claims = await getCollection('claims').toArray();
}

export function setMortgage(state, mortgage) {
  state.mortgage = {
    ...mortgage.attributes
  };
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
export function setTemplateTypes(state, types) {
  state.templateOptions = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}

export function setClaimDocument(state, claimDocument) {
  state.claimDocument = claimDocument;
}
export function setClaimPhoto(state, claimPhoto) {
  state.claimPhoto = { ...claimPhoto.attributes };
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
