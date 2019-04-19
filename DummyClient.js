const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const net = require('net')
const socket = net.createConnection({port: 80})
socket.on('data', (data) => {
    console.log(data.toString())
})
let wordList = ["apple", "frank", "chum", "bucket", "agile"]
let foodList = ["chinese", "french", "indian", "fast", "italian"]
let languages = ["english", "pig", "gaelic", "italian", "french"]
let data = {
    "name": wordList[Math.floor(Math.random() * wordList.length)],
    "food": foodList[Math.floor(Math.random() * foodList.length)],
    "language": languages[Math.floor(Math.random() * languages.length)],
    "toes": Math.floor(Math.random() * 10),
    "fingers": Math.floor(Math.random()* 10)
}
let message = ""
for (let i = 0; i < 500; i++) {
    message += JSON.stringify(data) + ","
}
// console.log(message)
//convert to JSON

let count = 0;
function send() {
    socket.write(message, "utf8", (err) => {
        if (err == null) {
            count++;
            if (count % 10000 === 0) {
                console.log(`Sent ${count}`)
            }
            send()
        }
    })
}

send()

    //No longer required to take user input
// rl.on('line', (input) => {
//     socket.write(input + "\r\n")
// })
//How to manually connect to server
// telnet localhost 80