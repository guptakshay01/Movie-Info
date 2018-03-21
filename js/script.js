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

/*storing selected movie ID in session storage*/
function selectedMovie(id){
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}

/*details of single movie*/
function getMovie(){
	let movieId = sessionStorage.getItem('movieId');

	axios.get('http://www.omdbapi.com/?i='+ movieId +'&apikey=ac51e66c')
		.then((response) => {
			console.log(response);
			let movie = response.data;
			let output = `
				<div class="row">
					<div class="col-md-4">
						<img src="${movie.Poster}" class="thumbnail">
					<div>
					<div class="col-md-8">
					<div>
				</div>
			`;

			$('#movie').html(output);
		})
		.catch((err) =>{
			console.log(err);
		});
}