# Replace your REST API with GraphQL

Run the presentation by changing into this directory and then running.

```
yarn install
yarn run start
```

The presentation should then be available at `localhost:5000`.

Within the `examples` directory you'll find `breadit` and `breadit_app`.

`breadit` is a Rails application with a very simple data modal that has and HTML frontend and a GraphQL API.

`breadit_app` is a tiny React-Native app that was live-coded during the meetup to pull and dispaly data from the GraphQL API.
The Rails server must be running for data to be pulled by the app.
