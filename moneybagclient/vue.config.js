module.exports = {
    "devServer": {
        "hot": true,
        "host": "0.0.0.0",
        "port": "3000",
        "disableHostCheck": process.env.NODE_ENV === "production" ? false : true,
    }
}