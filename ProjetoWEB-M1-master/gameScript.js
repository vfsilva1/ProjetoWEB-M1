$(function(){
    var cnv = $('canvas')[0];
    var ctx = cnv.getContext('2d');
    //criando objeto retangulo
    var rectangle = {
        width : 50,
        height : 50,
        x : 500,
        y : 100,
        speedX : 0,
        speedY : 0,
        jumping : true
    };
    
    var controller = {
        up : false,
        right : false,
        left : false,
        keyListener : function(event) {
            var key_state = (event.type == "keydown")?true:false;
        
            switch (event.keyCode) {
                case 37: //left key
                    controller.left = key_state;
                    break;
                case 38: //up key
                    controller.up = key_state;
                    break;
                case 39:
                    controller.right = key_state;
                    break;
            }
            
        }
    };
    
    //rodando infinitamente
    function loop(){
        window.requestAnimationFrame(loop, cnv);
        window.addEventListener("keydown", controller.keyListener);
        window.addEventListener("keyup", controller.keyListener);
        update();
        render();
    }
    
    //atualização dos elementos do jogo
    function update(){
        if(controller.up && rectangle.jumping == false) {
            rectangle.speedY -= 30;
            rectangle.jumping = true;
        }
        
        if(controller.left)
            rectangle.speedX -= 0.5;
        
        if(controller.right)
            rectangle.speedX += 0.5;
        
        rectangle.speedY += 1.5;
        rectangle.x += rectangle.speedX;
        rectangle.y += rectangle.speedY;
        rectangle.speedY *= 0.9;
        rectangle.speedX *= 0.9;
        
        if(rectangle.y > 430) {
            rectangle.jumping = false;
            rectangle.y = 430;
            rectangle.speedY = 0;
            console.log(rectangle.jumping);
        }
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
   
    //chamando para rodar infinitamente
    loop();
});