"use strict"

const net = require('net')
let bytes = 0
let start = 0
const server = net.createServer((socket) => {
    socket.on('data', (data) =>{
        bytes += data.length
        let time = Date.now() // time in milliseconds
        let delta = time - start
        if (delta > 1000) {
            console.log(`${(bytes / (delta * 1000)).toFixed(2)} MB/S`)
            bytes = 0
            start = time
        }
    })
    socket.on('error', (err) => {
        console.log("Server.error:", err)
    })
    socket.on('end', () => {
        console.log("Socket.end")
    })
})
// //TIMER HERE TO DOCUMENT THE RATE OF RECEPTION
// timers.setInterval(() => {
//     receptionRate = receptionCount - previousCount
//     previousCount = receptionCount
//     console.log("\nReception Rate: " + receptionRate)
//     console.log("Reception Count: " + receptionCount)
// }, 1000);

server.on('error', (err) => {
    console.log("server.error", err)
})

server.listen(80,() => {
    console.log('opened server on', server.address())
});