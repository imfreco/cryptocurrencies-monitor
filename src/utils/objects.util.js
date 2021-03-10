const getSomeProperties = (propsRequired, object) =>
  propsRequired.reduce((acc, curr) => {
    const objCurr = { ...acc };
    if (object[curr]) objCurr[curr] = object[curr];
    return objCurr;
  }, {});

module.exports = { getSomeProperties };
