function ajuda(){
	$(".nome").empty();
	$("#ajuda").css("text-align", "center");
	$("#ajuda").css("font-size", "20px");
	$("#ajuda").css("color", "blue");
	//$("#ajuda").css("font-family", "sans-serif");

	$("#ajuda").append("<h2>Ajude Megaman a derrotar ou desviar dos inimigos na sua jornada sem fim.</h2>");
	//$("#ajuda").style = "color: blue; text-align: center; sans-serif; font-family: sans-serif; font-size: 20px; marginTop: 50px;";
	$("#ajuda").append("<h2>Comandos:</h2>");
	$("#ajuda").append("<h3>'D' = Agachar</h3>");
	$("#ajuda").append("<h3>'ESPAÇO' = Atirar</h2>");
	$("#ajuda").append("<h3>'SETA PARA CIMA' = Pular</h2>");
	$("#ajuda").append("<h3>'SETA PARA ESQUERDA' = Andar para esquerda</h2>");
	$("#ajuda").append("<h3>'SETA PARA DIREITA' = Andar para direita</h2>");
	//$('.nome')[0].style.visibility = 'hidden';
}

