// module.exports = (sequelize, DataTypes) => {
//   const Team = sequelize.define("Team", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     name: DataTypes.STRING
//   })

//   Team.associate = function(models) {
//     models.Team.belongsTo(models.Pokemon, { as: "p1" })
//     models.Team.belongsTo(models.Pokemon, { as: "p2" })
//     models.Team.belongsTo(models.Pokemon, { as: "p3" })
//     models.Team.belongsTo(models.Pokemon, { as: "p4" })
//     models.Team.belongsTo(models.Pokemon, { as: "p5" })
//     models.Team.belongsTo(models.Pokemon, { as: "p6" })
//   }

//   return Team
// }
