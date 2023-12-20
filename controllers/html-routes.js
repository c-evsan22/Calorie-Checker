var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {

    app.get("/api/spoonacular/key", function(req, res) {
        res.send(process.env.API_KEY)
    })

    app.get("/api/ingredients", function (req, res) {
        db.Ingredients.findAll().then(function (data) {
            res.json(data);
        })
    })

    app.get("/api/measures", function (req, res) {
        db.Measure.findAll().then(function (data) {
            res.json(data);
        })
    })

    app.get("/api/measures/:measure_metric", function(req, res) {
        db.Measure.findOne({
            where: {
                measure_metric: req.params.measure_metric
            }
        }).then(function (data) {
            res.json(data);
        })
    })
    app.get("/api/measures/id/:id", function(req, res) {
        db.Measure.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })

    app.get("/api/ingredients/:id", function (req, res) {
        db.Ingredients.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })

    app.get("/api/ingredients/search/:item", function(req, res) {
        db.Ingredients.findAll({
            where: {
                item: {
                    [Op.like]: `%${req.params.item}%`
                }
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.get("/api/ingredients/item/:item", function(req, res) {
        db.Ingredients.findOne({
            where: {
                item: req.params.item,
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.get("/api/ingredients/:item/:price", function(req, res) {
        db.Ingredients.findOne({
            where: {
                item: req.params.item,
                price: req.params.price,
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.post("/api/ingredients", function (req, res) {
        db.Ingredients.create(req.body).then(function (ingredients) {
            res.json(ingredients);
        })
    });

    app.delete("/api/ingredients/:id", function (req, res) {
        db.Ingredients.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        })
    });

}