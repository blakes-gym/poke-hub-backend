module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nature: DataTypes.STRING,
    caught: DataTypes.BOOLEAN
  })

  Wishlist.associate = function(models) {
    models.Wishlist.belongsTo(models.Pokemon, { as: "wlPoke" })

    models.Wishlist.belongsTo(models.Moves, { as: "move1" })
    // models.Wishlist.belongsTo(models.Moves, { as: "move2" })
    // models.Wishlist.belongsTo(models.Moves, { as: "move3" })
    // models.Wishlist.belongsTo(models.Moves, { as: "move4" })
  }

  return Wishlist
}
