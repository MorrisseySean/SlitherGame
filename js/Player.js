function Player(x, y, radius)
{
	//Set up player position and radius parameters
	this.x = x;
	this.y = y;
	this.radius = radius;
	//Set up speed and direction parameters
	this.speed = 5;
	this.dir = 0;	
}


///////////////////////Get Methods///////////////////////////
Player.prototype.getX = function()
{//Returns the x position of the player
	return this.x;
}
Player.prototype.getY = function()
{//Returns the y position of the player
	return this.y;
}
Player.prototype.getDir = function()
{
	return this.dir;
}
/////////////////////////////////////////////////////////////


///////////////////////Set Methods///////////////////////////
Player.prototype.setPos = function(x, y)
{//Sets the position of the player
	this.x = x;
	this.y = y;
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
		velocityX = this.speed * Math.cos(this.dir);
		velocityY = this.speed * Math.sin(this.dir);
		this.x += velocityX;
		this.y += velocityY;
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

Player.prototype.Draw = function(offsetX, offsetY)
{
	canvasCtx.fillStyle = rgb(0, 200, 0);
	//draw a circle
	canvasCtx.beginPath();
	canvasCtx.arc(this.x - offsetX, this.y - offsetY, this.radius, 0, Math.PI*2); 
	canvasCtx.closePath();
	canvasCtx.fill();
}