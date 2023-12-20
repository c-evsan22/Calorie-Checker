module.exports = function(sequelize, DataTypes) {
    var Recipe_Ingredients = sequelize.define("Recipe_Ingredients", {
        quantity: {
            type: DataTypes.STRING
        }
    });

    Recipe_Ingredients.associate = function(models) {
        Recipe_Ingredients.belongsTo(models.Recipe, {
            targetKey: "id",
            foreignKey: "recipe_id"
        });
        Recipe_Ingredients.belongsTo(models.Ingredients, {
            targetKey: "id",
            foreignKey: "ingredient_id"
        });
        Recipe_Ingredients.belongsTo(models.Measure, {
            targetKey: "id",
            foreignKey: "measure_id"
        });
    }

    return Recipe_Ingredients;
}