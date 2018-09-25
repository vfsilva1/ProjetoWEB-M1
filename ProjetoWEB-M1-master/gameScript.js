$(function(){
    var cnv = $('canvas')[0];
    var ctx = cnv.getContext('2d');
    var cenario = new Image();
    cenario.src = "cenario.png";
    var correndo = new Image();
    correndo.src = "megamanCorrendo.png";
    
    
    //criando objeto retangulo
    var megaman = {
        img : new Image(),
        width : 150,
        height : 150,
        x : 50,
        y : 0,
        speedX : 0,
        speedY : 0,
        jumping : true
    };
    
    //coordenadas da sprite
    var srcX;
    var srcY;
    //tamanho da sprite
    var spriteWidth = 1200;
    var spriteHeight = 172;
    
    var cols = 6;
    var frameWidth = spriteWidth / cols;
    var frameHeight = 172;
    var currentFrame = 0;
    
    var cont = 1;
    function updateFrame() {
        currentFrame = ++currentFrame % cols;
        srcX = currentFrame * frameWidth;
        srcY = 0;
        
    }
    
    function drawRunning(){
        updateFrame();
        ctx.drawImage(correndo, srcX, srcY, frameWidth, frameHeight, megaman.x, megaman.y, megaman.width, megaman.height);
        console.log(cont);
    }
    
    megaman.img.src = "sprites-megaman-x.png";
    
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
        if(controller.up && megaman.jumping == false) {
            megaman.speedY -= 50;
            megaman.jumping = true;
            
        }
        
        if(controller.left)
            megaman.speedX -= 0.5;
        
        if(controller.right)
            megaman.speedX += 0.5;
        
        megaman.speedY += 1.5;
        megaman.x += megaman.speedX;
        megaman.y += megaman.speedY;
        megaman.speedY *= 0.9;
        megaman.speedX *= 0.9;
        
        if(megaman.y > 450) {
            megaman.jumping = false;
            megaman.y = 450;
            megaman.speedY = 0;
        }
    }
    
    //desenhar elementos do jogo na tela
    function render() {
        //pinta tela de branco
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 800);
        
        //desenha o personagem se estiver pulando ou parado
        if(megaman.jumping == true)
            ctx.drawImage(megaman.img, 320, 220, 90, 190, megaman.x, megaman.y, 80, 170);
        else
            drawRunning();

        //desenha linha
        ctx.fillStyle = "black";
        ctx.fillRect(0, 580, 1000, 7);
        
    }
    
    //chamando para rodar infinitamente
   loop();
});