function PickUp(x, y, value, radius)
{
	this.position = new Vector2(x, y);
	this.placed = false;
	this.pickedUp = false;
	this.size = radius;
	if(value == "battery")
	{
		this.image = IMAGE.BATTERYSPRITE;
		this.value = 0;
	}
	else if(value == "pills")
	{
		this.image = IMAGE.PILLSPRITE;		
		this.value = 1;
	}
	
}

//Get Methods//
PickUp.prototype.getPos = function()
{
	return this.position;
}
PickUp.prototype.getPlaced = function()
{
	return this.placed;
}
///////////////

//Set Methods//
PickUp.prototype.setPos = function(x, y)
{
	this.position = new Vector2(x, y);
}
//////////////

PickUp.prototype.Place = function(x, y)
{
	//Method for placing the pickup on the map
	if(this.placed == false) //Don't move the object once placed
	{
		if(Math.floor(Math.random() * 30) == 1)//One in 4 chance of the object being placed in this position
		{
			//Place the object at desired position and set it to placed.
			this.position = new Vector2(x, y);
			this.placed = true;
		}
	}
}

PickUp.prototype.Draw = function(offsetX, offsetY)
{
	if(this.pickedUp != true)
	{
		this.image.draw(new Vector2((this.position.x + this.size/2) - offsetX, (this.position.y + this.size/2) - offsetY));
	}
}
PickUp.prototype.PickUpDraw = function()
{
	if(this.pickedUp == true)
	{
		this.image.draw(new Vector2(this.size * this.value, 10));
	}
}