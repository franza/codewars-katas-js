function determinant(m) {
  if (m.length == 1) {
    return m[0][0];
  }
  
  return m[0].reduce(function (acc, x, col) {
    return acc + ( col & 1 ? -1 : 1 ) * x * determinant( minor(m, { i: 0, j: col }) );
  }, 0);
};

function minor(m, idxs) {
  
  function removeElement(index, m) {
    return m.slice(0, index).concat(m.slice(index + 1));
  }

  return removeElement(idxs.i, m.map(removeElement.bind(null, idxs.j)));
}

exports.determinant = determinant;