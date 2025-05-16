'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,

  // Nouveau champ "role"
  role: {
    type: DataTypes.STRING,       // Je veux stocker une chaîne de caractères (ex: 'admin')
    allowNull: false,            // Je veux que ce champ soit obligatoire càd il ne peut pas être null 
    defaultValue: 'user'        // si je ne le précise pas, il sera 'user' par défaut
  }
}, {
  sequelize,
  modelName: 'User'
});
  return User;
}
