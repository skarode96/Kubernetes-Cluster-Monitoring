const http = require('http');
const fetch = require('node-fetch');
const fs = require("fs");

http.createServer((request, response) => {
  console.log(`Request url: ${request.url}`);

  const eventHistory = [];

  request.on('close', () => {
    closeConnection(response);
  });

  if (request.url.toLowerCase() === '/events') {
    response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    checkConnectionToRestore(request, response, eventHistory);

    sendEvents(response, eventHistory);
  } else {
    response.writeHead(404);
    response.end();
  }
}).listen(5000, () => {
  console.log('Server running at http://127.0.0.1:5000/');
});

services = [{'url':'http://192.168.39.158:30002/api/packets','id':'frontend'},
  {'url':'http://192.168.39.158:30003/api/packets','id':'redisMaster'},
  {'url':'http://192.168.39.158:30004/api/packets','id':'redisSlave'}];

var packets = [];

function sendEvents(response, eventHistory) {
  setInterval(() => {

    if (!response.finished) {

      services.forEach(service => {
        fetch(service.url,{
          mode: "no-cors"})
            .then((r) => r.json())
            .then((r) => {
              const res = 'id: ' + service.id.toString() + '\nevent: packets\ndata: {"id": "'+ service.id.toString() +'" , "state": '+ JSON.stringify(r) +'}\n\n';
              response.write(res);
              packets = packets.concat(r.packets.map(packet => packet.payload).reduce((a, b) => a.concat(b),[]));
            });
        // save_training_packets();
      });
    }
  }, 3000);

}

function save_training_packets() {
  if (packets.length > 10000) {
    fs.writeFile("ML/training_data.js", JSON.stringify(packets), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Output saved to ML/training_data.js");
      }
    });
  }
}

function closeConnection(response) {
  if (!response.finished) {
    response.end();
    console.log('Stopped sending events.');
  }
}

function checkConnectionToRestore(request, response, eventHistory) {
  if (request.headers['last-event-id']) {
    const eventId = parseInt(request.headers['last-event-id']);

    eventsToReSend = eventHistory.filter((e) => e.id > eventId);

    eventsToReSend.forEach((e) => {
      if (!response.finished) {
        response.write(e);
      }
    });
  }
}
