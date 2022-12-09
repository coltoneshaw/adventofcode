const returnScenicScore = (treeArray, tree) => {
  const indexOfLarger = treeArray.findIndex((t) => +t >= +tree);

  // finding where a tree is the same or taller than our current tree.
  // if this is -1 then no trees are taller than the current tree and we can return the length of the array.
  //
  if (indexOfLarger === -1) {
    return treeArray.length;
  }

  console.log({
    indexOfLarger,
  })

  if (indexOfLarger === 0 && +treeArray[0] === +tree) {
    return 1;
  }

  return treeArray.slice(0, indexOfLarger).length;
};

console.log(returnScenicScore(['5', '5', '2'], '1'))