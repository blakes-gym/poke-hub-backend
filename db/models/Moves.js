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
    models.Moves.hasMany(models.Wishlist, { as: "move1" })
    models.Moves.hasMany(models.Wishlist, { as: "move2" })
    models.Moves.hasMany(models.Wishlist, { as: "move3" })
    models.Moves.hasMany(models.Wishlist, { as: "move4" })
  }

  return Moves
}
