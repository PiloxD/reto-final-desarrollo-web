export class Navbar {

    #privateNavbar;

    constructor() {
        this.#privateGenerateNavbar();
    }

    get() {
        return this.#privateNavbar;
    }

    #privateGenerateNavbar() {
        const nav = document.createElement('nav');
        nav.classList.add('navbar', 'navbar-expand-lg', 'bg-light');

        const div = document.createElement('div');
        div.classList.add('container-fluid');

        nav.appendChild(div);

        this.#privateNavbar = nav;
    }
}