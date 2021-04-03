import { html } from '../../node_modules/lit-html/lit-html.js';
import { login, register } from '../api/data.js';

//don't forget for onSubmit
const loginTemplate = (onSubmit) => html`
<section id="form-login">
    <form @submit=${onSubmit} class="text-center border border-light p-5">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        await login(email, password);
        ctx.setUserNav;
        ctx.page.redirect('/catalog'); //change redirect path
    }
}



const registerTemplate = (onSubmit) => html`
<section id="form-sign-up">
    <form @submit=${onSubmit} class="text-center border border-light p-5">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPassword').trim();

        if (!email || !password) {
            return alert('All fields are required!');
        }
        if (password != repeatPass) {
            return alert('Passwords don\'t match!')
        }

        await register(email, password);
        ctx.setUserNav;
        ctx.page.redirect('/catalog'); //change redirect path
    }
}