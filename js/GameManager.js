var building, emptySquare;
//Generates and draws the map and deals with collisions</summary>//

function GameManager()
{
	this.size = 0;
	this.building = [];
	this.map = [];
	this.buildArray = [];
	this.emptySquare = []
	
	//Pickups
	this.pickups = [];
	this.pickups[this.pickups.length] = this.pills = new PickUp(0, 0, "pills", this.size);
	this.pickups[this.pickups.length] = this.battery = new PickUp(0, 0, "battery", this.size);
}

GameManager.prototype.init = function(size)
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
						[0, 0, 0, 1, 5, 1, 0, 1, 0, 0],
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
						[0, 0, 0, 1, 0, 6, 1, 0, 1, 0],
						[0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						
	this.building[2] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
						[0, 0, 0, 1, 6, 1, 0, 1, 1, 0],
						[0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
						[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],						
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
						
	this.building[3] = 	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
						[0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];					
					
}

GameManager.prototype.GenerateMap = function()
{
	//Randomly place buildings on the map every time the game loads.
	for(var i = 0; i < this.map.length; i++)
	{
		for(var j = 0; j < this.map[i].length; j++)
		{
			if(j == Math.ceil(this.map.length/2) && i == Math.ceil(this.map[j].length/2)) //Make the central building the starting building
			{
				this.map[j][i] = new Building(j * this.size * this.building[0].length, i * this.size * this.building[0].length, this.size, this.building[3]);
			}
			else //Place a random building
			{				
				this.map[j][i] = new Building(j * this.size * this.building[0].length, i * this.size * this.building[0].length, this.size, this.building[Math.floor(Math.random() * this.building.length)]);
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
		if(this.pickups[k].getPlaced())
		{
			this.pickups[k].Draw(offsetX, offsetY);
		}
	}
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
	wallArray = this.map[mapPos.x][mapPos.y].walls;
	collides = false;
	for(var i = 0; i < wallArray.length; i++)
	{
		if(wallArray[i].position.x < pos.x + size &&
		wallArray[i].position.x + wallArray[i].width > pos.x - size &&
		wallArray[i].position.y < pos.y + size&&
		wallArray[i].position.y + wallArray[i].width > pos.y - size)
		{
			collides = true;
		}
	}
	return collides;
}

GameManager.prototype.PickUpItems = function(pos, size)
{
	for(var i = 0; i < this.pickups.length; i++)
	{
		dx = pos.x - this.pickups[i].position.x;
		dy = pos.y - this.pickups[i].position.y;		
		if(((dx * dx) + (dy * dy)) < (size + this.size) * (size + this.size))
		{
			this.pickups[i].pickedUp = true;
		}
	}
}

