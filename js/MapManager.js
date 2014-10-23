var building, emptySquare;

function MapManager()
{
	this.size = 0;
	this.building = [];
	this.map = [];
	this.emptySquare = []
}

MapManager.prototype.init = function(size)
{
	this.size = size;
	emptySquare = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
	
	this.map = [[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]];
	
	this.building[0] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
						[0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
						[0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
						[0, 1, 1, 1, 1, 1, 0, 1, 0, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
					
	this.building[1] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
						[0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
						[0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						
	this.building[2] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
						[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
					
}
MapManager.prototype.GenerateMap = function()
{
	//Randomly place buildings on the map every time the game loads.
	for(var i = 0; i < this.map.length; i++)
	{
		for(var j = 0; j < this.map[i].length; j++)
		{
			this.map[j][i] = Math.floor(Math.random()*(this.building.length-1) + 1);
		}
	}
}
MapManager.prototype.Draw = function(offsetX, offsetY)
{
	//Calls the draw function for the buildings with the required position based off of the map array
	for(var i = 0; i < this.map.length; i++)
	{
		for(var j = 0; j < this.map.length; j++)
		{
			if(this.map[i][j] != 0)
			{
				this.DrawBuilding(this.map[i][j] - 1, j * this.size * this.building[0].length, i * this.size * this.building[0].length, offsetX, offsetY);
			}
		}
	}
}

MapManager.prototype.DrawBuilding = function(buildingNo, posX, posY, offsetX, offsetY)
{
	//Draws individual buildings
	for(var i = 0; i < this.building[buildingNo].length; i++)
	{
		for(var j = 0; j < this.building[buildingNo][0].length; j++)
		{
			if(this.building[buildingNo][i][j] == 1)
			{
				canvasCtx.fillStyle = rgb(100, 100, 0);
				canvasCtx.fillRect(posX + (j*this.size - offsetX), posY + (i * this.size - offsetY), this.size, this.size);
			}
		}
	}
}

MapManager.prototype.WallCollision = function(playerPos, playerVel, playerSize)
{
	//Detect collisions between the player and the walls
	var xPos = 0;
	var yPos = 0;
	if(playerVel.x > 0)
	{
		xPos = Math.floor(((playerPos.x + playerSize) + playerVel.x)/this.size)
	}
	else
	{
		xPos = Math.floor(((playerPos.x - playerSize) + playerVel.x)/this.size)
	}
	if(playerVel.y > 0)
	{
		yPos = Math.floor(((playerPos.y + playerSize) + playerVel.y)/this.size)
	}
	else
	{
		yPos = Math.floor(((playerPos.y - playerSize) + playerVel.y)/this.size)
	}
	if(xPos < 0 || xPos > this.size * this.building[0].length * this.map.length||yPos < 0||yPos > this.size * this.building[0].length * this.map.length)
	{
		//If the player is at the edge of the screen don't move.
		return playerPos;
	}
	
	//Find which map location the player is in
	xIndex = Math.floor(xPos/this.building[0].length);	
	yIndex = Math.floor(yPos/this.building[0].length);
	
	//Find which building is located in the same position as the player
	var buildingNo = this.map[yIndex][xIndex] - 1;
	if(buildingNo < 0)
	{
		return new Vector2(playerPos.x + playerVel.x, playerPos.y + playerVel.y);
	}
	else
	{
		//Find what position the player is in that building square
		var buildPosX = xPos - (xIndex * this.building[0].length);
		var buildPosY = yPos - (yIndex * this.building[0].length);
		//If the player's moved position would put it inside a building wall, don't move the player
		if(this.building[buildingNo][buildPosY][buildPosX] == 1)
		{
			return playerPos;
		}
		else
		{
			return new Vector2(playerPos.x + playerVel.x, playerPos.y + playerVel.y);
		}
	}	
}

