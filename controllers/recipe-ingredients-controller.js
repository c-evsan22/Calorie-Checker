var db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {
    app.get("/api/recipesIngredients/:recipe_id", function(req, res) {
        db.sequelize.query(`
        SELECT * FROM Recipe_Ingredients
        WHERE recipe_id = ${req.params.recipe_id};`, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            res.json(data);
        })
    })

    app.get("/api/recipesIngredients", function(req, res) {
        db.sequelize.query(`
        SELECT * FROM Recipe_Ingredients;`, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            res.json(data);
        })
    })

    app.post("/api/recipesIngredients", function(req, res) {
        db.sequelize.query(`
        INSERT INTO Recipe_Ingredients (quantity, createdAt, updatedAt, recipe_id, ingredient_id, measure_id) 
        VALUES (${req.body.quantity},NOW(), NOW(), ${req.body.recipe_id}, ${req.body.ingredient_id}, ${req.body.measure_id});`, {
            type: sequelize.QueryTypes.INSERT
        }).then(function(data) {
            res.json(data);
        })
    });

    app.put("/api/recipesIngredients/:id", function(req, res) {
        db.sequelize.query(`
        UPDATE Recipe_Ingredients
        SET 
            quantity = ${req.body.quantity}, 
            ingredient_id = ${req.body.ingredient_id},
            measure_id = ${req.body.measure_id}
        WHERE recipe_id = ${req.params.id};`, {
            type: sequelize.QueryTypes.UPDATE
        }).then(function(data) {
            res.json(data)
        })
    })

    app.delete("/api/recipesIngredients/:id", function(req, res) {
        db.sequelize.query(`
        DELETE FROM Recipe_Ingredients
        WHERE recipe_id = ${req.params.id};`, {
            type: sequelize.QueryTypes.DELETE
        }).then(function(data) {
            res.json(data);
        })
    })
}