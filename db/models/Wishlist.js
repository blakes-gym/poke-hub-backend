module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    nature: DataTypes.STRING,
    caught: DataTypes.BOOLEAN
  })

  Wishlist.associate = function(models) {
    models.Wishlist.belongsTo(models.Pokemon, { as: "wlPoke" })
  }

  return Wishlist
}
