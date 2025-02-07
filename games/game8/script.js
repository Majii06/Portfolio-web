let display = document.getElementById('display');
let scoreBoard = document.getElementById('score').innerHTML = "0/10";
let text = document.getElementById('text');
let levels = document.getElementById('levels');
let level = 1;
var lives = 3;
let selectedNum;
let max = 50;
let min = 1;
let maxDisplayNum = 20;
let score = 0;
let total = 10;

var win = new Audio("win.wav");
		win.load();
var wrong = new Audio("wrong.wav");
		wrong.load();
var correct = new Audio("Correct.mp3");
		correct.load();
var incorrect = new Audio("incorrect.wav");
		incorrect.load();
var options = ["","","","","","","","","","","","","","","","","","","",""];

  generate();

for (var j = 0; j < lives; j++) {
	            var img = document.createElement('img');
	            img.src = 'heart.gif';
	            img.setAttribute("class", "heart-image");
	            img.style.width = 30+ "%";
	            document.getElementById('life').appendChild(img);
}



	$(".button").click(function() {

    		let fired_button = $(this).text();
    		
    		if (fired_button == selectedNum) {
    			console.log(fired_button);
    			console.log(selectedNum);

    			win.play();
    			score++;
    			document.getElementById('score').innerHTML = score + "/10";
    			
    			if (score == total) {
    				showNextLevel();
    			}

    			generate();
    		}

    		else{

    				wrong.play();
    				incorrectAns();
    				lives--;
    				life.removeChild(life.lastChild);

    				if(lives == 0){

    					showLoseModal();
    				}

    				generate();

    		}



 });


	function generate(){


		selectedNum = Math.floor(Math.random()* (max-min) + min);
		console.log(selectedNum);
     let option =   Math.floor(Math.random() * maxDisplayNum);
		if ( selectedNum % 2 == 0) {
              text.innerHTML = "Find the EVEN number below";

             

              for(let i = 0; i < maxDisplayNum; i++){
                  let newNum;

              		if (option == i) {
                    options[i] = selectedNum;


              			document.getElementsByTagName('a')[i].innerHTML = selectedNum;
              			
              		}

              		else{

                     let chekey;
                     let even;
                    do{
                     
                     newNum = Math.floor(Math.random()* (max-min) + min);                     
                     chekey = check(newNum);
                        even = newNum % 2;

                    }while(chekey == 1 || even == 0 );

                    options[i] = newNum;
                  
                   document.getElementsByTagName('a')[i].innerHTML = newNum;
              			
              		}

              }

       }else{
              text.innerHTML = "Find the ODD number below";  

                for(let i = 0; i < maxDisplayNum; i++){
                  let newNum;

                  if (option == i) {
                    options[i] = selectedNum;


                    document.getElementsByTagName('a')[i].innerHTML = selectedNum;
                    
                  }

                  else{

                     let chekey;
                     let odd;
                    do{
                     
                     newNum = Math.floor(Math.random()* (max-min) + min);                      
                     chekey = check(newNum);
                     odd = newNum % 2;
                    }while(chekey == 1 || odd != 0);

                    options[i] = newNum;
                  
                   document.getElementsByTagName('a')[i].innerHTML = newNum;
                    
                  }

              }
              


       }
}

  
 function check(newNum){
      
      let ans = 0;

      for(var s = 0; s < maxDisplayNum; s ++){

            if (options[s] == newNum || newNum == selectedNum) {
                ans = 1;
            }
      }

      return ans;

  }


function showNextLevel(){

	correct.play();

	if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

	score = 0;
	level++;
	min = max;
	max+=50;
	

	levels.innerText = "LEVEL "+ level;
	document.getElementById('score').innerHTML = score + "/10";
	var img = document.createElement("img");
	img.src = "boy.gif";
	img.style.width ="100%";
	modal_pic.appendChild(img);


	document.getElementById("modalbuton").innerText="NEXT LEVEL";
	document.getElementById("modal_content").innerHTML ="EXCELLENT! Let's try the next level.";
	var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
	myModal.show();

	generate();

}


function showLoseModal(){
			incorrect.play();
		if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

			

				var img = document.createElement("img");
				img.src = "lose.gif";
				img.style.width ="100%";
				modal_pic.appendChild(img);
				document.getElementById("modalbuton").innerText="PLAY AGAIN";

				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();

				document.getElementById("modal_content").innerText= "Aww, you LOSE and that'okay. We can do better next time.";

				// document.getElementById('score').style.width= 1+ "%";
					lives = 3;
    				score =0;
    				
    				max = 50;
    				maxDisplayNum = 20;
    				level =1;
    				
    				
    				levels.innerText = "LEVEL "+ level ;

    				 	
						document.getElementById('score').innerHTML = score + "/10";

    				for (var j = 0; j < lives; j++) {
	            		var img = document.createElement('img');
	           			 img.src = 'heart.gif';
	           			 img.setAttribute("class", "heart-image");
	           			 img.style.width = 30+ "%";
	            		document.getElementById('life').appendChild(img);
        			}

        			generate();
    				
			 



			
	}

	function incorrectAns(){
				if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}
				document.getElementById("modalbuton").innerText="Okay";

				document.getElementById("modal_content").innerHTML ="WRONG. The correct answer is " + selectedNum;
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
	}
