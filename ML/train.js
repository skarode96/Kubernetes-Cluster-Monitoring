const brain = require('brain.js');
const net = new brain.NeuralNetwork();
const fs = require('fs');

async function main() {

    fs.readFile("ML/training_data.js", function (err,data) {
            if (err) {
                return console.log(err);
            }
            data = JSON.parse(data);
            data  = data.slice(0,5000);

            let mapped_data = transformInputData(data);

            net.train(mapped_data);

            fs.writeFile("ML/model.js", JSON.stringify(net.toJSON()), function(err) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Output saved to ML/model.js");
                }
            });
        });
}


function map(packet) {
    return {size: packet.size, srcPort: packet.srcPort, dstPort: packet.dstPort}
}


function transformInputData(data) {
    return data.map(packet => {
        if (packet.dstPort === 22 || packet.dstPort === 443) {
            return {input: map(packet), output: {attack: 1, safe: 0}};
        }

        else {
            packet.blacklist = false;
            return {input: map(packet), output: {attack: 0, safe: 1}};
        }
    }).reduce((a, b) => a.concat(b), []);
}

main();


