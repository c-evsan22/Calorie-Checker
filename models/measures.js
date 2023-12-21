module.exports = function(sequelize, DataTypes) {
    var Measure = sequelize.define("Measure", {
        measure_metric: {
            type: DataTypes.STRING,
        }
    });

    Measure.associate = function(models) {
        Measure.hasOne(models.Recipe_Ingredients, {
            foreignKey: "measure_id"
        })
    };

    return Measure;

};