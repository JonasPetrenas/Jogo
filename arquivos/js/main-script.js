var request = $.ajax({
    url: "TesteJog.php",
    type: "POST",
    data: "campo1=dado1",
    dataType: "html"

}).done(function (resposta) {
    alert(resposta);

}).fail(function (jqXHR, textStatus) {
    console.log("Request failed: " + textStatus);

}).always(function () {
    console.log("completou");
});

//var
var canvas, ctx, ALTURA, LARGURA, frames = 0;

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
    },
    player = {
        playerID: Math.random() * 100,
        cor: "#ff0000",
        playerX: 60,
        playerY: 60,
        playerAltura: 50,
        playerLargura: 50,

        moves: function (direc) {
            if (direc == 100) {
                this.playerX += 20;
            } else if (direc == 97) {
                this.playerX -= 20;
            } else if (direc == 115) {
                this.playerY += 20;
            } else if (direc == 119) {
                this.playerY -= 20;
            }
        },
        atualiza: function () {
            if (this.playerX < 50) {
                this.playerX = 50;
            }
            else if (this.playerX > LARGURA - this.playerLargura - 50) {
                this.playerX = LARGURA - this.playerLargura - 50;
            } else if (this.playerY < 50) {
                this.playerY = 50;
            }
            else if (this.playerY > ALTURA - this.playerAltura - 50) {
                this.playerY = ALTURA - this.playerAltura - 50;
            }
        },
        desenha: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.playerX, this.playerY, this.playerLargura, this.playerAltura);
        }
    };

function clique(event) {
    player.moves(event.keyCode);
}

function main() {
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

    rodar();
}

function rodar() {
    atualiza();
    desenha();

    window.requestAnimationFrame(rodar);
}

function atualiza() {
    player.atualiza();
    frames++;
}

function desenha() {
    paredes.desenha();
    arena.desenha();
    player.desenha();
}

main();