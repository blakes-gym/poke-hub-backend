module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teamId: {
      type: DataTypes.INTEGER
    },
    // pokeId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Pokemon,
    //     key: 'id'
    //   }
    // },
    teamName: DataTypes.STRING
  })

  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return Team
}
