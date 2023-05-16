# Pokédex Web Application

=======================

This is a small web application built using HTML, CSS, and JavaScript. The application loads data from an external API and allows users to view detailed information about Pokémon.

Link: https://jdussold.github.io/pokedex/

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Technical Dependencies](#technical-dependencies)
- [How to Use the Application](#how-to-use-the-application)
- [Code Explanation](#code-explanation)

## Objective

---

The objective of this project is to create a Pokédex app that displays a list of 90 Pokémon. The Pokémon data is retrieved from the [PokéAPI](https://pokeapi.co/), a free and open API for Pokémon-related information.

## Features

---

The Pokédex web application offers the following features:

1.  Pokémon List: The main page displays a list of Pokémon cards, each representing a different Pokémon. Each card includes the Pokémon's name and an image of the Pokémon's front view.

2.  View Pokémon Details: Users can click on a Pokémon card or the "See Profile" button to view detailed information about the selected Pokémon. The detailed information includes the Pokémon's name, front and back images, height, types, and abilities.

3.  Search Pokémon: The application provides a search bar located at the top right corner, allowing users to search for specific Pokémon. As the user types in the search bar, the application dynamically filters the Pokémon list based on the search query, showing only the Pokémon that match the search criteria.

4.  Clear Search: To reset the search and view the complete Pokémon list again, users can click the "Clear" button next to the search bar.

## Technical Dependencies

---

The application relies on the following technologies:

- HTML: Used for structuring the web page and presenting the Pokémon information.
- CSS: Used for styling the application and providing an attractive user interface.
- JavaScript: Used for retrieving data from the PokéAPI, handling user interactions, and dynamically updating the application.
- Bootstrap: Used as a CSS framework for responsive design and pre-styled components.

## How to Use the Application

---

You can access the application by following this link: [Pokédex Web App](https://jdussold.github.io/pokedex/)

Upon accessing the application, you will see a list of Pokémon cards. You can scroll through the list or use the search bar to find specific Pokémon. To view the details of a Pokémon, click on its card or the "See Profile" button. A modal window will appear, displaying the Pokémon's detailed information. To clear the search and view the complete Pokémon list, click the "Clear" button.

## Code Explanation

---

The code for the Pokédex web application is organized into a self-executing anonymous function, defining the `pokemonRepository` object that handles the interaction with the API and manages the Pokémon data.

The main functions provided by the `pokemonRepository` object include:

- `add(pokemon)`: Adds a new Pokémon to the repository after performing basic validation.
- `getAll()`: Returns the entire Pokémon repository.
- `addListItem(pokemon)`: Appends a new Pokémon card with a profile button to the page, allowing users to view detailed information.
- `loadList()`: Fetches a list of Pokémon from the API and populates the repository.
- `loadDetails(item)`: Fetches additional details for a specific Pokémon and updates its properties in the repository.
- `showDetails(pokemon)`: Shows the details (e.g., image, height, types, abilities) of a selected Pokémon.
- `showModal(item)`: Displays the Pokémon details in a modal window.
- `searchBar`: Represents the CSS selector for the search bar element.
- Event listener for the search bar, which filters the Pokémon list based on the user's search query.

The code also includes the initialization process, where the Pokémon list is fetched using `loadList()` and then used to add Pokémon cards and profile buttons to the page using `addListItem()`.

The `loadList()` function fetches a list of Pokémon from the PokéAPI by making an HTTP request to the specified API URL. Once the response is received, the function processes the JSON data and extracts the name and details URL of each Pokémon. It then uses the `add()` function to add each Pokémon to the repository.

The `loadDetails(item)` function is responsible for fetching additional details for a specific Pokémon. It takes an item (representing a Pokémon) as a parameter and makes an HTTP request to the details URL of that Pokémon. Upon receiving the response, the function extracts relevant details such as the front and back image URLs, height, types, and abilities. It updates the corresponding properties of the Pokémon in the repository.

The `addListItem(pokemon)` function is used to dynamically create Pokémon cards and profile buttons on the page. It appends the necessary HTML elements to display the Pokémon's name, image, and profile button. Event listeners are also attached to the card and button, so that when clicked, the `showDetails(pokemon)` function is called to display the Pokémon's details in a modal window.

The `showModal(item)` function is responsible for displaying the Pokémon's details in a modal window. It extracts the necessary details from the Pokémon object and dynamically creates HTML elements to display the name, front and back images, height, types, and abilities. The modal window is then displayed with the Pokémon's information.

Additionally, the code includes an event listener for the search bar. Whenever a key is pressed, the `keyup` event is triggered, and the application filters the Pokémon list based on the user's search query. The search is case-insensitive, meaning that both uppercase and lowercase characters are matched. The filtered Pokémon list is dynamically updated on the page, showing only the Pokémon that match the search criteria.

Overall, the code for the Pokédex web application effectively retrieves Pokémon data from the PokéAPI, dynamically creates Pokémon cards, allows users to view detailed information, and provides a search functionality for easy navigation through the Pokémon list.
