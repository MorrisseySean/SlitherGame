function Building(x, y, size, building)
{
	this.position = new Vector2(x, y);
	this.size = size;
	this.building = building;
	this.walls = [];
}

Building.prototype.GenerateBuilding = function()
{
	for(var i = 0; i < this.building.length; i++)
	{
		for(var j = 0; j < this.building[0].length; j++)
		{
			if(this.building[i][j] == 1)
			{
				this.walls[this.walls.length] = new Wall(this.position.x + (j * this.size), this.position.y + (i * this.size), this.size, this.size);
			}
		}
	}
}

Building.prototype.GeneratePickUps = function(pickups)
{
	for(var i = 0; i < this.building.length; i++)
	{
		for(var j = 0; j < this.building[0].length; j++)
		{
			if(this.building[i][j] > 4)
			{
				pickups[this.building[i][j] - 5].Place(this.position.x + (j * this.size), this.position.y + (i * this.size), this.size, this.size);
			}
		}
	}
}
Building.prototype.Draw = function(offsetX, offsetY)
{
	//Draw the ground sprites
	for(var i = 0; i < this.building.length; i++)
	{
		for(var j = 0; j < this.building[0].length; j++)
		{
			if(this.building[i][j] < 1)
			{
				IMAGE.GROUNDSPRITE.draw(new Vector2((this.position.x + (j * this.size)) - offsetX, (this.position.y + (i * this.size)) - offsetY));	
			}	
			else
			{
				IMAGE.FLOORSPRITE.draw(new Vector2((this.position.x + (j * this.size)) - offsetX, (this.position.y + (i * this.size)) - offsetY));	
			}
		}
	}
	//Draw walls
	for(var i = 0; i < this.walls.length; i++)
	{
		//canvasCtx.fillStyle = rgb(60, 60, 60);
		this.walls[i].image.draw(new Vector2(this.walls[i].position.x - offsetX, this.walls[i].position.y - offsetY));
		//canvasCtx.fillRect(this.walls[i].position.x - offsetX, this.walls[i].position.y - offsetY, this.walls[i].width, this.walls[i].height);
	}
	
}
