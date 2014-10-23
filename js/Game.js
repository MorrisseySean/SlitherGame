var canvasCtx, maps;

function Game()
{
	//Initialise player
	this.player = new Player(50, 50, 50);
	
	//Set up map manager
	//this.maps = new MapManager();
	
	//Sets up the camera
	this.cam = new Camera();
	
	//Set up key map
	this.keys = {};
	this.keys["up"] = false;
	this.keys["right"] = false;
	this.keys["left"] = false;
}

Game.prototype.initGame = function()
{
	maps.init(200);
	maps.GenerateMap();
	this.player.Load(canvas.width * 2, canvas.width * 2);
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
Game.prototype.initMaps = function()
{
	//Set up the map manager 
	maps = new MapManager();
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
	//game.maps.WallCollisionX(game.player.getPos());
	//game.maps.WallCollisionY(game.player.getX(), game.player.getY());
	game.player.walk(game.keys);
	game.cam.update(game.player.getX(), game.player.getY());
	game.Draw();
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
}