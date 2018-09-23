$(function(){
    var cnv = $('canvas')[0];
    var ctx = cnv.getContext('2d');
    //criando objeto retangulo
    var rectangle = {
        width : 50,
        height : 50,
        x : 500,
        y : 430,
        speedX : 1,
        speedY : 1
    };
    
    //rodando infinitamente
    function loop(){
        window.requestAnimationFrame(loop, cnv);
        //checa se a tecla foi apertada
        window.addEventListener("keyup", checkKeyPress, false);
        update();
        render();
    }
    
    //atualização dos elementos do jogo
    function update(){
       
    }
    
    //desenhar elementos do jogo na tela
    function render() {
        //pinta tela de branco
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 500);
        
        //desenha retangulo
        ctx.fillStyle = "red";
        ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        
        //desenha linha
        ctx.fillStyle = "black";
        ctx.fillRect(0, 480, 1000, 7);
    }
    
    function checkKeyPress(key) {
        //seta para cima
        if(key.keyCode == "38"){
            rectangle.y -= 20;
        }
    }
    //chamando para rodar infinitamente
    loop();
});