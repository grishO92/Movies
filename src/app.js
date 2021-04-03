import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js'
import { getUserData } from './utillitiy.js'
import { catalogPage } from './views/catalog.js';
import { loginPage, registerPage } from './views/auth.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';


const main = document.getElementById('main');
document.getElementById('logoutBtn').addEventListener('click', logout);


setUserNav();

page('/catalog', decorateContext, catalogPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav();
    ctx.user = getUserData();

    next();
}

function setUserNav() {
    const user = getUserData();
    if (user) {
        document.getElementById('welcome-msg').textContent = `Welcome ${user.email}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
    }
}

function logout() {
    apiLogout();
    setUserNav();
    page.redirect('/catalog');
}