import { html } from '../../node_modules/lit-html/lit-html.js';

import { getMovieById, deleteMovie, addLike, getLikesByMovieId, getOwnLikesByMovieId } from '../api/data.js';


const detailsTemplate = (movie, isUser, isOwner, onDelete, liker, clickHandler, ownLikes) => html`
<section id="movie-details">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img} alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${!isUser ? html` <span class="enrolled-span">${liker}</span>` :
                isOwner ? html`
                <a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>
                <span class="enrolled-span">${liker}</span>` : ownLikes.length == 0
                ? html`
                <a @click=${clickHandler} class="btn btn-primary" href="javascript:void(0)">Like</a>
                <span class="enrolled-span">${liker}</span>` : html`<span class="enrolled-span">${liker}</span>`}
            </div>
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const movieId = ctx.params.id;
    const isUser = ctx.user._id;

    let [movie, likes, ownLikes] = await Promise.all([
        getMovieById(movieId),
        getLikesByMovieId(movieId),
        getOwnLikesByMovieId(movieId, isUser)
    ]);

    const isOwner = ctx.user && movie._ownerId == ctx.user._id;

    const clickHandler = {
        async handleEvent(event) {
            const movieLikes = { movieId: movie._id };
            await addLike(movieLikes);
            event.target.parentNode.querySelector('span').textContent = ++likes + ' like' + (likes == 1 ? '' : 's');
            event.target.remove();
        },
    };

    const liker = likes + ' like' + (likes == 1 ? '' : 's');

    ctx.render(detailsTemplate(movie, isUser, isOwner, onDelete, liker, clickHandler, ownLikes));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            await deleteMovie(movieId);
            ctx.page.redirect('/catalog');
        }
    }
}