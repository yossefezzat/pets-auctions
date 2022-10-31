async function generalized_second_price(bids: any) {
  if (bids.length == 0) {
    return { winner: 'No winner' };
  }
  bids.sort(
    (a: any, b: any) => b.value - a.value || a.name.localeCompare(b.name),
  );
  for (let i = 0; i < bids.length - 1; i++) {
    bids[i].value = bids[i + 1].value;
  }
  bids[bids.length - 1].value = -1;
  return bids;
}

export { generalized_second_price };
