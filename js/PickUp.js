function PickUp(x, y, value, radius)
{
	this.position = new Vector2(x, y);
	this.value = value;
	this.placed = false;
	if(this.value == "battery")
	{
		this.image = IMAGE.BATTERYSPRITE;
	}
	else if(this.value == "pills")
	{
		this.image = IMAGE.PILLSPRITE;
	}
	
}

PickUp.prototype.getPos = function()
{
	return this.position;
}
PickUp.prototype.getPlaced = function()
{
	return this.placed;
}
PickUp.prototype.setPos = function(x, y)
{
	this.position = new Vector2(x, y);
}

PickUp.prototype.Place = function(x, y)
{
	//Method for placing the pickup on the map
	if(this.placed == false) //Only one of each object is allowed.
	{
		if(Math.floor(Math.random() * 4) == 1)//One in 4 chance of the object being placed in this position
		{
			this.position = new Vector2(x, y);
			this.placed = true;
			console.log(x, y);
		}
	}
}

PickUp.prototype.Draw = function(offsetX, offsetY)
{
	this.image.draw(new Vector2(this.position.x - offsetX, this.position.y - offsetY));
}