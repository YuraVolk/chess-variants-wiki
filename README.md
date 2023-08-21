![Gradle Build](https://github.com/YuraVolk/chess-variants-wiki/actions/workflows/gradle-build.yml/badge.svg)
# Chess Variants Wiki

A highly customizable library aimed at support of various chess variants.
This library is capable of generating legal moves, processing and loading games, rendering boards for arbitrary chess variants, supporting up to 14x14 board size and up to 4 players. The project supports variant configuration through variant rules and FEN data tags, as well as game metadata information and basic computer-controlled players capable of playing every variant possible to define through built-in variant rules.

The application is structured in three logical layers:
1. Move generation layer. Generates and validates the legal moves, is the core move generation engine.
2. Board rendering layer. Users move generation layer, React and Redux to render game boards.
3. Page serving layer. Uses the above two layers and a Markdown parser to render the whole page.

## Running Locally

You can run this project either through Java or through Webpack with a static page in case you do not have / are unable to install Java and Gradle and execute this method.
```sh
$ git clone https://github.com/YuraVolk/chess-variants-wiki
$ cd chess-variants-wiki
```

### Running with Java and Gradle

Make sure you have Java and Gradle installed, these are required to run the application through this method. 
Run:
```sh
$ gradle bootRun
```
Or if you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed:
```sh
$ heroku local web
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

### Running through Webpack statically

Run:
```sh
$ npm install
$ npm run static
```

Your app should now be running on [http://127.0.0.1:5000/src/main/resources/public/index.html](http://127.0.0.1:5000/src/main/resources/public/index.html).
