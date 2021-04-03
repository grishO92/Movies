import { html } from '../../node_modules/lit-html/lit-html.js';

import { editMovie, getMovieById } from '../api/data.js';


const editTemplate = (movie, onSubmit) => html`
<section id="edit-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"
                .value=${movie.description}></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>`;

export async function editPage(ctx) {
    const movieId = ctx.params.id;
    const movie = await getMovieById(movieId);
    ctx.render(editTemplate(movie, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        //same as create
        const editedMovie = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim()
        };

        if (Object.values(editedMovie).some(x => !x)) {
            return alert('All fields are required!');
        }

        await editMovie(movieId, editedMovie);
        event.target.reset();
        ctx.page.redirect('/details/' + movieId);
    }
}