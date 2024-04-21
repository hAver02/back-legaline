
const express = require('express');
const http = require('node:http')
const fs = require('node:fs')
const https = require('node:https');
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const cors = require('cors')
const { Server } = require('socket.io')
const { handleError } = require('./src/middleware/error.handler');
const  { mongoDBconnection } = require('./src/database/mongo.config')
const cookieParser = require('cookie-parser');

const messageRoutes = require('./src/componentes/message/messages.router')
const userRoutes = require('./src/componentes/usuarios/user.router')
const chatRoutes = require('./src/componentes/chat/chat.router')
const casosRoutes = require('./src/componentes/casos/casos.router')
const sessionRoutes = require('./src/componentes/session/auth.route')
const notiRoutes = require('./src/componentes/notificaciones/notificaciones.router')
const controllerMessage = require('./src/componentes/message/messages.controller');
const { config } = require('./src/config/config');

const app = express()
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/srv471383.hstgr.cloud/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/srv471383.hstgr.cloud/fullchain.pem'),
};


const server = https.createServer(options, app);

const PORT = 3000;
//'https://srv471383.hstgr.cloud'
app.use(cookieParser());

app.use(cors({
    origin: config.hostDeploy || 'http://localhost:5173',
    credentials: true
    // methods : ['GET', 'POST', 'DELETE', 'PUT']
}))

app.use(express.urlencoded( { extended : false } ) )

app.use(express.json())

const conectDB = async () => {
    await mongoDBconnection()
}

conectDB()
app.use('/message', messageRoutes)
app.use('/user', userRoutes)
app.use('/session', sessionRoutes)
app.use('/chat', chatRoutes)
app.use('/casos', casosRoutes)
app.use('/notificaciones', notiRoutes)

app.use(handleError)

const io = new Server(server, {
    cors: {
        origin : config.hostDeploy || 'http://localhost:5173',
        methods : ['GET', 'POST'],
        credentials : true
    }
})

io.on('connection', (socket) => {
    console.log('client connected');
    socket.on('message', async (data) => {
        const rta = await controllerMessage.addMessage(data)    
        // VALIDAR RTA
        socket.broadcast.emit('message', rta )

    })
} )



server.listen(PORT, (req, res) => {
    console.log(`Corriendo por el puerto ${PORT}`);
})