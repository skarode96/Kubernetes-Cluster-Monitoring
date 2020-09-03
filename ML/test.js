
const brain = require('brain.js');
const fs = require('fs');

const input = { L4protocol: null,
    L7protocol: 'TCP',
    dstIP: '10.96.0.1',
    dstMAC: '02:42:ce:b4:e9:2b',
    dstPort: 443,
    owner: 'test',
    payload:
        '<IP  version=4 ihl=5 tos=0x0 len=40 id=0 flags=DF frag=0 ttl=64 proto=tcp chksum=0x8456 src=172.17.0.8 dst=10.96.0.1 |<TCP  sport=44294 dport=https seq=3696699395 ack=0 dataofs=5 reserved=0 flags=R window=0 chksum=0x464a urgptr=0 |>>',
    size: 54,
    srcIP: '172.17.0.8',
    srcMAC: '02:42:ac:11:00:08',
    srcPort: 44294,
    timestamp: 1597072747,
    ttl: 64 }

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
