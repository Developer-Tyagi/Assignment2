export function setClaims(state, claims) {
  // console.log('int');
  // state.claims = claims.map(claim => ({
  //   ...claim.attributes,
  //   id: claim.id
  //   // name: claim.attributes.insuredInfo.primary['fname']
  // }));
  state.claims = claims;
}
