# Fauna-hello-js

In this tutorial, we will:

## Getting started

1. Install [Node.js](https://nodejs.org/en/download/)

2. Clone this repo

    ```$ git clone https://github.com/FlevianK/Fauna-hello-js.git```

3. Change directory to the tutorial's  root directory

    ```$ cd Fauna-hello-js```

4. Install all the dependencies

    ```$ npm install```

## Creating the databases

1. Create a new cloud key via [this link](https://fauna.com/account/keys)
2. Replace the _'YOUR_FAUNADB_ADMIN_SECRET'_ value on [line 3](https://github.com/FlevianK/Fauna-hello-js/blob/master/index.js#L3) in index.js with your generated key.
3. Run the queries

    ```$ npm start```

4. If successful the output below , will be displayed to your console

```
----------------------------- log the ref ----------------------------------
Ref(id=202025303611015683, class=Ref(id=test, class=Ref(id=classes)))
----------------------------------------------------------------------------
--------------------- log the retrieved instance ---------------------------
[ { ref: Ref(id=202025303611015683, class=Ref(id=test, class=Ref(id=classes))),
    ts: 1528925193282023,
    data: { name: 'alice' } } ]
----------------------------------------------------------------------------
```

You will also be able to see the created databases and the class [Fauna Dashboard](https://dashboard.fauna.com/db)