const { VSCurrencyTypes } = require('../../../src/common');
const {
  addToFilterOptions,
  getCoins,
} = require('../../../src/providers/coin-gecko.provider');

describe('Pruebas al proveedor de data de criptomonedas', () => {
  describe('Pruebas a la función AddToOptions', () => {
    test('Debe agregar los attributos que sean válidos', () => {
      const vs_currency = 'eur';
      const ids = undefined;
      const price = 'asc';

      expect(addToFilterOptions(vs_currency, ids, price)).toEqual({
        vs_currency: expect.any(String),
        order: expect.any(String),
      });
    });

    test('La propiedad vs_currency debe ser de algún tipo establecido', () => {
      const VSTypes = VSCurrencyTypes.map(({ vs }) => vs);
      const vs_currency = 'eur';
      const vs_currency_wrong = 'some_wrong';

      expect(VSTypes).toEqual(expect.arrayContaining([vs_currency]));
      expect(VSTypes).toEqual(expect.not.arrayContaining([vs_currency_wrong]));
    });

    test('El array vacío no debe ser agregado a las opciones de filtrado', () => {
      const vs_currency = 'usd';
      const ids = [];

      expect(addToFilterOptions(vs_currency, ids)).toEqual({
        vs_currency: expect.any(String),
      });
    });
  });

  describe('Pruebas a la función getCoins', () => {
    test('Debe devolver una respuesta con la siguiente estructura', async () => {
      const res = await getCoins();

      expect(res).toEqual({
        code: expect.any(Number),
        message: expect.any(String),
        success: expect.any(Boolean),
        data: expect.any(Array),
      });
    });
  });
});
