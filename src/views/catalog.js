import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllMovies } from '../api/data.js';
import { movieTemplate } from './common/movie.js';


const catalogTemplate = (movies) => html`
<section id="home-page">
    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
            class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>

    <h1 class="text-center">Movies</h1>


    <a id="createLink" href="/create" class="btn btn-warning ">Add Movie</a>

    <div class=" mt-3 ">
        <div class="row d-flex d-wrap">
            <div class="card-deck d-flex justify-content-center">
                ${movies.map(movieTemplate)}
            </div>
        </div>
    </div>
</section>`;


export async function catalogPage(ctx) {
    const movies = await getAllMovies();
    ctx.render(catalogTemplate(movies));
}