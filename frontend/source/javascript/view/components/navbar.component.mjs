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
        nav.classList.add('nav');
        const div = document.createElement('div');
        div.classList.add('logo-container');
        div.innerHTML = `
            <a href="../../../../source/index.html" class="ancor-logo">
                <h3>Krell&#128521;</h3>
            </a>
        `;
        nav.appendChild(div);

        this.#privateNavbar = nav;
    }
    
}