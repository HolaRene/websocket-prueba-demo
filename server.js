import {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({port: 8080})

// 0: Connecting
// 1: Open (Solo si el estado es OPEN se pueden enviar y recibir datos)
// 2: Closing
// 3: Closed

// primer evento: conexión
wss.on("connection", (socket, request)=>{
   const ip = request.socket.remoteAddress

   console.log(`Nueva conexión desde ${ip}`)
    // segundo evento: mensaje
    socket.on("message", (rawData)=>{
        const data = rawData.toString()
        console.log(`Mensaje recibido desde ${ip}: ${data}`)
        console.log({rawData})

        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN) client.send(`Server Broadcast: ${data}`)
        }) 
    })
// evento de error  
    socket.on("error", (error)=>{
        console.error(`Error en la conexión con ${ip}: ${error.message}`)
    })

    // tercer evento: cierre
    socket.on("close", ()=>{
        console.log('Conexión cerrada')
    })

})

console.log('Servidor WebSocket escuchando en ws://localhost:8080')