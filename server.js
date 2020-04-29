const express = require ('express');
const path = require ('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views',(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
	res.render('index.html');
});

io.on ('connection', socket => {
	//on ler || emit enviar
	console.log(`Novo usuario conectado:  ${socket.id}`);

});

server.listen(3000);
console.log('Servidor Iniciado na porta: '+server.address().port);
