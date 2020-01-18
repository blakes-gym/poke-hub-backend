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
    models.Wishlist.belongsTo(models.Moves, { as: "move1", foreignKey: "m1" })
    models.Wishlist.belongsTo(models.Moves, { as: "move2", foreignKey: "m2" })
    models.Wishlist.belongsTo(models.Moves, { as: "move3", foreignKey: "m3" })
    models.Wishlist.belongsTo(models.Moves, { as: "move4", foreignKey: "m4" })
  }

  return Wishlist
}
