let db = require("../models");
let sequelize = require("sequelize");

module.exports = function(app) {
    app.post("/api/add-favourite/:recipe_id/:user_id", function(req, res) {
        let recipe_id = req.params.recipe_id;
        let user_id = req.params.user_id;
        db.sequelize.query(`
            INSERT INTO Favourites (createdAt, updatedAt, recipe_id, user_id)
            VALUES (NOW(), NOW(), ${recipe_id}, ${user_id})
            `, {
            type: sequelize.QueryTypes.INSERT
        }).then(function() {
            res.redirect(`/view-recipe/${recipe_id}`);
        })
    })
}