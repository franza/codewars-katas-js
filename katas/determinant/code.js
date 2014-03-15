function determinant(m) {
  if (m.length == 1) {
    return m[0][0];
  }
  
  return m[0].reduce(function (acc, x, col) {
    var koef = col & 1 ? -1 : 1,
      minorDet = determinant(minor(m, { i: 0, j: col }));
    return acc + koef * x * minorDet;
  }, 0);
};

function minor(m, idxs) {
  
  function removeElement(index, m) {
    return m.slice(0, index).concat(m.slice(index + 1));
  }

  return removeElement(idxs.i, m.map(removeElement.bind(null, idxs.j)));
}

exports.determinant = determinant;