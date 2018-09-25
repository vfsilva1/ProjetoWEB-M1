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
        x : 1,
        y : 0,
        speedX : 0,
        speedY : 0,
        jumping : true
    };
    megaman.img.src = "sprites-megaman-x.png";
    
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
    
    function updateFrame() {
        currentFrame = ++currentFrame % cols;
        srcX = currentFrame * frameWidth;
        srcY = 0;
        
    }
    
    function drawRunning(){
        updateFrame();
        ctx.drawImage(correndo, srcX, srcY, frameWidth, frameHeight, megaman.x, megaman.y, megaman.width, megaman.height);
    }
    
    var fps, fpsInterval, startTime, now, then, elapsed;
    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }
    
    function animate(){
        requestAnimationFrame(animate);
        
        now = Date.now();
        elapsed = now - then;
        console.log("alo");
        if(elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            //desenhar    
        }
    }
    
    
    
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
        
        if(controller.left && megaman.x < 1000)
            megaman.speedX -= 0.5;
        
        if(controller.right && megaman.x > 0)
            megaman.speedX += 0.5;
        
        megaman.speedY += 1.5;
        megaman.x += megaman.speedX;
        megaman.y += megaman.speedY;
        megaman.speedY *= 0.9;
        megaman.speedX *= 0.9;
        
        if(megaman.y > 608) {
            megaman.jumping = false;
            megaman.y = 608;
            megaman.speedY = 0;
        }
    }
    var x = 0, x2 = 0;
    var recX = 1100, recY = 688;
    //desenhar elementos do jogo na tela
    function render() {
        //pinta tela
        ctx.drawImage(cenario, 0, 0, 1000, 800, x, 0, 1000, 800);
        ctx.drawImage(cenario, 0, 0, 1000, 800, x + 1000, 0, 1000, 800);
        ctx.drawImage(cenario, 0, 0, 1000, 800, x2, 0, 1000, 800);
        ctx.drawImage(cenario, 0, 0, 1000, 800, x2 + 1000, 0, 1000, 800);
        x --;
        x2--;
        if(x + cenario.width <= 0)
            x = 0;
        if(x2 + cenario.width <= 0)
            x2 = 0;
        
        ctx.fillRect(recX, recY, 50, 50);
        recX -= 4;
        //desenha o personagem se estiver pulando ou parado
        if(megaman.jumping == true)
            ctx.drawImage(megaman.img, 320, 220, 90, 190, megaman.x, megaman.y, 80, 170);
        else
            ctx.drawImage(megaman.img, 550, 70, 140, 130, megaman.x, megaman.y, 130, 130);
        
        
        
    }
    //chamando para rodar infinitamente
    loop();
});