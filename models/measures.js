module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        method: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING
        }
    });

    Recipe.associate = function(models) {
        Recipe.hasOne(models.Recipe_Ingredients, {
            foreignKey: "recipe_id"
        });
        Recipe.hasMany(models.Ratings, {
            foreignKey: "recipe_id"
        });
        Recipe.hasMany(models.Comments, {
            foreignKey: "recipe_id"
        });
        Recipe.belongsToMany(models.User, {
            through: models.Favourites,
            foreignKey: "recipe_id"
        });
    };

    return Recipe;

};