//======================== VARS =============================
var canvas, ctx, ALTURA, LARGURA, frames = 0 , players = [];
var socket;

var arena = {
    cor: "#d3d3d3",

    desenha: function () {
        ctx.fillStyle = this.cor;
        ctx.fillRect(50, 50, LARGURA - 100, ALTURA - 100);
    }
},
    paredes = {
        cor: "#000000",
        desenha: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(0, 0, LARGURA, ALTURA);
        }
};

//================ MAIN ===============================
function main() {
    socket = io('http://25.144.115.247:7070');
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if (LARGURA >= 500) {
        ALTURA = 600;
        LARGURA = 600;
    }
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("keypress", clique);
    
    //socket.emit('requestTela');
    socket.on('enviaTela', function(dados){ //resposta
        players = dados;
        console.log(players);
    });

    rodar();
}
//====================FUNÇÕES=======================
function desenhaJogador(player) {
            ctx.fillStyle = player.cor;
            ctx.fillRect(player.x, player.y, 50,50);
        }
function clique(event) {
    socket.emit('movePlayer', event.keyCode);
}

function rodar() {
    atualiza();
    desenha();

    window.requestAnimationFrame(rodar);
}

function atualiza() {
    if(socket.connected == false)
    {
        players = [];
    }
    //player.atualiza();
    frames++;

}

function desenha() {
    paredes.desenha();
    arena.desenha();
    //----------DESENHA PLAYERS ---------
    players.forEach( function (player){
      desenhaJogador(player); 
    });
        
}
//=====================EXECUTA====================
main();