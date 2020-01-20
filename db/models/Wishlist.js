module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    move1: DataTypes.STRING,
    move2: DataTypes.STRING,
    move3: DataTypes.STRING,
    move4: DataTypes.STRING,
    item: DataTypes.STRING,
    nature: DataTypes.STRING,
    caught: DataTypes.BOOLEAN
  })

  Wishlist.associate = function(models) {
    models.Wishlist.belongsTo(models.Pokemon, { as: "wlPoke" })
  }

  return Wishlist
}
