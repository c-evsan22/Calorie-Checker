$(document).ready(function () {
	$(".edit-recipe").on("click", (event) => {
		event.preventDefault();
		let recipe_id = event.currentTarget.id;

		window.location.replace(`/edit-recipe/${recipe_id}`);
	});

	$(".delete-recipe").on("click", (event) => {
		event.preventDefault();
		let recipe_id = event.currentTarget.id;

		$.ajax("/api/recipes/" + recipe_id, {
			type: "DELETE",
		}).then(function () {
			console.log("deleted recipe with id:", recipe_id);
			location.reload();
		});
	});
});