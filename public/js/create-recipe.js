$(document).ready(function () {
	let recipe = {
		recipe_id: "",
		author_id: "",
		title: $(".title").text(),
		image: "https://picsum.photos/450/250",
		author: $(".author").text(),
		ingredients: [],
		method: "",
	};

	var API_KEY = "";

	$.get("/api/spoonacular/key").then(function (KEY) {
		API_KEY = KEY;
	});

	$("#add-recipe-name").on("click", function (event) {
		event.preventDefault();
		$(".title").text($("#recipe-name").val().trim());
		recipe.title = $("#recipe-name").val().trim();
	});

	$("#add-recipe-image").on("click", function (event) {
		event.preventDefault();
		$("img").attr("src", $("#recipe-image").val().trim());
		recipe.image = $(".image").attr("src");
	});

	$.get("/api/user_data").then(function (data) {
		if (data.username) {
			$(".author").text(data.username);
			recipe.author = data.username;
			recipe.author_id = data.id;
		}
	});

	$.get("/api/measures").then(function (data) {
		for (var measure of data) {
			$(".ingredient-measures").append(`
			<option value="${measure.measure_metric}" class="measure-name">${measure.measure_metric}</option>`);
		}
	});

	$("#ingredient-search").on("click", function (event) {
		$(".result-items").empty();
		event.preventDefault();
		let search = $("#recipe-item").val().trim().toLowerCase();

		$.get(`/api/ingredients/search/${search}`).then(function (data) {
			for (var item of data) {
				let ingredient = {
					id: item.id,
					name: item.item,
					price: item.price,
				};

				$(".result-items").append(`
				<button type="button" class="search-item">
					<div class="results-id" id="${ingredient.id}"></div>
					<div class="results-name" id="${ingredient.name}">${ingredient.name}</div>
					<div id="${ingredient.price}">$<span class="results-price">${ingredient.price}</span></div>
				</button>`);
			}
		});

		$.get(`https://api.spoonacular.com/food/products/suggest?query=${search}&number=5&apiKey=${API_KEY}`)
		.then(function (response) {
			for (let data of response.results) {

				$.get(`https://api.spoonacular.com/food/products/${data.id}?apiKey=${API_KEY}`)
				.then(function(response) {

					if (response.price) {
						let ingredient = {
							name: response.title,
							price: ((response.price / 100) * 1.37).toFixed(2) // USD * 1.37 = AUD
						}

						$.get(`/api/ingredients/item/${ingredient.name}`).then(
							function (data) {
								if (data !== null) {
									return;
								} else {
									$(".result-items").append(`
								<button type="button" class="search-item api">
									<div class="results-id"></div>
									<div class="results-name" id="${ingredient.name}">${ingredient.name}</div>
									<div id="${ingredient.price}">$<span class="results-price">${ingredient.price}</span></div>
								</button>`);
								}
							}
						);
					}
				})
			}
		})

		$.get(
			`https://api.spoonacular.com/food/ingredients/autocomplete?query=${search}&number=3&metaInformation=true&apiKey=${API_KEY}`
		).then(function (response) {
			for (let data of response) {
				$.get(
					`https://api.spoonacular.com/food/ingredients/${data.id}/information?amount=1&apiKey=${API_KEY}`
				).then(function (response) {
					let ingredient = {
						name: response.name,
						price: ( (response.estimatedCost.value / 100) * 1.37 ).toFixed(4),
					};

					$.get(`/api/ingredients/item/${ingredient.name}`).then(
						function (data) {
							if (data !== null) {
								return;
							} else {
								$(".result-items").append(`
							<button type="button" class="search-item api">
								<div class="results-id"></div>
								<div class="results-name" id="${ingredient.name}">${ingredient.name}</div>
								<div id="${ingredient.price}">$<span class="results-price">${ingredient.price}</span></div>
							</button>`);
							}
						}
					);
				});
			}
		})
	});

	$(".result-items").on("click", ".search-item", function (event) {
		event.preventDefault();
		$("#ingredient-id").text("");
		$("#ingredient-name").text("");
		$("#ingredient-price").text("");

		let name = event.currentTarget.children[1].id;
		let price = event.currentTarget.children[2].id;
		$("#ingredient-name").text(name);
		$("#ingredient-price").text(price);

		if (event.currentTarget.classList[1] !== "api") {
			let id = event.currentTarget.children[0].id;
			$("#ingredient-id").text(id);
		} else {
			$.get(`/api/ingredients/item/${name}`).then(function (data) {
				if (data !== null) {
					return;
				} else {
					$.post("/api/ingredients", {
						item: name,
						price: price,
					});
				}
			});
		}
	});

	$("#add-ingredient").on("click", function (event) {
		event.preventDefault();

		$.get(`/api/ingredients/item/${$("#ingredient-name").text()}`).then(
			function (item) {
				var itemId = item.id;
				var measure = $("#ingredient-measures").val();
				var quantity = $("#ingredient-quantity").val().trim();

				$.get(`/api/measures/${measure}`).then(function (data) {
					let measureId = data.id;

					let ingredient = {
						id: itemId,
						quantity: quantity,
						measure: measure,
						measure_id: measureId,
						name: $("#ingredient-name").text(),
						price: $("#ingredient-price").text(),
					};

					if (quantity && measure) {
						$(".ingredients").append(
							`<tr>
						<td class="quantity">${ingredient.quantity}</td>
						<td class="measure">${ingredient.measure}</td>
						<td class="name">${ingredient.name}</td>
						<td>$<span class="price">${ingredient.price}</span></td>
					</tr>`
						);
						recipe.ingredients.push(ingredient);
						console.log(recipe);

						$("#ingredient-quantity").val("");
					}
				});
			}
		);
	});

	$("#manual-fill").hide();
	$(".toggle-manually").on("click", function (event) {
		event.preventDefault();

		$("#manual-fill").toggle();
		$("#auto-fill").toggle();
	});

	$("#add-manual").on("click", function (event) {
		event.preventDefault();


		let measure = $("#manual-measures").val();

		$.get(`/api/measures/${measure}`).then(function (data) {
			let measureId = data.id;

			let ingredient = {
				id: "ingredient not posted",
				quantity: $("#manual-quantity").val().trim(),
				measure: $("#manual-measures").val(),
				measure_id: measureId,
				name: $("#manual-name").val().trim().toLowerCase(),
				price: $("#manual-price").val().trim(),
			};

			if (ingredient.quantity && ingredient.name && ingredient.price) {
				$(".ingredients").append(
					`<tr>
					<td class="quantity">${ingredient.quantity}</td>
					<td class="measure">${ingredient.measure}</td>
					<td class="name">${ingredient.name}</td>
					<td>$<span class="price">${ingredient.price}</span></td>
				</tr>`
				);

				$.post("/api/ingredients", {
					item: ingredient.name,
					price: ingredient.price,
				}).done(function () {
					$.get(
						`/api/ingredients/${ingredient.name}/${ingredient.price}`
					)
						.then(function (data) {
							ingredient.id = data.id;
						})
						.done(function () {
							recipe.ingredients.push(ingredient);
							console.log(recipe);
							$("#manual-quantity").val("");
							$("#manual-name").val("");
							$("#manual-price").val("");
						});
				});
			}
		});
	});

	$("#add-method-step").on("click", function (event) {
		event.preventDefault();

		let step = $("#recipe-method").val().trim();

		if (step) {
			$(".method").append(`<li>${step}</li>`);
			recipe.method += `<li>${step}</li>`;
			$("#recipe-method").val("");
			console.log(recipe);
		}
	});

	$("#submit-recipe").on("click", function () {
		$.post("/api/recipes", {
			title: recipe.title,
			method: recipe.method,
			image: recipe.image,
			UserId: recipe.author_id,
		}).done(function () {

			$.get(`/api/recipes/${recipe.title}/${recipe.author_id}`).then(
				function (data) {
					recipe.recipe_id = data.id;

					recipe.ingredients.forEach((element) => {
						$.post("/api/recipesIngredients", {
							quantity: element.quantity,
							measure_id: element.measure_id,
							recipe_id: recipe.recipe_id,
							ingredient_id: element.id,
						})
							.done(function () {
								window.location.replace("/members");
							})
							.catch(function (err) {
								console.log(err);
							});
					});
				}
			);
		});
	});
});