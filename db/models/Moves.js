module.exports = (sequelize, DataTypes) => {
  const Moves = sequelize.define("Moves", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    moveName: DataTypes.STRING,
    power: DataTypes.INTEGER,
    type: DataTypes.STRING
  })

  Moves.associate = function(models) {
    models.Moves.hasMany(models.Wishlist, {
      as: "move1",
      foreignKey: "m1"
    })
    // models.Moves.hasMany(models.Wishlist, {
    //   as: "move2",
    //   foreignKey: "m2"
    // })
    // models.Moves.hasMany(models.Wishlist, {
    //   as: "move3",
    //   foreignKey: "m3"
    // })
    // models.Moves.hasMany(models.Wishlist, {
    //   as: "move4",
    //   foreignKey: "m4"
    // })
  }

  return Moves
}
