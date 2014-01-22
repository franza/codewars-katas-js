function determinant(m) {
  if (m.length == 1) {
    return m[0][0];
  }
  
  m[0].reduce(function (acc, x, col) {
    return acc + Math.pow(-1, col) * x * determinant(minor(m, { i: 0, j: col }));
  });
};

function minor(m, idxs) {
  
  function removeElement(index, m) {
    return m.slice(0, index).concat(m.slice(index + 1));
  }

  var result = removeElement(idxs.i, m.map(removeElement.bind(null, idxs.j)));
  console.log('result', result);

  return result;
}

console.log( minor([[1,3],[2,5]], {i: 0, j: 0}) );

exports.determinant = determinant;