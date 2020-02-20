const { connect, connection, connections } = require("mongoose");
const { URL } = require("./config");

connect(URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

connection.on("open", () => {
    const info = connections[0];
    console.log(`Connected to:
     host: ${info.host},
     port: ${info.port},
     name: ${info.name}`)
});
