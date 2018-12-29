//Game class Represents Game

class Game {
    constructor(title, studio, sn) {
        this.title = title;
        this.studio = studio;
        this.sn = sn;
    }
}

//UI class: handle UI Task
class UI {
    static displayGames() {
        const games = Store.getGames();

        games.forEach((game) => UI.addGameToList(game));        
    }

    static addGameToList(game) {
        const list = document.querySelector('#game-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${game.title}</td>
        <td>${game.studio}</td>
        <td>${game.sn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    };

    static deleteGame(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    };

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#game-form');
        container.insertBefore(div, form);
        // Vanish in three secs
        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#studio').value = '';
        document.querySelector('#sn').value = '';
    }
}
//Store Class: handles Storage
class Store {
    static getGames() {
        let games;
        if(localStorage.getItem('games') === null) {
            games = [];
        } else {
            games = JSON.parse(localStorage.getItem('games'));
        }
        return games;
    }

    static addGame(game) {
        const games = Store.getGames();
        games.push(game);
        localStorage.setItem('games', JSON.stringify(games));
    }

    static removeGame(sn) {
        const games = Store.getGames();

        games.forEach((game, index) => {
            if(game.sn === sn) {
                games.splice(index, );
            }
        });

        localStorage.setItem('games', JSON.stringify(games));
    }
}

//Event To Display Book
document.addEventListener('DOMContentLoaded', UI.displayGames);
//Event To add Book
document.querySelector('#game-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // get Form Value
    const title = document.querySelector('#title').value;
    const studio = document.querySelector('#studio').value;
    const sn = document.querySelector('#sn').value;

    //validate
    if(title === '' || studio === '' || sn === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {
        // instatiate
    const game = new Game(title, studio, sn);

    //add game to list
    UI.addGameToList(game);

    Store.addGame(game);

    //Show success message
    UI.showAlert('Added', 'sucesss')

    // Clear Fields
    UI.clearFields(); 
    }       
});
//Event to remove book
document.querySelector('#game-list').addEventListener('click', (e) => {
    UI.deleteGame(e.target)

    Store.removeGame(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed', 'sucess')
});

