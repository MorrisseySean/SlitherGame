var building, emptySquare;
//Generates and draws the map and deals with collisions</summary>//

function GameManager()
{
	this.size = 0;
	this.building = [];
	this.map = [];
	this.buildArray = [];
	this.emptySquare = []
	this.pickups = [];	
	this.mapWidth = 0;
	this.mapHeight = 0;
}

GameManager.prototype.init = function(size)
{
	this.size = size;
	
	//Pickups
	this.pickups[this.pickups.length] = this.pills = new PickUp(0, 0, "pills", this.size/2);
	this.pickups[this.pickups.length] = this.battery = new PickUp(0, 0, "battery", this.size/2);
	this.pickups[this.pickups.length] = this.food = new PickUp(0, 0, "food", this.size/2);
	this.pickups[this.pickups.length] = this.bandage = new PickUp(0, 0, "bandage", this.size/2);
	this.pickups[this.pickups.length] = this.lighter = new PickUp(0, 0, "lighter", this.size/2);
	this.pickups[this.pickups.length] = this.water = new PickUp(0, 0, "water", this.size/2);
	
	//Map squares
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
						[0, 1, 7, 0, 8, 0, 9, 1, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 0, 1, 5, 1, 0, 1, 0, 0],
						[0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
						[0, 1, 0, 1, 10, 1, 0, 1, 0, 0],
						[0, 1, 6, 0, 0, 0, 0, 1, 0, 0],
						[0, 1, 1, 1, 1, 1, 0, 1, 0, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
					
	this.building[1] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 6, 0, 0, 10, 1, 0],
						[0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
						[0, 0, 0, 1, 5, 8, 1, 0, 1, 0],
						[0, 1, 0, 0, 9, 1, 1, 0, 0, 0],
						[0, 1, 7, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						
	this.building[2] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 6, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 0, 1, 9, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 8, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 7, 1, 0, 1, 1, 0],
						[0, 1, 0, 1, 10, 1, 0, 0, 0, 0],
						[0, 1, 5, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						
	this.building[3] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
						[0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];					
					
}

GameManager.prototype.GenerateMap = function(player)
{
	//Randomly place buildings on the map every time the game loads.
	for(var i = 0; i < this.map.length; i++)
	{
		for(var j = 0; j < this.map[i].length; j++)
		{
			if(j == Math.ceil(this.map.length/2) && i == Math.ceil(this.map[j].length/2)) //Make the central building the starting building
			{
				this.map[j][i] = new Building(j * this.size * this.building[0].length, i * this.size * this.building[0].length, this.size, this.building[3]);
				player.setPos((j * this.size * this.building[0].length) + (this.size * (this.building[0].length/2)), i * this.size * this.building[0].length + (this.size * (this.building[0].length/2)));
			}
			else //Place a random building
			{				
				this.map[j][i] = new Building(j * this.size * this.building[0].length, i * this.size * this.building[0].length, this.size, this.building[Math.floor(Math.random() * (this.building.length - 1))]);
			}
		}
	}
	
	
	//Load the buildings into an array
	for(var i = 0; i < this.map.length; i++)
	{
		for(var j = 0; j < this.map[i].length; j++)
		{
			this.map[j][i].GenerateBuilding();
		}
	}

	//Load map dimensions into a variable
	this.mapWidth = (this.size * this.building[0][0].length) * this.map[0].length;
	this.mapHeight = (this.size * this.building[0].length) * this.map.length;
}

GameManager.prototype.Draw = function(offsetX, offsetY)
{
	//Calls the draw function for the buildings with the required position based off of the map array
	for(var i = 0; i < this.map.length; i++)
	{
		for(var j = 0; j < this.map.length; j++)
		{
				this.map[i][j].Draw(offsetX, offsetY);
				this.map[j][i].GeneratePickUps(this.pickups);
		}
	}
	
	//Draw pickups if they are placed on the map
	for(var k = 0; k < this.pickups.length; k++)
	{
		if(this.pickups[k].getPlaced() && this.pickups[k].pickedUp == false)
		{
			this.pickups[k].Draw(offsetX, offsetY);
		}
	}
}

GameManager.prototype.DrawHUD = function(sanity)
{
	for(var k = 0; k < this.pickups.length; k++)
	{
		if(this.pickups[k].getPlaced() && this.pickups[k].pickedUp == true)
		{
			this.pickups[k].PickUpDraw();
		}
	}
	//Draw sanity bar
	canvasCtx.fillStyle = rgb(100, 0, 100);
	canvasCtx.fillRect(1200, 10, 300 * sanity/100, 20);
}

GameManager.prototype.CheckWin = function()
{
	totalPickedUp = 0;
	for(var k = 0; k < this.pickups.length; k++)
	{
		if(this.pickups[k].pickedUp == true)
		{
			totalPickedUp++;
		}
	}
	if(totalPickedUp == this.pickups.length)
	{
		return true;
	}
	return false;
}

GameManager.prototype.FindMapIndex = function(pos, size)
{
	//Find the index of an item on the map
	var xPos = 0;
	var yPos = 0;
	xPos = Math.floor((pos.x + size)/this.size)
	yPos = Math.floor((pos.y + size)/this.size)	
	xIndex = Math.floor(xPos/this.building[0].length);	
	yIndex = Math.floor(yPos/this.building[0].length);
	return new Vector2(xIndex, yIndex);	
}

GameManager.prototype.DetectWallCollision = function(pos, size)
{
	//For each wall in the current building square, check if the player collides with the wall.	
	mapPos = this.FindMapIndex(pos, size);
	if(!mapPos)
	{
		var a =1;
	}
	wallArray = this.map[mapPos.x][mapPos.y].walls;
	returnVec = pos;
	xLock=false;
	yLock=false;
	xLO=0;
	yLO=0;
	for(var i = 0; i < wallArray.length; i++)
	{
		wX1 = wallArray[i].position.x;
		wX2 = wallArray[i].position.x + wallArray[i].width;
		wY1 = wallArray[i].position.y;
		wY2 = wallArray[i].position.y + wallArray[i].height;
		if(wX1 < pos.x + size && wX2 > pos.x - size && wY1 < pos.y + size && wY2 > pos.y - size)
		{
			if(pos.x < wX1)
			{
				xOverlap = wX1 - (pos.x + size);
			}
			else
			{
				xOverlap = wX2 - (pos.x - size);
			}
			if(pos.y < wY1)
			{
				yOverlap = wY1 - (pos.y + size) ;
			}
			else
			{
				yOverlap = wY2 - (pos.y - size);
			}
			if(Math.abs(xOverlap) != Math.abs(yOverlap))
			{
				if(Math.abs(xOverlap) < Math.abs(yOverlap))
				{
					pos.x += xOverlap;
				}
				else
				{
					pos.y += yOverlap
				}
			}
		}
	}
	return pos;
}

GameManager.prototype.PickUpItems = function(pos, size)
{
	//Collision detection for a player and an item
	for(var i = 0; i < this.pickups.length; i++)
	{
		if(this.pickups[i].getPlaced() == true)
		{
			dx = pos.x - (this.pickups[i].getPos().x + this.pickups[i].size/2);
			dy = pos.y - (this.pickups[i].getPos().y + this.pickups[i].size/2);		
			if(Math.sqrt((dx * dx) + (dy * dy)) < (size/3 + this.size/3))
			{
				//If the two collide, set the pickup to be picked up.
				this.pickups[i].pickedUp = true;
			}
		}
	}
}

