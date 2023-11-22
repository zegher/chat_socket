module.exports.go = (server) => {
    const Primus = require('primus');
    const primus = new Primus(server, { 
        transformer: 'websockets' 
    });

    // check if primus connection is ok, then console.log it
    primus.on('connection', function (spark) {
        console.log('connection ok');


        //check if data received from client is ok, then console.log it
        spark.on('data', function (data) {
            console.log('data received from client: ' + data.action + ' ' + data.message);

            if(data.action === "newMessage"){
                primus.write({
                    action: "newMessage", 
                    data: data.message,
                })
            }
        });
    });

    
};