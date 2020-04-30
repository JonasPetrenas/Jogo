const express = require ('express');
const path = require ('path');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.options('*', cors()); 
app.use(cors());
app.use(express.static(path.join(__dirname, 'arquivos')));
app.set('views',(path.join(__dirname, 'arquivos')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
	res.render('Jogo.html');
});

let player = [], ALTURATELA = 600 , LARGURATELA = 600;
function moveMe(playerM , codSeta)
{
	if(codSeta == 100)
	{
		playerM.x += 20;
	}else if (codSeta == 119){
		playerM.y -= 20;	
	}else if (codSeta == 97){
		playerM.x -= 20;	
	}else if (codSeta == 115){
		playerM.y += 20;	
	}
}
function regras (playerR) {
	if (playerR.x < 50) 
	{
	    playerR.x = 50;
	}
	if (playerR.x > LARGURATELA - 100)
	{
	    playerR.x = LARGURATELA - 100;
	}
	if (playerR.y < 50)
	{
	    playerR.y = 50;
	}
	if (playerR.y > ALTURATELA - 100) 
	{
	    playerR.y = ALTURATELA - 100;
	}
}
    
io.on ('connection', socket => {
	//on ler || emit enviar
	var varTemp =  Math.floor(Math.random() * 10);
	var colorTemp;
	if(varTemp == 0)
		colorTemp = 'blue';
	if(varTemp == 1)
		colorTemp = 'red';
	if(varTemp == 2)
		colorTemp = 'green';
	if(varTemp == 3)
		colorTemp = 'white';
	if(varTemp == 4)
		colorTemp = 'black';
	if(varTemp == 5)
		colorTemp = 'orange';
	if(varTemp == 6)
		colorTemp = 'purple';
	if(varTemp == 7)
		colorTemp = 'gray';
	if(varTemp == 8)
		colorTemp = 'cyan';
	if(varTemp == 9)
		colorTemp = 'brown';
	
	console.log(`Novo usuario conectado:  ${socket.id}`);
	player.push({
		id:socket.id, 
		x:290, 
		y:290,
		cor:colorTemp
	});
	io.emit('enviaTela',player);

	socket.on('movePlayer',move => {
		player.forEach( function( item, index){
			if(item.id == socket.id){
				//player[index].moveMe(move);
				moveMe(player[index],move);
				regras(player[index]);
			}
		});
		//player[0].moveMe(move);
		io.emit('enviaTela',player);
		//console.log (player);
	});
	socket.on('disconnect', () => {
		player.forEach( function( item, index){
			if(item.id == socket.id){
				player.splice(index, 1);
			}
		});
		console.log('disconectado: ' + socket.id);
	});
});

server.listen(7070);
console.log('Servidor Iniciado na porta: '+server.address().port);

