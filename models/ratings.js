module.exports = function(sequelize, DataTypes) {

    let Ratings = sequelize.define("Ratings", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 5,
                min: 1
            }
        }
    });

    return Ratings;
}