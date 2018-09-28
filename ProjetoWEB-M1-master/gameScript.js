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
    var soundtrack = $("#soundtrack")[0];
    var gameState = "start";
    var cont = 100; //gun energy
    var listaTiros = [];
    var tiro = new Image();
    tiro.src = "sprites-megaman-x.png";
    
    if(gameState == "start")
        soundtrack.play();
    
    function Rect (img, x, y, width, height, speedX) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.visivel = true;
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
        hp : 100,
        hit : false,
        shooting : false
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
	right: false,
	left: false,
        d: false,
        space : false,
        keyListener : function(event) {
            var key_state = (event.type == "keydown")?true:false;
        
            switch (event.keyCode) {
                case 38: //up key
                    controller.up = key_state;
                    break;
                case 68: // 'd' key (dashing)
                    controller.d = key_state;
                    break;
                case 32: //space key (shooting)
                    controller.space = key_state;
                    break;
		case 39:
		    controller.right = key_state;
		    break;
		case 37:
		    controller.left = key_state;
		    break;
            }
            
        }
    };
    
    //rodando infinitamente
    function loop(){
        window.requestAnimationFrame(loop, cnv);
        window.addEventListener("keydown", controller.keyListener);
        window.addEventListener("keyup", controller.keyListener);
        var startTime = new Date().getTime();
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
        
        if(controller.space)
            megaman.shooting = true;

	if(controller.right) {
	   megaman.speedX = 5;
	   megaman.x += megaman.speedX;
	}
	if(controller.left) {
	   megaman.speedX = -5;
      	   megaman.x += megaman.speedX;
	}
        megaman.speedY += 1.5;
        
        megaman.y += megaman.speedY;
        megaman.speedY *= 0.9;
        //megaman.speedX *= 0.9;
        
        if(megaman.y > 608) {
            megaman.jumping = false;
            megaman.y = 608;
            megaman.speedY = 0;
        }
        
        if(megaman.hp <= 0) {
            gameState = "gameOver";
        }
        
        if(gameState == "gameOver") {
            soundtrack.pause();
			window.location.href = "telaGameOver.html";
            clearInterval(interval);
            $("#canvas").style.visibility = 'hidden';
        }
        
        if(megaman.shooting == true && cont >= 0) {
            listaTiros.push(new Rect(null, megaman.x + 60, megaman.y + 50, 100, 10, 50));
            cont--;
        }
        var hp = $("#hp")[0];
        hp.innerHTML  = "HP   : " + megaman.hp;
        var energy = $("#energy")[0];
        energy.innerHTML = "Gun Energy : " + cont;
    }
    
    
    var lista = [];
    var recMegaman;
    var recDashing;
    //desenhar elementos do jogo na tela
    function render() {
        //cenario se mexendo
        background();
        
        geraObstaculos();
        lista.forEach(desenhaObstaculo);
        lista.forEach(moverObstaculo);
        lista.forEach(colisao);
        
        recMegaman = new Rect(null, megaman.x, megaman.y, megaman.width - 40, megaman.height -10, 0);
        recDashing = new Rect(null, megaman.x, megaman.y + 50, megaman.width, megaman.height - 50, 0);
//        ctx.drawImage(r.img, 0, 0, r.img.width, r.img.height, r.x, r.y, r.width, r.height);
//        r.x += r.speedX;
        
        listaTiros.forEach(desenhaTiro);
        listaTiros.forEach(moverTiro);
        listaTiros.forEach(colisaoTiroObstaculo);
        
        desenharPersonagem();
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
        if(item.visivel == true)
            ctx.drawImage(item.img, 0, 0, item.img.width, item.img.height, item.x, item.y, item.width, item.height);
    }
    
    function moverObstaculo(item) {
        if(item.visivel == true)
            item.x += item.speedX;
    }
    
    function colisao(item) {
        if(item.testeColisao(recMegaman) && megaman.dashing == false && item.visivel == true) {
            megaman.hp--;
            megaman.hit = true;
        }
        else if(item.testeColisao(recDashing) && controller.right == false && item.visivel == true) {
            megaman.hp--;
            megaman.hit = true;
        }
	
            
    }
    
    //var tiro = new Rect(null, megaman.x, megaman.y, 50, 20, 5);
    function desenharPersonagem () {
            if(megaman.jumping == true)
                ctx.drawImage(megaman.img, 320, 220, 90, 190, megaman.x, megaman.y, 80, 170);
            else if(megaman.dashing == true){
                ctx.drawImage(megaman.img, 1110, 444, 180, 123, megaman.x, megaman.y + 42, 150, 100);
                megaman.dashing = false;
            }
            else if(megaman.shooting == true){
                ctx.drawImage(megaman.img, 842, 56, 124, 149, megaman.x, megaman.y - 17, 120, 150);
                megaman.shooting = false;
            }
            else {
                //ctx.fillRect(recMegaman.x, recMegaman.y, recMegaman.width, recMegaman.height);
                ctx.drawImage(megaman.img, 550, 70, 140, 130, megaman.x, megaman.y, 130, 130);
                //drawRunning();
            }
    }
    
    function desenhaTiro(item) {
        ctx.drawImage(tiro, 250, 10, 50, 200, item.x, item.y, item.width, item.height);
        //ctx.fillRect(item.x, item.y, item.width, item.height);
    }
    
    function moverTiro(item) {
        item.x += item.speedX;
    }
    
    function colisaoTiroObstaculo(item) {
        for(var i = 0; i < lista.length; i++) {
            if(item.testeColisao(lista[i]))
                lista[i].visivel = false;
        }  
    }
    
    //chamando para rodar infinitamente
    loop();
});