
	
            
            // div.appendChild(table);
            var levels = document.getElementById('levels');
            var inputs;

            var selectedNum;
             var min = 1;
             var max = 20;
             var lives = 3;
             var score = 0;
             var total = 100;
             var level = 1;
             var answers =[];
             var cs = new Audio("Correct.mp3");//sound when answer is correct
                 cs.load();
            var ics = new Audio("incorrect.wav");//sound when answer is incorrect
                ics.load();
            var win = new Audio("win.wav");//sound when answer is incorrect
                 win.load();
            var wrong = new Audio("wrong.wav");//sound when answer is incorrect
                wrong.load();
            var finished = new Audio("finished.wav");//sound when answer is incorrect
            finished.load();

           
          
             for (var j = 0; j < lives; j++) {
	             var img = document.createElement('img');
	            img.src = 'heart.gif';
	            img.setAttribute("class", "heart-image");
	            img.style.width = 30 + "%";
             	             img.style.float ="left";
	            document.getElementById('life').appendChild(img);
        	}

            $("#display").fadeToggle(1000);
            generate();

            function generate(){

                    let checks;

                    do{

                    selectedNum = Math.floor(Math.random() * (max - min) + min);
                    console.log(selectedNum);
                    checks = checkAnswers(selectedNum);

                    }while(checks == 1);
                    
                    answers.push(selectedNum);
                    console.log(answers);

                    let index = 0;
                    for(var i = min; i<= max; i++){

                        if (selectedNum == i) {

                            inputs=index;
                            let div = document.getElementsByTagName('h3')[index];
                            while (div.firstChild) {
                    div.removeChild(div.lastChild);
                }
                            var input = document.createElement('input');
                            input.style.width = 50 + "%";
                            input.setAttribute("id", "answer");

                            
                            div.appendChild(input);
                            
                        }

                        else{

                            document.getElementsByTagName('h3')[index].innerHTML = i;
                            
                        }

                        index++;
                    }

                    $("#display").fadeToggle(1000);

            }

 function checkAnswers(num){

     let ans = 0;

      for(var s = 0; s < answers.length; s ++){

            if (answers[s] == num) {
                ans = 1;
            }
      }

      return ans;

 }
            function submit(){
                    $("#display").fadeToggle(1000);
                let ans = document.getElementById('answer').value;
                console.log(ans);

                if(ans == selectedNum){
                    win.play();
                    
                    score+=20;
                    min+= 20;
                    max+=20;
                                       

                    selectedNum = 0;
                    document.getElementById('answer').remove();
                    document.getElementById('score').innerHTML = score + "/" + total;

                    if(score == total && level != 100){
                         showNextLevel();
                    }

                    else if( score == total && level == 100){
                        finished.play();
                        finishedNa();
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
            }



            
        function showNextLevel(){
            cs.play();
        level+=1;
        total+=100;
        levels.innerHTML = "Level " + level;
        document.getElementById('score').innerHTML = score + "/" + total;
		if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

		var img = document.createElement("img");
				img.src = "farmer.gif";
				img.style.width ="50%";
				modal_pic.appendChild(img);
				document.getElementById("modalbuton").innerText="NEXT LEVEL";

				document.getElementById("modal_content").innerHTML ="Excellent! We have " + score + " pigs now. Let's count it more. ";
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
	}

     function finished(){
            cs.play();

        if (modal_pic.childElementCount != 0) {
            modal_pic.removeChild(modal_pic.lastChild);
        }

        var img = document.createElement("img");
                img.src = "farmer.gif";
                img.style.width ="50%";
                modal_pic.appendChild(img);
                document.getElementById("modalbuton").innerText="PLAY AGAIN";

                document.getElementById("modal_content").innerHTML ="WOAH AMAZING,CONGRATULATIONS! YOU COUNTED ALL THE PIGS, THANK YOU FOR HELPING ME!.";
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
                myModal.show();
    }

	function showLoseModal(){
            ics.play();
		if (modal_pic.childElementCount != 0) {
			modal_pic.removeChild(modal_pic.lastChild);
		}

        level=1;
        total=100;
        score = 0;
        min =1;
        max=20;
        lives =3;
        answers =[];

        for (var j = 0; j < lives; j++) {
                 var img = document.createElement('img');
                img.src = 'heart.gif';
                img.setAttribute("class", "heart-image");
                img.style.width = 30 + "%";
                document.getElementById('life').appendChild(img);
            }

        levels.innerHTML = "Antas " + level;
        document.getElementById('score').innerHTML = score + "/" + total;

		var img = document.createElement("img");
				img.src = "cryingpig.gif";
				img.style.width ="50%";
				modal_pic.appendChild(img);
				document.getElementById("modalbuton").innerText="PLAY AGAIN";

				document.getElementById("modal_content").innerHTML ="Aww, you lose. Let's do better next time buddy.";
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();

	}

    function incorrectAns(){

        if (modal_pic.childElementCount != 0) {
            modal_pic.removeChild(modal_pic.lastChild);
        }
                document.getElementById("modalbuton").innerText="Okay";

                document.getElementById("modal_content").innerHTML ="WRONG, the correct answer is " + selectedNum;
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
                myModal.show();
    }

    function finishedNa(){
            if (modal_pic.childElementCount != 0) {
            modal_pic.removeChild(modal_pic.lastChild);

        }

                var img = document.createElement("img");
                img.src = "farmer.gif";
                img.style.width ="100%";
                modal_pic.appendChild(img);
                document.getElementById("modalbuton").innerText="Start";

                document.getElementById("modal_content").innerHTML ="WOAH AMAZING,CONGRATULATIONS! YOU COUNTED ALL THE PIGS, THANK YOU FOR HELPING ME!"
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
                myModal.show();


        level=1;
        total=100;
        score = 0;
        min =1;
        max=20;
        lives =3;
        answers =[];      
                    
                    levels.innerText = "LEVEL "+ level ;
                   
                    document.getElementById('score').innerHTML = score + "/" + total;
                        

                    for (var j = 0; j < lives; j++) {
                        var img = document.createElement('img');
                         img.src = 'heart.gif';
                         img.setAttribute("class", "heart-image");
                         img.style.width = 30+ "%";
                        document.getElementById('life').appendChild(img);
                    }

    }

            
