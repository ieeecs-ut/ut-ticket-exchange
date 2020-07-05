# ticket exchange (skeleton)

Skeleton code for the IEEE CS ticket exchange project.

## how to run

-   Install/setup Node.js & MongoDB
-   Clone this repository
-   Install node modules with `sudo npm i`
-   Ensure the folder `/var/log/mongodb` exists
-   Ensure ports 8000 and 27017 are unused
-   Start MongoDB with configuration
    -   ie. `mongod --config /home/ubuntu/ticket-xc-skel/mongodb/mongo-dev.conf`
-   Start Node.js server
    -   ie. `node tickets.js`
-   Try out CLI example in the node prompt
    -   ie. in same terminal where script is executing and displaying output, type any of the following commands
        -   `testing` or `testing <your_name>` to confirm it is working
        -   `modules` to view the defined available module APIs
        -   `db table <collection/table_name>` to query MongoDB for the contents of a table
        -   `clear` to clear the console
        -   `exit` or `quit` to shut down the server
    -   Observe which modules produce which specific logging messages, which indicates where the conceptual divisions between modules are
-   Try out web example in a browser
    -   Go to `http://localhost:8000`
    -   Try out the GET requests & the MongoDB query POST request
