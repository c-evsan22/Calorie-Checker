let db = require("../models");

module.exports = function(app) {
    app.post("/api/add-comment/:recipe_id/:user_id", function(req, res) {
        let recipe_id = req.params.recipe_id;
        let user_id = req.params.user_id;
        let comment = req.body.comment;
        db.Comments.create({
            comment: comment,
            recipe_id: recipe_id,
            user_id: user_id
        }).then(function() {
            res.redirect(`/view-recipe/${recipe_id}`);
        })
    })
}