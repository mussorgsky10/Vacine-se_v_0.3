'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sortitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cracha_sorteado: {
        type: Sequelize.STRING
      },
      itemId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'rewards',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sortitions');
  }
};