let db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {
    app.post("/api/rate-recipe/:recipe_id/:user_id", function(req, res) {
        let recipe_id = req.params.recipe_id;
        let user_id = req.params.user_id;
        let rating = req.body.rating;
        db.sequelize.query(`
        INSERT INTO Ratings (rating, createdAt, updatedAt, recipe_id, user_id)
        VALUES (${rating}, NOW(), NOW(), ${recipe_id}, ${user_id});
        `, {
            type: sequelize.QueryTypes.INSERT
        }).then(function(data) {
            res.redirect(`/view-recipe/${recipe_id}`);
        })
    })
}