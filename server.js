const express = require('express');
const app = express();
const server = require('http').Server(app);
//libreria para las fechas y horarios
const moment = require('moment');
const fs=require('fs');


// le pasamos la constante http a socket.io
const io = require('socket.io')(server);

let producto=require('./productos');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

let messages = []

// Motor de plantilla
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('index')
});

//cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', socket => {
    console.log('usuario conectado');
    //lista de productos en la tabla
    socket.on('producto', data => producto.nuevoProducto(data));
    io.sockets.emit('productos',{productos: producto.listaProductos} );
    //canal de chat
    socket.emit('messages', messages);
    socket.on('new-message', function(dato){
        dato.date = moment().format('LLLL')
        messages.push(dato);
        fs.promises.writeFile('chat-historial.txt', JSON.stringify(messages), 'utf-8');
        io.sockets.emit('messages', messages);
    });
})


server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
