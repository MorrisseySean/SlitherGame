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
	for(var i = 0; i < this.walls.length; i++)
	{
		canvasCtx.fillStyle = rgb(100, 100, 0);
		canvasCtx.fillRect(this.walls[i].position.x - offsetX, this.walls[i].position.y - offsetY, this.walls[i].width, this.walls[i].height);
	}
}
