$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		let movieName = $('#movieName').val();
		getMovies(movieName);
		e.preventDefault();
	});
});

/* list of movies */
function getMovies(movieName){
	axios.get('http://www.omdbapi.com/?s='+ movieName +'&apikey=ac51e66c')
		.then((response) => {
			console.log(response);
			let movies = response.data.Search;
			let output = '';

			$.each(movies, (index, movie) => {
				output += `
					<div class="col-md-3">
						<div class="well text-center">
							<img src="${movie.Poster}">
							<h5>${movie.Title}</h5>
							<a onClick="selectedMovie('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
						</div>
					</div>
				`;
			});

			$('#movies').html(output);
		})
		.catch((err) =>{
			console.log(err);
		});
}