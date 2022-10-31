## Description

Pets Auction app allows users bid on certain pet with amount of money.

features:

- Add a new bid
- List all bids for pet owner

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# Run tests
$ yarn run test

# test coverage
$ npm run test:cov
```

## Docker

```bash
# Run docker images for both database and app
$ docker compose up
```

## User Authentication

##### Users authenticated by passing an apiKey in the header `"apikey": "value"` to verify the user data and the authorizability to use the serivces

## Http Requests (GET /bids/{petId}/winner?, POST /bids/{petId} )

#### GET list all bid of pet by pet owner

<br>
Http Request: <code>http://localhost:4000/bid/{petId}</code>
<br>
Header: ['api_key'] = {owner of pet apiKey}
<br>
Response:
<pre>
<code>
[
         {
            "name": "john zakria",
            "value": 150
        },
        {
            "name": "john dear",
            "value": 150
        },
        {
            "name": "sara",
            "value": 500
        },
]
</code>
</pre>

##### If you add a {winner} params to the endpoint, Generalized-second-price auction applied to the data.

Http Request: <code>http://localhost:4000/bid/{petId}/winner</code>
<br>

<pre>
<code>[
{
"name": "sara",
"value": 150
},
{
"name": "john dear",
"value": 150
},
{
"name": "john zakria",
"value": -1 => 'lost'
},
]
</code>
</pre>

<br>
#### POST a bid by a user to a certain pet

<br>
Http Request: <code>http://localhost:4000/bid/{petId}</code>
<br>
Header: ['api_key'] = {owner of pet apiKey}
<br>
Request Body:
<pre>
<code>
{
    "name": "Adam youssef",
    "value": 344
}
</code>
</pre>

<br>
Response:

<pre>
<code>
    {
      "name": "Adam youssef",
      "value": 344
    }
</code>
</pre>
