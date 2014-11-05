var canvasCtx, audioCtx, maps;

function Game()
{
	//Initialise player
	this.player = new Player(0,0, GAMESIZE/2);
	
	//Initialise enemy
	this.enemy = new Enemy(5000, 50, GAMESIZE);
	
	//Sets up the camera
	this.cam = new Camera();
	
	//Game states
	this.states = { Paused : 0, Playing : 1, Win : 2, Loss : 3, Menu : 4, HowTo : 5};
	this.gameState = this.states.Menu;
	
	//Menu states
	this.menuSelect = 0;
	this.menuStates = ["Play", "How To Play", "Survey", "BugReport"];	
	
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

//////////////////////Initialise methods///////////////////////////////
Game.prototype.init = function()
{
	this.initAudio();
	this.initCanvas();	
	this.initGame();
}
Game.prototype.initGame = function()
{
	maps = new GameManager();
	maps.init(GAMESIZE * 2);
	maps.GenerateMap(this.player);
	this.enemy.Load();	
	this.cam.init(maps.mapWidth, maps.mapHeight, canvas.width, canvas.height);	
	
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
/////////////////////////////////////////////////////////////////////////////

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
	else if(e.keyCode == 83||e.keyCode == 40)
	{
		game.keys["back"] = true;
	}
	else if(e.keyCode == 13)
	{
		game.keys["enter"] = true;
	}
	//Pause and Unpause game.
	else if(e.keyCode == 27)
	{
		if(game.gameState == game.states.Playing)
		{
			game.gameState = game.states.Paused;
		}
		else if(game.gameState == game.states.Paused)
		{
			game.gameState = game.states.Playing;
		}
	}
	
}

function onKeyUp(e)
{//Removes user input from keys map if user releases the key
	if (e.keyCode == 87 || e.keyCode == 38)
	{		
		game.keys["up"] = false;
		if(game.gameState == game.states.Menu)
		{			
			//Toggle through menu options
			if(game.menuSelect - 1 < 0)
			{
				game.menuSelect = game.menuStates.length;
			}
			game.menuSelect = (game.menuSelect - 1)%game.menuStates.length;
		}
	}	
	else if(e.keyCode == 65 || e.keyCode == 37)
	{
		game.keys["left"] = false;		
	}		
	else if(e.keyCode == 68||e.keyCode == 39)
	{
		game.keys["right"] = false;		
	}
	else if(e.keyCode == 13)
	{
		game.keys["enter"] = false;
	}
	else if(e.keyCode == 83||e.keyCode == 40)
	{
		game.keys["back"] = false;
		if(game.gameState == game.states.Menu)
		{			
			//Toggle through menu options
			game.menuSelect = (game.menuSelect + 1)%game.menuStates.length;
		}
	}
}

Game.prototype.reset = function()
{
	this.player = new Player(0,0, GAMESIZE/2);
	this.enemy = new Enemy(5000, 50, GAMESIZE);
	maps.init(GAMESIZE * 2);
	maps.GenerateMap(this.player);
}
Game.prototype.gameLoop = function()
{//Deals with all runtime events during gameplay
	if(game.audio.isLoaded() == true)
	{
		if(game.gameState == game.states.Menu)
		{
			//Pressing enter brings you to the highlighted screen.
			if(game.keys["enter"] == true)
			{
				if(game.menuSelect == 0)
				{
					game.reset();
					game.gameState = game.states.Playing;
				}
				else if(game.menuSelect == 1)
				{
					game.gameState = game.states.HowTo;
				}
				else if(game.menuSelect == 2)
				{
					window.open("http://goo.gl/forms/lxTR0n0i7X");
				}
				else if(game.menuSelect == 3)
				{
					window.open("http://goo.gl/forms/0jtjXSGRZ5");
				}
				game.keys["enter"] = false;
				
			}
		}
		else if(game.gameState == game.states.Playing) //If the game is running and unpaused
		{
			if(game.sounds.gameLoop.playing == false)
			{
				playSound(game.sounds.gameLoop);
			}
			if(maps.CheckWin())
			{
				game.gameState = game.states.Win;
			}
			else if(game.player.CheckLoss())
			{
				game.gameState = game.states.Loss;
			}
			maps.PickUpItems(game.player.position, game.player.radius);
			game.player.flashCheck(game.enemy);
			game.player.walk(game.keys);
			game.cam.update(game.player.getX(), game.player.getY());
			game.enemy.Update(game.player.getPos(), game.player.getDir(), game.keys);
			game.audio.Update(game.player.getPos(), game.enemy.getPos(), game.sounds.gameLoop);			
		}
		else if(game.gameState == game.states.Loss || game.gameState == game.states.Win || game.gameState == game.states.HowTo)
		{
			//If looking at the loss, win or instructions screen, pressing enter will return you to the menu screen
			if(game.keys["enter"] == true)
			{
				game.keys["enter"] = false;
				game.gameState = game.states.Menu;
			}
		}
		game.Draw();		
	}
	window.requestAnimFrame(game.gameLoop);
}

Game.prototype.Draw = function()
{//Draw game elements to the screen
	//Clear canvas
	canvasCtx.fillStyle = "grey";
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
	if(game.gameState == game.states.Playing)
	{
		//Call map draw method
		maps.Draw(this.cam.getX(), this.cam.getY());
		//Call player draw method
		this.player.Draw(this.cam.getX(), this.cam.getY());
		//Enemy draw method
		this.enemy.Draw(this.cam.getX(), this.cam.getY());
		//Draws the flashlight
		this.player.DrawFlashlight(this.cam.getX(), this.cam.getY(), canvas.width, canvas.height);
		//Call the map hud draw method
		maps.DrawHUD(this.player.sanity);		
	}
	else if(game.gameState == game.states.Paused)
	{
		canvasCtx.fillStyle = "purple";
		canvasCtx.font = "100px Georgia";
		canvasCtx.fillText("Paused", canvas.width/2, canvas.height/2);
	}
	else if(game.gameState == game.states.Win)
	{
		canvasCtx.fillStyle = "purple";
		canvasCtx.font = "30px Georgia";
		canvasCtx.fillText("You got the supplies...", canvas.width/2 - 400, canvas.height/2 - 100);
		canvasCtx.fillText("I guess that means you win...", canvas.width/2 - 400, canvas.height/2);
		canvasCtx.fillText("...for now...", canvas.width/2 - 400, canvas.height/2 + 100);
		
	}
	else if(game.gameState == game.states.Loss)
	{
		canvasCtx.fillStyle = "purple";
		canvasCtx.font = "30px Georgia";
		canvasCtx.fillText("You went insane, your body was found lifeless on the street at 6:23a.m", canvas.width/2 - 400, canvas.height/2 - 200);
		canvasCtx.fillText("by an office worker on their daily commute.", canvas.width/2 - 400, canvas.height/2 - 100);
		canvasCtx.fillText("Assumed suicide.", canvas.width/2 - 400, canvas.height/2);
		canvasCtx.fillText("You Lose.", canvas.width/2 - 400, canvas.height/2 + 100);
	}
	else if(game.gameState == game.states.Menu)
	{
		canvasCtx.font = "30px Georgia";					
		for(i = 0; i < game.menuStates.length;i++)
		{
			canvasCtx.fillStyle = "purple";
			if(i == game.menuSelect)
			{
				canvasCtx.fillStyle = "white";
			}
			canvasCtx.fillText(game.menuStates[i], canvas.width/2 - 200, canvas.height/2 - 200 + (100 * i));
			
		}	
				
	}
	else if(game.gameState == game.states.HowTo)
	{
		canvasCtx.font = "20px Georgia";
		canvasCtx.fillStyle = "purple";
		canvasCtx.fillText("CONTROLS", canvas.width/2 - 350, canvas.height/2 - 250);
		canvasCtx.fillText("Move Forward - W/Up Arrow", canvas.width/2 - 300, canvas.height/2 - 200);
		canvasCtx.fillText("Turn Left - A/Left Arrow", canvas.width/2 - 300, canvas.height/2 - 150);
		canvasCtx.fillText("Turn Right - D/Right Arrow", canvas.width/2 - 300, canvas. height/2 - 100);
		canvasCtx.fillText("Pause - Esc", canvas.width/2 - 300, canvas. height/2  - 50);
		canvasCtx.fillText("INSTRUCTIONS", canvas.width/2 - 350, canvas.height/2 + 50);
		canvasCtx.fillText("Search for the supplies", canvas.width/2 - 300, canvas.height/2 + 100);
		canvasCtx.fillText("Stay away from it, Don't look at it, RUN!", canvas.width/2 - 300, canvas.height/2 + 150);
	}
}