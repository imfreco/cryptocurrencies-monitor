const { CoinTypes } = require('../common');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'coin', // new field name
        {
          allowNull: false,
          defaultValue: CoinTypes[1],
          type: Sequelize.ENUM,
          values: CoinTypes,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([queryInterface.removeColumn('Users', 'coin')]);
  },
};
