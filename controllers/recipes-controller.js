const sequelize = require("sequelize");

// Requiring our models
var db = require("../models");

// Tip for you Tom
const { Recipe } = require("../models");

module.exports = function(app) {

    // get all the recipes
    app.get("/api/recipes", function(req, res) {
        Recipe.findAll().then(function(data) {
            res.json(data);
        })
    })

    // get a recipe using the recipe id
    app.get("/api/recipes/:id", function(req, res) {
        Recipe.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.get("/api/recipes/less-than/:price", function(req, res) {
        let price = req.params.price;
        db.sequelize.query(`
        SELECT r.id, r.title, SUM(i.price) AS "cost"
        FROM Recipes r 
        JOIN Recipe_Ingredients ri on r.id = ri.recipe_id 
        JOIN Ingredients i on i.id = ri.ingredient_id
        GROUP BY r.title
        HAVING SUM(i.price)<${price};
        `, { type: sequelize.QueryTypes.SELECT })
            .then(function(data) {
                res.json(data);
            })
    })

    // get a recipe using the recipe name and user id
    app.get("/api/recipes/:title/:UserId", function(req, res) {
        Recipe.findOne({
            where: {
                title: req.params.title,
                UserId: req.params.UserId,
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.post("/api/recipes", function(req, res) {
        Recipe.create(req.body).then(function(recipe) {
            res.json(recipe);
        })
    });

    app.put("/api/recipes/:id", function(req, res) {
        Recipe.update({
            title: req.body.title,
            method: req.body.method,
            image: req.body.image,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data)
        })
    })

    app.delete("/api/recipes/:id", function(req, res) {
        Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data)
        })
    })

}