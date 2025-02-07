let playerName = document.getElementById('playerName');
let enemyName = document.getElementById('enemyName');
let playerScore = document.getElementById('playerScore').innerHTML = 100;
let enemyScore = document.getElementById('enemyScore').innerHTML = 100;
let levels = document.getElementById('levels');
let n2 = 0;
let n4 = 0;
let ans2 = 0;
let multiply = 0;
let max = 2;
let level = 1;
let picture = 1;
var cs = new Audio("Correct.mp3");//sound when answer is correct
	cs.load();
var ics = new Audio("incorrect.wav");//sound when answer is incorrect
	ics.load();
var win = new Audio("win.wav");//sound when answer is incorrect
	win.load();
var wrong = new Audio("wrong.wav");//sound when answer is incorrect
	wrong.load();



generate();

function generate(){

	document.getElementById('inputAns').value= "";
	document.getElementById('inputAns2').value= "";
	n2 = Math.floor(Math.random() * 10) +1;
	n4 = Math.floor(Math.random() * 10) +1;
	ans2 = max* n4;


		document.getElementById("num1").innerHTML = max;
		document.getElementById("num2").innerHTML = n2;
		document.getElementById("num3").innerHTML = max;
		document.getElementById("ans2").innerHTML = ans2;
		multiply = max * n2;
}

function submit(){

	let inputAns = document.getElementById("inputAns").value;
	let inputAns2 = document.getElementById("inputAns2").value;
	if (multiply == inputAns && inputAns2 == n4) {
		// document.getElementById("h3").innerHTML ="EXCELLENT!";
		win.play();
		let damage = document.getElementById('enemyScore').innerText - 20;
		document.getElementById('enemyScore').innerHTML = damage;
		var bar = document.getElementById('enemyScore');
		bar.style.width = damage + "%";

		if (document.getElementById('enemyScore').innerText == 0) {
		
			showNextLevel();
						
		}

		if((document.getElementById('enemyScore').innerText == 0) && picture == 10){

			finish();
		}

		generate();


	}else{
		
		wrong.play();
		incorrect();
		let damage = document.getElementById('playerScore').innerText - 20;

		
		document.getElementById('playerScore').innerHTML = damage;
		var bar2 = document.getElementById('playerScore');
		bar2.style.width = damage + "%";

		if (document.getElementById('playerScore').innerText == 0) {

			showLoseModal();		
		}
		
		generate();
	}


	 
}	

function showNextLevel(){
		
		cs.play();

		if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

				var img = document.createElement("img");
				img.src = "boy.gif";
				img.style.width ="50%";
				modal_pic.appendChild(img);

				picture+=1;
				let div1 = document.getElementById('images');
					 var child = div1.lastElementChild; 
        while (child) {
            div1.removeChild(child);
            child = div1.lastElementChild;
        }

					var imgs = document.createElement("img");
					imgs.src = picture + ".gif";
					imgs.setAttribute("class", "enemy-image");
	            	imgs.style.width = 50+ "%";
	            	
					div1.appendChild(imgs);



				document.getElementById("modalbuton").innerText="NEXT LEVEL";
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
				document.getElementById("modal_content").innerHTML ="AMAZING! Let's go to the next level.";
				
				document.getElementById('enemyScore').innerHTML = 100;
				var bar = document.getElementById('enemyScore');
				bar.style.width = 100+ "%";

				document.getElementById('playerScore').innerHTML = 100;
				var bar1 = document.getElementById('playerScore');
				bar1.style.width = 100+ "%";
						level +=1;
						max += 1;	
						levels.innerText = "LEVEL"+ level ;
							
				
						generate();
    					
						// document.getElementById('score').style.width= 1+ "%";
	}

	function finish(){

		cs.play();

		if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

				var img = document.createElement("img");
				img.src = "boy.gif";
				img.style.width ="50%";
				modal_pic.appendChild(img);

				picture = 1;
				let div1 = document.getElementById('images');
					 var child = div1.lastElementChild; 
        while (child) {
            div1.removeChild(child);
            child = div1.lastElementChild;
        }

					var imgs = document.createElement("img");
					imgs.src = picture + ".gif";
					imgs.setAttribute("class", "enemy-image");
	            	imgs.style.width = 50+ "%";
					div1.appendChild(imgs);



				document.getElementById("modalbuton").innerText="Start Again";
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
				document.getElementById("modal_content").innerHTML ="EXCELLENT! YOU DEFEATED THE MONSTERS!";
				
				document.getElementById('enemyScore').innerHTML = 100;
				var bar = document.getElementById('enemyScore');
				bar.style.width = 100+ "%";

				document.getElementById('playerScore').innerHTML = 100;
				var bar1 = document.getElementById('playerScore');
				bar1.style.width = 100+ "%";
						level = 1;
						max = 2;	
						levels.innerText = "Antas "+ level ;
							
				
						generate();
    					
						//
	}

	function showLoseModal(){
			ics.play();
		if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

				level=1;

				var img = document.createElement("img");
				img.src = "lose.gif";
				img.style.width ="100%";
				modal_pic.appendChild(img);

				

				document.getElementById("modalbuton").innerText="PLAY AGAIN";

				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();

				document.getElementById("modal_content").innerText= "Aww, that's okay buddy. You can do better nnext time.";

				document.getElementById('enemyScore').innerHTML = 100;
				var bar = document.getElementById('enemyScore');
				bar.style.width = 100+ "%";

				document.getElementById('playerScore').innerHTML = 100;
				var bar1 = document.getElementById('playerScore');
				bar1.style.width = 100+ "%";
				   				
    				max = 2;
    				
    				levels.innerText = "Antas "+ level ;

    				generate();

    							 
	}

	function incorrect(){
				if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}
				document.getElementById("modalbuton").innerText="Okay";

				document.getElementById("modal_content").innerHTML ="The correct answers are " +n4+  " and " + multiply ;
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
	}