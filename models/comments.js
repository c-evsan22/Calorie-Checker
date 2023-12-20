module.exports = function(sequelize, DataTypes) {

    let Comments = sequelize.define("Comments", {

        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

    });

    return Comments;

}