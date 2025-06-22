// ce fichier définit le modèle de consentement pour l'utilisateur
module.exports = (sequelize, DataTypes) => {
  const Consent = sequelize.define('Consent', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tracking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    analytics: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    marketing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Consent;
};
