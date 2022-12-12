type Node = {
  x: number;
  y: number;
  key: string;
  weight: number
};

const findItem = (
  inputArray: string[][],
  item: 'S' | 'E',
): Node => {
  const row = inputArray.find((r) => r.includes(item));

  if (!row) {
    throw Error('Unable to find the item');
  }
  const position = {
    y: inputArray.indexOf(row),
    x: row.indexOf(item),
  };

  return {
    ...position,
    key: `${position.x},${position.y}`,
    weight: 0,
  };
};

export {
  findItem,
};
