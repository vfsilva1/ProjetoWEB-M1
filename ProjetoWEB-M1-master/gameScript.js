$(function(){
    var cnv = $('canvas')[0];
    var ctx = cnv.getContext('2d');
    var character = new Image();
    character.src = "sprites-megaman-x.png";
    var cenario = new Image();
    cenario.src = "cenario.png";
    var correndo = new Image();
    correndo.src = "runningMegaman.png";
    var cont = 0;
    
    
    //criando objeto retangulo
    var rectangle = {
        width : 50,
        height : 50,
        x : 50,
        y : 0,
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
            rectangle.speedY -= 40;
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
        
        if(rectangle.y > 450) {
            rectangle.jumping = false;
            rectangle.y = 450;
            rectangle.speedY = 0;
        }
    }
    
    //desenhar elementos do jogo na tela
    function render() {
        //pinta tela de branco
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 800);
        
        //desenha retangulo
        /*ctx.fillStyle = "red";
        ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);*/
        
        //desenha linha
        ctx.fillStyle = "black";
        ctx.fillRect(0, 580, 1000, 7);
        
        
        //desenha o personagem se estiver pulando ou parado
        if(rectangle.jumping == true)
            ctx.drawImage(character, 320, 220, 90, 190, rectangle.x, rectangle.y, 90, 190);
        else if(controller.right) {
            //ctx.drawImage(character, 550, 70, 130, 130, rectangle.x, rectangle.y, 130, 130);
            window.setTimeout(correr(), 1000);
        }
        else
            ctx.drawImage(character, 550, 70, 140, 130, rectangle.x, rectangle.y, 130, 130);
        
    }
    
    function correr() {
        switch (cont) {
            case 0:
                ctx.drawImage(correndo, 0, 0, 130, 145, rectangle.x, rectangle.y, 130, 130);
                break;
            case 1:
                ctx.drawImage(correndo, 130, 0, 85, 140, rectangle.x, rectangle.y, 130, 130);
                break;
            case 2:
                ctx.drawImage(correndo, 215, 0, 95, 140, rectangle.x, rectangle.y, 130, 130);
                break;
                
            case 3:
                ctx.drawImage(correndo, 315, 0, 135, 140, rectangle.x, rectangle.y, 130, 130);
                break;
                
            case 4:
                ctx.drawImage(correndo, 470, 0, 90, 140, rectangle.x, rectangle.y, 130, 130);
                break;
                
            case 5:
                ctx.drawImage(correndo, 565, 0, 100, 140, rectangle.x, rectangle.y, 130, 130);
                break;
            case 6:
                ctx.drawImage(correndo, 675, 0, 140, 140, rectangle.x, rectangle.y, 130, 130);
                break;
        }
        console.log(cont);
        cont++;
        if(cont == 7)
            cont = 0;
    }
    
    setInterval(function() {
        //loop();
    }, 5000);
    //chamando para rodar infinitamente
    loop();
});