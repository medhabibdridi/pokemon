# Pokémon Angular App

This is a minimalist, responsive Angular web app that displays a paginated list of Pokémon with images, details. It uses Angular 20+, Angular Material, and the public [PokeAPI](https://pokeapi.co/).

## Features

- Browse Pokémon in a paginated, scrollable grid
- View detailed info for each Pokémon
- Responsive, clean Material Design UI
- Handles missing images and long names gracefully
- Clickable app title to return to the main list
- Minimal Unit tests for components and service
- Lightweight state management with signals 

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/medhabibdridi/pokemon.git
   cd pokemon
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm start
```

Then open [http://localhost:4200/](http://localhost:4200/) in your browser.

### Running Tests

To run unit tests:

```bash
npm test
```

This will launch the Angular test runner and execute all unit tests for components and services.

## Project Structure

- `src/app/components/pokemon-list/` — Main Pokémon list/grid
- `src/app/components/pokemon-details/` — Pokémon details page
- `src/app/services/pokemon.service.ts` — API integration
- `src/app/models/` — TypeScript interfaces
- `src/app/utils/` — Contains reusable functions 

## Demo 

https://jumpshare.com/share/GcuJ4RFPCv8jcvrjwwR5
