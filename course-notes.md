![Advanced React + GraphQL](https://advancedreact.com/images/ARG/arg-facebook-share.png)

# Advanced React + GraphQL

## Introduction and Setup
These are the starter files and stepped solutions for the [Advanced React and GraphQL](https://AdvancedReact.com) course by Wes Bos. 

### Getting Help

The best place to get help is in the #advanced-react slack room - there is a link in your course dashboard. 

### FAQ

**Q:** Which Extensions for VS Code is Wes using?
**A:** All my extensions are listed on my dotfiles repo → https://github.com/wesbos/dotfiles but specifically this course uses [ESLint](https://github.com/Microsoft/vscode-eslint), [Prettier](https://github.com/prettier/prettier-vscode)

### Tech Stack
#### React.js
For building the Interface along with:
* **Next.js** for server side rendering, routing, and tooling. It also handles webpack, bundling and tooling.
* **Styled Components** for styling
* **React-Apollo** for interfacing with Apollo Client

### Apollo Client
For Data Management
* Performing GraphQL **Mutations**
* Fetching GraphQL **Queries**
* **Caching** GraphQL Data
* Managing **Local State**
* **Error** and **Loading** UI States
* Apollo Client replaces the need for redux + data fetching/caching libraries


### GraphQL Yoga
An Express GraphQL Server For:
* Implementing **Query and Mutation Resolvers**
* Custom **Server Side Logic**
* **Charging** Credit Cards with Stripe
* **Sending** Email
* Performing **JWT Authentication**
* Checking **Permissions**

An express server that sits in front of prisma. We can use Yoga to massage the data before Prisma uses it. Logic for data will happen here.

Yoga is good for authentication, security, custom logic.

### Files

Prisma
* **datamodel.prisma** - data model for prisma. Any time you make an edit to this file you need to run `npm run deploy`. This will also generate the file `prisma.graphql`.
* **prisma.graphql** - is a generated file that contains the API.

* **schema.graphql** - Public facing API



### Prisma
A GraphQL Database Interface
* Provides a set of GraphQL **CRUD APIs** for a MySQL, Postgres or MongoDB **Database**
* **Schema** Definition
* Data **Relationships**
* **Queried** Directly from our Yoga Server
* **Self-hosted** or **as-a-service**

We will be using MySQL but we won't be writing SQL. We will use Prisma to interact with the DB.

Prisma you provide it a data model and it will provide or generate a set of APIs for you.

### Setup Next.js
* Next.js is a lightweight framework.
* Handles server side rendering
* Provides this thing called `getInitialProps` that allows you to fetch data on the server. On the server, it can wait for the data to resolve before it ships the page.

#### Routing
Any page inside of `pages` direction will be a page in your site. Next will automatically set-up routing.

#### Links

```js
import Link from 'next/link';

const Home = (props) => (
  <div>
    <p>Hey!</p>
    <Link href="/sell">
      <a>Sell!</a>
    </Link>
  </div>
)

export default Home;
```

#### Custom \<App\>
Next by default wraps your applicatin in an \<App\> module to get you going but you can have your own custom <App>. This is good for when you want to have a global header for example.


```js
// frontend/pages/_app.js
import App, { Container } from 'next/app';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        I'm on every page
        <Component />
      </Container>
    )
  }
}

export default MyApp;
```

#### Meta Data
```js
import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
  </Head>
);

export default Meta;
```


### CSS and Styled Components

```js
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
`;
const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const MyButton = styled.button`
  background: ${(props) => props.theme.red};
  font-size: ${(props) => (props.huge ? '100px' : '50px')};
  .poop {
    font-size: 100px;
  }
`;
<ThemeProvider theme={theme}>
  <MyButon huge>
    Click Me <span className="poop">Poop</span>
  </MyButon>
</ThemeProvider>
```

If you need to reuse a styled component you can seperate it into its own file. You can create a `styles` folder inside of your `components` folder.
#### Nprogress
```js
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};
```
#### Styled Components on the server
Next has solved this issue with getInitialProps lifecycle and a custom document.
https://github.com/zeit/next.js/#custom-document

You will need a file called `_document.js` with the following code
```js
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```
This was pretty much copied from the documentation.


### Server Side GraphQL
#### An intro to GraphQL
GraphQL is a specification to implement both a server in GraphQl to serve up date as well as to fetch data from the client. 

Your server can implement GraphQL in any language.

GraphQL makes it so that you don't have to remember all the tokens the API accepts and also so that you don't get data that you don't need.

Can replace REST or can sit in front of a REST API.

##### Important Concepts
GraphQL is a single endpoint that you hit. A REST API would have many different endpoints.

Demo of a simple query:
```
query {
  items {
    id
    title
  }
  users {
    name
  }
}
```
It's also self-documenting.

You will need to have a file `.graphql`. GraphQA is a typed language. You need to specifically define what type of everything is going to be.

```json
// datamodel.graphql
type Item {
  id: ID! @unique
  title: String!
  description: String!
  createdAt: DateTime!
}
```

##### Relationships
Every item has a user

```json
query {
  items {
    title
    user {
      name
      id
    }
  }
}
```

Another relationship is that a user will also have orders and a cart.

```json
query {
  items {
    title
    user {
      name
      id
      cart {
        quantity
        item {
          title
        }
      }
    }
  }
}
```

##### Conditional Queries
Conditionals in queries like the code below is using Prisma, it is not a GraphQL standard. By default GraphQL has no filtering or sorting. GraphQL is just a way to vocalize what you want and that gets passed to your server and the server implements these things called  `resolvers`. Resolvers answer the question how and where do I get this data from. Then, that's where you end up using GraphQL or MongoDB, ect.

GraphQL does not replace those databases. It's simply a standard to request specific data.

```js
query {
  items(where: {
    title_contains: "belt"
  }) {
    title
  }
}
```

`belt` string must be in `"` not `'`

#### Getting Setup with Prisma
Prisma Tagline: `Build a GraphQL server with any database`

We are going to be building a GraphQL server that we can interface with our React Application. 

Prisma sits on top of a database and provides you with a full-featured GraphQL API. We can use to perform all of our CRUD operations, relationships, data updating.

https://www.prisma.io/ offers a demo server. Create an account.

Globally install prisma
`npm i -g prisma`

`prisma login`
`prisma init` it will ask you a few questions

That will generate 2 files with configuration that you will need to update.

```
.graphqlconfig.yml
datamodel.prisma
```

After you're done run:
`prisma deploy`

This will generate the file `src/generated/prisma.graphql` which is the API. In prima file comments are written with 3 quotes: `"""`

##### Anatomy of a data modal

`type`, `fields`, `type of field`, `@directives`

In the code below: User is the `type`. id, name, and email are the `fields`. ID and String are types of the fields. The @unique is the directive. Directives are implemented by GraphQL server.
https://graphql.org/learn/queries/#directives

```
type User {
  id: ID! @unique
  name: String!
  email: String!
}
```

https://graphql.org/learn/schema/#scalar-types

Prisma will expose a datetime for when it was created and last updated.

Exclamation mark means required.

If you need an array of strings you can put a bracket around the String type.

Ex, 
```
type User {
  id: ID! @unique
  name: String!
  email: [String]!
}
```

If you want both the Array and a String to be required do the following:

Ex, 
```
type User {
  id: ID! @unique
  name: String!
  email: [String!]!
}
```

Once you've made update to the file datamodel.graphql run the following command to take effect: `npm run deploy`

```
type User {
  id: ID! @Unique @id
  name: String!
  email: String!
  updatedAt: DateTime! @updatedAt
  createdAt: DateTime! @createdAt
}
```

In terminal you will be given a link to the playground. You can run mutations,
Ex,
```
mutation {
  createUser(data: {
    name: "Walter Tlatenchi"
    email:"WaltTheMan@gmail.com"
  }) {
    name
    email
  }
}
```
and query:

```
query {
  users {
    id
    name
  }
}
```

Query for name containing "wes"
```
query {
  users(where: {
    name_contains:"wes"
  }) {
    id
    name
  }
}
```

```
query {
  usersConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    aggregate {
      count
    }
  }
}
```

#### Getting our GraphQL Yoga Server Running
Create the following file:
`src/db.js`

Logic has to how the app will run:
React will use Apollo client to query GraphQL Yoga endpoint. On the server GraphQL Yoga is going to connect with Prisma database and pull the data back and forth.

In order to set-up the connection between yoga and Prisma we will use `prisma-binding` node module.

Tagline: "GraphQL Binding for Prisma services"

It allows you to set-up a JS connection to Prisma so that you can now run all the scripts that we were allowed to run in the playground but now is JS.

We will be able to connect to our DB and then run queries. 

https://github.com/prisma/prisma-binding

Ex, 
```js
// Instantiate `Prisma` based on concrete service
const prisma = new Prisma({
  typeDefs: 'schemas/database.graphql',
  endpoint: 'https://us1.prisma.sh/demo/my-service/dev',
  secret: 'my-super-secret-secret'
})

// Retrieve `name` of a specific user
prisma.query.user({ where: { id: 'abc' } }, '{ name }')

// Retrieve `id` and `name` of all users
prisma.query.users(null, '{ id name }')
```

Now we need to create a yoga server.
Create a file called createServer.js
Here we will import graphQL Yoga.


#### Our first Query and Mutation
GraphQL playground has its own OS if you'd like to download: https://github.com/prisma/graphql-playground

Anything that you want visible in you API needs to go in your schema file: `schema.graphql`.

If you need an object in your schema like an array of objects you first need to define a type:

```
type Dog {
  name: String!
}

type Query {
  dogs: [Dog]!
}
```

`Dog!` means we can't return null for any item
so `[{name:'Snickers'}]` is valid
so `[{name: 'Snickers', null}]` is not

Whenever you set-up a query you must also set-up a resolver. A resolver asks the question where does this data come from or how do we get it to the end user.

We will update the Query.js file:

```js
// src/resolvers/Query.js
const Query = {
  dogs(parent, args, ctx, info) {
    return [ { name: 'Snickers' }, { name: 'Sunny' } ];
  }
};

module.exports = Query;
```

Each function will have a signature of 4 variables.

 1. **parent** - The parent schema in GraphQL
 2. **args** - arguments that have been passed to the query.
 3. **ctx** - the context in the request, which was defined in `createServer.js` we expose the db and request.
 4. **info** - we get a lot of info around GraphQL query that's coming in.

 *db* is how we expose the prisma db to ourselves. data ex, `ctx.db`

We will need a method for every single query that is in `datamodel.prisma`.

In the example above we are hardcoding the return values but in a production scerio we would be connecting to a DB.

We will return either a query or a mutation.

We will need to update the Mutation file

```js
// src/resolvers/Mutation.js
const Mutations = {
  createDog(parent, args, ctx, info) {
    // create a dog!
    console.log(args);
  }
};

module.exports = Mutations;
```

#### Items Cretion and Prisma Yoga Flow

This video section will describe how to add a new piece of data to your backend. Ex, adding a new type data.

First we will open `datamodel.graphql` and make updates. That file is the data model for Prisma only. Any time you change that file you will need to deploy to Prisma.

`npm run deploy`

##### Writing our first mutation

First, update your `datamodel.prisma` the push it up `npm run deploy`.

You can see the the queries and mutations in `prisma.graphql` but you will need to expose them or call on to them individually.

Then update `schema.graphql`. This file will be seperated into Mutations and Queries. This is our front-facing API or what our react application will interact with.

```graphql
# import * from './generated/prisma.graphql';

type Mutation {
  createItem(
    title: String
    description: String
    price: Int
    image: String
    largeImage: String
  ): Item!
}

type Query {
  items: [Item]!
}

```

Then create the Mutation.

```js
// Mutation.js
const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  }
};

module.exports = Mutations;

```

Create the query.

```js
// Query.js
const Query = {
  async items(parent, args, ctx, info) {
    const items = await ctx.db.query.items();
    return items;
  }
};

module.exports = Query;
```

Or instead of the code above, you can use a shortcut if you don't need any validation and you just want to pass the data from yoga to prisma. If your query is exactly the same in Yoga and prisma do the following:

```js
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db')
};

module.exports = Query;
```

### Client Side GraphQL

#### Setting Up Apollo Client with React


Apollo replaces the functionality of Redux.

```js
// lib/withData.js.
// withApollo gives us a HOC that will expose our ApolloClient.
// Apollo Client is like our DB for the client. It will expose
// that Client via a prop.  This package also helps us with
// server side rendering.
import withApollo from 'next-with-apollo';
// Apollo boost is a dependency that brings in other depencies
// that are commonly used with Apollo
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    // This is kind like our middlewear for every request we are
    // including our credentials. When you make a request if
    // you have any logged in cookies in the browser those
    // cookies are going to "come along for the ride".
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);

```

Next, update App.js. We will connect apollo to our app.

A lot of the code below will come from the apollo documentation.
```js
import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
  // This function will run first before the render function
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    // This condition code makes sure to crawl every single page
    // for any queries or mutations that need to be fetch. All
    // of those queries will fire off and resolve before we load
    // the page.
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;

    // Whatever we turn will be expose via props. This will
    // return all the data that was previously fetched.
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
```
You can install the [Apollo dev tools chrome extension](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US)

#### React Meets GraphQL

Below we show what a basic query looks like. We wan to make sure to also have an error and loading in case it fails.

```js
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


// write the query as a string
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

class Items extends Component {
  render() {
    return (
      <div>
        <p>Items!</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            console.log(data);
            return <p>I found {data.items.length} Items!</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default Items;

```

### Creating Items with Mutations

Query is when you pull data. Mutation is when you push and make a change.

* First create a form and save all values to local state
* Write a query that's going to submit the data
* Expose that query's function to our for tag via a mutation component

This is our query for the mutation. It looks weird but essentially we're createing a function like mutation that takes in arguments and we specify the arguments data type and if it's required. The name of the mutation `createItem` comes from the backend file `scheme.graphql`. `CREATE_ITEM_MUTATION` is a custom arbitrary name that we gave our query. In the `createItem` we are defining the values with the values in the parameters, ex `$title`. We then will return only the `id`.

```js
export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String!
    $largeImage: String!
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;
```

To expose the `CREATE_ITEM_MUTATION` function we need to wrap the form tag in a mutation component.

```js
<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
  {(createItem, { loading, error })=>
    (
    // Form goes here
    )
  }
</Mutation>
```

Look at file: CreateItem.js (frontend) as an example

### Uploading Images

We will be using Cloudinary.com as our image host.

JSX

Added an input of type file with an onchange event.

```js
<label htmlFor="file">
  Image
  <input
    type="file"
    id="file"
    name="file"
    placeholder="Upload an image"
    required
    onChange={this.uploadFile}
  />
  {this.state.image && (
    <img
      width="200"
      src={this.state.image}
      alt="upload preview"
    />
  )}
</label>
```

Event handler - Uploads image to cloudnary.com
```js
uploadFile = async (e) => {
  const files = e.target.files;
  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'sickfits');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/di1s7pwmw/image/upload',
    {
      method: 'POST',
      body: data
    }
  );

  const file = await res.json();
  console.log(file);
  this.setState({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url
  });
};
```

### Updating Items with Queries and Mutations

We need to go back to the backend file `schema.graphql` and add `updateItem` in Mutation and `item` in Query.

```graphql
# Below, title, description, and price are optional because
# we could update one thing at a time and not all at once.
type Mutation {
  ...
  updateItem(
    id: ID!,
    title: String,
    description: String,
    price: Int
  ): Item!
}
# Below, Item is optional because there is a chance that no
# item is found with the id in that case we return empty
type Query {
  ...
  item(where: ItemWhereUniqueInput!): Item
}
```

Now we need to write resolvers for both our `updateItem` and `item`. Open the file on your backend `Query.js`

There is no actual validation that we need to we're just forwarding that directly to the database.

```js
// Query.js
const Query = {
  ...
  item: forwardTo('db')
};
```

Test the query on playground to make sure everything is working correctly. Visit http://localhost:4444 open a new tab and enter the following
```graphql
query SINGLE_ITEM {
  item(where:{id:"cjyxxh0y32i750b88e99tkgki"}) {
    title
    description
    id
  }
}
```

Now we need to write a resolver for update item. On backend, open `Mutation.js`

```js
const Mutations = {
  ...
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };

    // remove the Id from the updates because
    // it is not something we should be updating
    delete updates.id;

    // run the update method
    // look at `prisma.graphql` for available functions
    // there you'll find `updateItem()` with the
    // arguments that it needs
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};
```

`UpdateItem()` takes in 2 arguments, you can see that in backend file `prisma.graphql`, the data you want to update and the where. `info` contains the query that we send it from the client side.

Next we will need to work on the front-end.

Duplicate the file `Item.js` and name it `UpdateItem.js` remove code that you don't need and rename.

**Need to take notes**

### Deleting Items