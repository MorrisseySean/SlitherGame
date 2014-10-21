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
	
	this.map = [[1,2,0,0,1],
				[0,1,0,1,0],
				[0,2,0,0,0],
				[0,0,2,0,0],
				[0,0,0,1,0]];
	
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

MapManager.prototype.WallCollisionX = function(playerX, playerY)
{
	//Detect collisions between the player and the walls	
	var xPos = Math.floor(playerX/this.size)
	var yPos = Math.floor(playerY/this.size)
	
	//Find which map location the player is in
	var xIndex = Math.floor(xPos/this.building[0].length);	
	var yIndex = Math.floor(yPos/this.building[0].length);
	
	//Find which building is located in the same position as the player
	var buildingNo = this.map[yIndex][xIndex] - 1;
	if(buildingNo < 0)
	{
		return true;
	}
	
	//Find what position the player is in that building square
	var buildPosX = xPos - (xIndex * this.building[0].length);
	var buildPosY = yPos - (yIndex * this.building[0].length);
	return false;
	
}

MapManager.prototype.WallCollisionY = function(playerX, playerY, dir)
{
	xIndex = Math.floor((playerX/this.size)/this.map.length);
	
	yIndex = Math.floor((playerY/this.size)/this.map.length);
}