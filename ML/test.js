
const brain = require('brain.js');
const fs = require('fs');

const input = {
    "L4protocol": null,
    "L7protocol": "TCP",
    "dstIP": "172.17.0.8",
    "dstMAC": "02:42:ac:11:00:08",
    "dstPort": 3000,
    "owner": "test",
    "payload": "<IP  version=4 ihl=5 tos=0x0 len=60 id=46152 flags=DF frag=0 ttl=63 proto=tcp chksum=0x2f48 src=172.17.0.1 dst=172.17.0.8 |<TCP  sport=54732 dport=3000 seq=1063891534 ack=0 dataofs=10 reserved=0 flags=S window=64240 chksum=0x585a urgptr=0 options=[('MSS', 1460), ('SAckOK', b''), ('Timestamp', (4207737050, 0)), ('NOP', None), ('WScale', 7)] |>>",
    "size": 74,
    "srcIP": "172.17.0.1",
    "srcMAC": "02:42:52:84:be:96",
    "srcPort": 54732,
    "timestamp": 1597017089,
    "ttl": 63
}

async function main() {

    fs.readFile("ML/model.js", function (err,data) {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        const net = new brain.NeuralNetwork().fromJSON(data);
        let result = net.run(map(input));
        console.log(result);
    });
}

function map(packet) {
    return {size: packet.size, srcPort: packet.srcPort, dstPort: packet.dstPort}
}

main();
