const http = require('http')
const express = require('express')
const soketio = require('socket.io')
const RPSGame = require('./rps-game-logic')
var expressLayouts = require('express-ejs-layouts')
const routes = express.Router();


const app = express()

app.set('view engine', 'ejs')

app.use(expressLayouts);
app.use( express.static( "src" ) );

app.use ('/', require('./routes/index.js'))


const server = http.createServer(app)
const io = soketio(server)
let watingPlayer = null

io.on('connection',(sock)=>{
    if(watingPlayer){
        new RPSGame(watingPlayer,sock)
        watingPlayer=null
    }
    else{
        watingPlayer = sock
        watingPlayer.emit('message', 'Wating for a aponent')
    }
    sock.on('message',(text)=>{
        io.emit('message',text)
    })
    sock.on('display_left',(text)=>{
        io.emit('display',text)
    })
    sock.on('display_right',(text)=>{
        io.emit('display',text)
    })
    sock.on('display_right',(text)=>{
        io.emit('display',text)
    })
    sock.on('scor',(text)=>{
        io.emit('display',text)
    })

})
 

PORT= 8080
server.on('error',(err)=>{
    console.error('Server error ', err)
})
server.listen(PORT,()=>{
    console.log(`RPS started on ${PORT}`)
})