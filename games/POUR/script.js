var lives = 3;

 for (var j = 0; j < lives; j++) {
	            var img = document.createElement('img');
	            img.src = 'heart.gif';
	            img.setAttribute("class", "heart-image");
	            img.style.width = 10+ "%";
	            document.getElementById('life').appendChild(img);
        }