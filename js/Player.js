function Player(x, y, radius, screenWidth, screenHeight)
{
	//Set up player position and radius parameters
	this.position = new Vector2(x, y);
	this.radius = radius;
	//Set up speed and direction parameters
	this.speed = 3;
	this.dir = 270 * Math.PI/180;
	//Parameter for sanity
	this.sanity = 100;
	//Player sprite
	this.image = IMAGE.PLAYERSPRITE;
	this.flashlight = IMAGE.FLASHLIGHTSPRITE;
	
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


////////////////////Movememnt Methods////////////////////////
Player.prototype.walk = function(keys)
{//Update player position based on speed and direction
	if(keys["up"] == true)
	{
		velocity = new Vector2(this.speed * Math.cos(this.dir), this.speed * Math.sin(this.dir));
		this.position = new Vector2(this.position.x + velocity.x, this.position.y + velocity.y);
		//Check if the player is outside the map bounds.
		if(this.position.x - this.radius  < 0)
		{
			this.position.x = this.radius;
		}
		else if(this.position.x + this.radius > maps.mapWidth)
		{
			this.position.x = maps.mapWidth - (this.radius + 1);
		}
		if(this.position.y - this.radius  < 0)
		{
			this.position.y = this.radius;
		}
		else if(this.position.y + this.radius > maps.mapHeight)
		{
			this.position.y = maps.mapHeight - (this.radius + 1);
		}
		//Check for collision with walls
		this.position = maps.DetectWallCollision(this.position, this.radius);
	}
	else if(keys["back"] == true)
	{
		velocity = new Vector2(-(this.speed/4 * Math.cos(this.dir)), -(this.speed/4 * Math.sin(this.dir)));
		this.position = new Vector2(this.position.x + velocity.x, this.position.y + velocity.y);
		//Check if the player is outside the map bounds.
		if(this.position.x - this.radius  < 0)
		{
			this.position.x = this.radius;
		}
		else if(this.position.x + this.radius > maps.mapWidth)
		{
			this.position.x = maps.mapWidth - this.radius;
		}
		if(this.position.y - this.radius  < 0)
		{
			this.position.y = this.radius;
		}
		else if(this.position.y + this.radius > maps.mapHeight)
		{
			this.position.y = maps.mapHeight - this.radius;
		}
		//Check for collision with walls
		this.position = maps.DetectWallCollision(this.position, this.radius);
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
	this.dir *= (180/Math.PI);
	this.dir -= 1;
	if(this.dir < 0)
	{
		this.dir += 360;
	}
	this.dir *= (Math.PI/180);
}
Player.prototype.turnRight = function()
{
	this.dir *= (180/Math.PI);
	this.dir += 1;
	this.dir %= 360;
	this.dir *= (Math.PI/180);
}
/////////////////////////////////////////////////////////////


//Flashlight enemy detection
Player.prototype.flashCheck = function(enemy)
{
	//Width and height of flashlight collision box
	var rHeight = this.radius * 3;
	var rWidth = this.radius * 7;
	//Rotate enemy position about player
	var tempEnemyPos = new Vector2(enemy.position.x - this.position.x, enemy.position.y - this.position.y);
	var rotateAng = -this.dir;	
	var x = tempEnemyPos.x * (Math.cos(rotateAng)) - tempEnemyPos.y * (Math.sin(rotateAng));
	var y = tempEnemyPos.x * (Math.sin(rotateAng)) + tempEnemyPos.y * (Math.cos(rotateAng));;
	//Check if the enemy is inside the flashlight
	if(-this.radius/2 < x &&	rWidth > x && -rHeight < y && rHeight > y)
	{
		//Stop the enemy and reduce sanity.
		enemy.onSight(true);
		if(this.sanity > 0)
		{
			this.sanity -= 0.25;			
		}
	}
	else
	{
		enemy.onSight(false);
	}
	dist = Math.sqrt(((enemy.position.x - this.position.x)*(enemy.position.x - this.position.x)) + ((enemy.position.y - this.position.y)*(enemy.position.y - this.position.y)));
	if(dist < enemy.radius + this.radius)
	{
		this.sanity -= 10;
	}
}

Player.prototype.CheckLoss = function()
{
	if(this.sanity <= 0)
	{
		return true;
	}
	return false;
}

Player.prototype.Draw = function(offsetX, offsetY)
{
	canvasCtx.fillStyle = rgb(0, 200, 0);
	//draw a circle
	canvasCtx.beginPath();
	canvasCtx.arc(this.position.x - offsetX, this.position.y - offsetY, this.radius, 0, Math.PI*2); 
	canvasCtx.closePath();
	canvasCtx.fill();
	this.image.rotateDraw(new Vector2(((this.position.x - this.radius) - offsetX), ((this.position.y - this.radius) - offsetY)), this.radius, this.radius, this.dir);	
}

Player.prototype.DrawFlashlight = function(offsetX, offsetY, screenWidth, screenHeight)
{
	this.flashlight.rotateDraw(new Vector2(((this.position.x - this.flashlight.width/2) - offsetX), ((this.position.y - this.flashlight.height/2) - offsetY)), (this.flashlight.width/2), this.flashlight.height/2 , this.dir);
}