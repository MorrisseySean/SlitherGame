function Player(x, y, radius, screenWidth, screenHeight)
{
	//Set up player position and radius parameters
	this.position = new Vector2(x, y);
	this.radius = radius;
	//Set up speed and direction parameters
	this.speed = 5;
	this.dir = 0;
	//Player sprite
	this.image = new Sprite(radius * 2, radius * 2);
	
}


///////////////////////Get Methods///////////////////////////
Player.prototype.getX = function()
{//Returns the x position of the player
	return this.position.x;
}
Player.prototype.getY = function()
{//Returns the y position of the player
	return this.position.y;
}
Player.prototype.getPos = function()
{
	return this.position;
}
Player.prototype.getDir = function()
{
	return this.dir;
}
/////////////////////////////////////////////////////////////


///////////////////////Set Methods///////////////////////////
Player.prototype.setPos = function(x, y)
{//Sets the position of the player
	this.position.x = x;
	this.position.y = y;
}
Player.prototype.setDir = function(dir)
{//Sets the direction of the player
	this.dir = dir;
}
Player.prototype.setSpeed = function(spd)
{//Sets the speed of the player
	this.speed = spd;
}
/////////////////////////////////////////////////////////////

Player.prototype.walk = function(keys)
{//Update player position based on speed and direction
	if(keys["up"] == true)
	{
		velocity = new Vector2(this.speed * Math.cos(this.dir), this.speed * Math.sin(this.dir));
		this.position = maps.WallCollision(this.position, velocity, this.radius);
	}
	if (keys["right"] == true)
	{
		this.turnRight();
	}
	else if (keys["left"] == true)
	{
		this.turnLeft();
	}
}

//Methods to rotate player left or right
Player.prototype.turnLeft = function()
{
	this.dir-= 0.05;
}
Player.prototype.turnRight = function()
{
	this.dir+= 0.05;
}

Player.prototype.Load = function(screenWidth, screenHeight)
{
	this.image.load("images/player.png");
	this.flashlight = new Sprite(screenWidth, screenHeight);
	this.flashlight.load("images/flashlight.png");
}
Player.prototype.Draw = function(offsetX, offsetY, screenWidth, screenHeight)
{
	canvasCtx.fillStyle = rgb(0, 200, 0);
	//draw a circle
	canvasCtx.beginPath();
	canvasCtx.arc(this.position.x - offsetX, this.position.y - offsetY, this.radius, 0, Math.PI*2); 
	canvasCtx.closePath();
	canvasCtx.fill();
	this.image.rotateDraw(new Vector2(((this.position.x - this.radius) - offsetX), ((this.position.y - this.radius) - offsetY)), this.radius, this.radius, this.dir);
	this.flashlight.rotateDraw(new Vector2(((this.position.x - this.flashlight.width/2) - offsetX), ((this.position.y - this.flashlight.height/2) - offsetY)), this.flashlight.width/2, this.flashlight.height/2 , this.dir);
}