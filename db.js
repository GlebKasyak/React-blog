const { connect, connection, connections } = require("mongoose");
const { URL } = require("./config");

connect(URL, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

connection.on("open", () => {
    const info = connections[0];
    console.log(`Connected to ${info.host}: ${info.port}: ${info.name}`)
});
