$(function(){
    var cnv = $('canvas')[0];
    var ctx = cnv.getContext('2d');
    var cenario = new Image();
    cenario.src = "cenario.png";
    var correndo = new Image();
    correndo.src = "megamanCorrendo.png";
    var ghost = new Image();
    ghost.src = "ghost.png";
    var thwomp = new Image();
    thwomp.src = "thwomp.png";
    var shell = new Image();
    shell.src = "shell.png";
    
    function Rect (img, x, y, width, height, speedX) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
    }
    Rect.prototype = {
        get bottom() { return this.y + this.height; },
        get left() { return this.x; },
        get right() { return this.x + this.width; },
        get top() { return this.y; },
        
        testeColisao: function(rectangle) {
        if (this.top > rectangle.bottom || this.right < rectangle.left || this.bottom < rectangle.top || this.left > rectangle.right) { return false; }

            return true;
        }
    }
    
    //criando objeto megaman
    var megaman = {
        img : new Image(),
        width : 150,
        height : 150,
        x : 1,
        y : 0,
        speedX : 0,
        speedY : 0,
        jumping : true,
        dashing: false,
        hp : 3
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
        if(elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            //desenhar   
            drawRunning();
        }
    }
    
    var controller = {
        up : false,
        d: false,
        keyListener : function(event) {
            var key_state = (event.type == "keydown")?true:false;
        
            switch (event.keyCode) {
                case 38: //up key
                    controller.up = key_state;
                    break;
                case 68: // 'd' key (dashing)
                    controller.d = key_state;
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
            megaman.speedY -= 55;
            megaman.jumping = true;
            
        }
        
        if(controller.d) 
            megaman.dashing = true;
        
        megaman.speedY += 1.5;
        
        megaman.y += megaman.speedY;
        megaman.speedY *= 0.9;
        megaman.speedX *= 0.9;
        
        if(megaman.y > 608) {
            megaman.jumping = false;
            megaman.y = 608;
            megaman.speedY = 0;
        }
    }
    
    
    var lista = [];
    var r = new Rect(thwomp, 1300, 650, 100, 100, -10);
    var recMegaman;
    //desenhar elementos do jogo na tela
    function render() {
        //cenario se mexendo
        background();
        
        geraObstaculos();
        lista.forEach(desenhaObstaculo);
        lista.forEach(moverObstaculo);
        
        
        recMegaman = new Rect(correndo, megaman.x, megaman.y, megaman.width - 40, megaman.height -10, 0);
        
//        ctx.drawImage(r.img, 0, 0, r.img.width, r.img.height, r.x, r.y, r.width, r.height);
//        r.x += r.speedX;
        
        //console.log(r.testeColisao(recMegaman));
        
        
        
        //desenha o personagem se estiver pulando ou parado
        if(megaman.jumping == true)
            ctx.drawImage(megaman.img, 320, 220, 90, 190, megaman.x, megaman.y, 80, 170);
        else if(megaman.dashing == true){
            ctx.drawImage(megaman.img, 1110, 444, 180, 123, megaman.x, megaman.y + 42, 150, 100);
            megaman.dashing = false;
        }
        else {
            //ctx.fillRect(recMegaman.x, recMegaman.y, recMegaman.width, recMegaman.height);
            ctx.drawImage(megaman.img, 550, 70, 140, 130, megaman.x, megaman.y, 130, 130);

        }
            
        
        //console.log(megaman.y);
        //if(recX > megaman.x + 127 && recX < megaman.x + 130)
    }
    
    var x = 0, x2 = 0;
    function background() {
        ctx.drawImage(cenario, 0, 0, 1000, 800, x, 0, 1000, 800);
        ctx.drawImage(cenario, 0, 0, 1000, 800, x + 1000, 0, 1000, 800);
        ctx.drawImage(cenario, 0, 0, 1000, 800, x2, 0, 1000, 800);
        ctx.drawImage(cenario, 0, 0, 1000, 800, x2 + 1000, 0, 1000, 800);
        
        if(x + cenario.width <= 0)
            x = 0;
        if(x2 + cenario.width <= 0)
            x2 = 0;
        
        x--;
        x2--;
    }
    
    
    function geraObstaculos() {
        var num = Math.floor(Math.random() * 3000) + 1;
        //console.log(num);
        
        if(num < 10) {
            lista.push(new Rect(ghost, 1000, 550, 100, 100, -4));
        }
        else if(num < 20) {
            lista.push(new Rect(thwomp, 1300, 650, 100, 100, -8));
        }
        else if(num < 30) {
            lista.push(new Rect(shell, 1400, 675, 80, 70, -10));
        }
    }
    
    function desenhaObstaculo(item) {
        ctx.drawImage(item.img, 0, 0, item.img.width, item.img.height, item.x, item.y, item.width, item.height);
    }
    
    function moverObstaculo(item) {
        item.x += item.speedX;
        if(item.testeColisao(recMegaman))
            item.speedX = 0;
    }
    
    
    //chamando para rodar infinitamente
    loop();
});