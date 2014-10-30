var canvasCtx, audioCtx, maps;

function Game()
{
	//Initialise player
	this.player = new Player(50, 50, 50);
	
	//Initialise enemy
	this.enemy = new Enemy(5000, 50, 80);
	
	//Sets up the camera
	this.cam = new Camera();
	
	//Set up key map
	this.keys = {};
	this.keys["up"] = false;
	this.keys["right"] = false;
	this.keys["left"] = false;
	
	//Sound data and parameters to be used for each sound.
	this.audio;
	this.sounds = {
		gameLoop : 
		{
			src : "sounds/creep.mp3",
			volume : 1.0,
			loop : true,
			playing : false
		}
	}	
	this.GAMESIZE = 50;
	
}
Game.prototype.init = function()
{
	this.initAudio();
	this.initCanvas();	
	this.initGame();
}
Game.prototype.initGame = function()
{
	maps = new GameManager();
	maps.init(200);
	maps.GenerateMap();
	this.enemy.Load();	
	this.cam.init(10000, 10000, canvas.width, canvas.height);	
	
}

Game.prototype.initCanvas = function()
{//Set up the Canvas to draw game elements on
	//Create canvas and attach it to the file.
	canvas = document.createElement('canvas');
	canvasCtx = canvas.getContext('2d');
	document.body.appendChild(canvas);
	//Set canvas size
	canvas.width = window.innerWidth ;
	canvas.height = window.innerHeight ;
	//Add a listener for key presses and releases
	canvas.addEventListener("keydown", onKeyPress, true);
	canvas.addEventListener("keyup", onKeyUp, true);
	document.addEventListener("resize", onResize, true);
	//Set tab index to 0 and set focus on canvas
	canvas.setAttribute('tabindex', '0');
	canvas.focus();
}
Game.prototype.initAudio = function()
{
	try 
	{
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		audioCtx = new AudioContext();
	}
	catch(e) 
	{
		alert('Web Audio API is not supported in this browser');
	}
	this.audio = new AudioManager();
	this.audio.Load(this.sounds.gameLoop)
}

function onResize(e)
{
	//Set canvas size
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
}
function onKeyPress(e)
{//Places user input into the keys map
	if (e.keyCode == 87 || e.keyCode == 38)
	{		
		game.keys["up"] = true;
	}
	else if(e.keyCode == 65 || e.keyCode == 37)
	{
		game.keys["left"] = true;
	}		
	else if(e.keyCode == 68||e.keyCode == 39)
	{
		game.keys["right"] = true;
	}
	
}

function onKeyUp(e)
{//Removes user input from keys map if user releases the key
	if (e.keyCode == 87 || e.keyCode == 38)
	{		
		game.keys["up"] = false;
	}
	
	else if(e.keyCode == 65 || e.keyCode == 37)
	{
		game.keys["left"] = false;
		
	}
		
	else if(e.keyCode == 68||e.keyCode == 39)
	{
		game.keys["right"] = false;
		
	}
}

Game.prototype.gameLoop = function()
{//Deals with all runtime events during gameplay
	if(game.audio.isLoaded() == true)
	{
		if(game.sounds.gameLoop.playing == false)
		{
			playSound(game.sounds.gameLoop);
		}
		maps.PickUpItems(game.player.position, game.player.radius);
		game.player.flashCheck(game.enemy);
		game.player.walk(game.keys);
		game.cam.update(game.player.getX(), game.player.getY());
		game.enemy.Update(game.player.getPos());
		game.audio.Update(game.player.getPos(), game.enemy.getPos(), game.sounds.gameLoop);
		game.Draw();		
	}
	window.requestAnimFrame(game.gameLoop);
}

Game.prototype.Draw = function()
{//Draw game elements to the screen
	//Clear canvas
	canvasCtx.fillStyle = "grey";
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
	
	//Call map draw method
	maps.Draw(this.cam.getX(), this.cam.getY());
	//Call player draw method
	this.player.Draw(this.cam.getX(), this.cam.getY(), canvas.width, canvas.height);
	//Enemy draw method
	this.enemy.Draw(this.cam.getX(), this.cam.getY());
}