module.exports = function(sequelize, DataTypes) {

    var Ingredients = sequelize.define("Ingredients", {

        item: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        price: DataTypes.FLOAT
    });

    Ingredients.associate = function(models) {
        Ingredients.hasOne(models.Recipe_Ingredients, {
            foreignKey: "ingredient_id"
        })
    };

    return Ingredients;




};