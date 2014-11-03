function Wall(x, y, width, height)
{
	this.position = new Vector2(x, y);
	this.width = width;
	this.height = height;
	this.image = IMAGE.WALLSPRITE;
}

