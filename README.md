![Gradle Build](https://github.com/YuraVolk/chess-variants-wiki/actions/workflows/gradle-build.yml/badge.svg)
![Docker Image](https://github.com/YuraVolk/chess-variants-wiki/actions/workflows/docker-image.yml/badge.svg)
[![codecov](https://codecov.io/gh/YuraVolk/chess-variants-wiki/graph/badge.svg?token=R9I7ISNHJ4)](https://codecov.io/gh/YuraVolk/chess-variants-wiki)
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

### Running with Docker
You will need to initialize four environment variables: MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER, JWT_SECRET, MAIL_USERNAME, MAIL_PASSWORD and DOMAIN_NAME.

```sh
docker build -t chess-variants-wiki .
docker run -p 10000:10000 --name ChessVariantsWiki chess-variants-wiki
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

### Running with Java and Gradle
Make sure you have Java and Gradle installed, these are required to run the application through this method.
You will need to initialize four environment variables: MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER, JWT_SECRET, MAIL_USERNAME, MAIL_PASSWORD and DOMAIN_NAME.
Run:
```sh
$ gradle bootRun
```

Your app should now be running on [localhost:10000](http://localhost:10000/).

### Running through Webpack statically

Run:
```sh
$ npm install
$ npm run static
```

Your app should now be running on [http://127.0.0.1:5000/src/main/resources/public/development.html](http://127.0.0.1:5000/src/main/resources/public/development.html).
