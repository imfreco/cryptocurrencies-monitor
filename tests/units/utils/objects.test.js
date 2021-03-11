const { getSomeProperties } = require('../../../src/utils/objects.util');

describe('Pruebas a funciones de utilidad para objetos', () => {
  let generalObject = null;

  beforeAll(() => {
    generalObject = {
      symbol: 'first',
      name: 'cryptoblue',
      last_updated: 'yesterday',
    };
  });

  test('Debe retornar las propiedas requeridas', () => {
    const propsRequired = ['symbol'];

    expect(getSomeProperties(propsRequired, generalObject)).toEqual({
      symbol: generalObject.symbol,
    });
  });

  test('Debe omitir las propiedades requeridas que no existen', () => {
    const propsRequired = ['symbol', 'name', 'last'];

    expect(getSomeProperties(propsRequired, generalObject)).toEqual({
      symbol: generalObject.symbol,
      name: generalObject.name,
    });
  });
});
