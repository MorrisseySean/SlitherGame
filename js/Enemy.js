function Enemy(x, y, radius)
{
	this.position = new Vector2(x, y);
	this.radius = radius;
	this.speed = 2;
	this.image = IMAGE.ENEMYSPRITE;
	this.dir = 0;
	this.seen = false;
}

Enemy.prototype.Load = function()
{
}

Enemy.prototype.getPos = function()
{
	return this.position;
}
Enemy.prototype.onSight = function(inSight)
{
	this.seen = inSight;
}
Enemy.prototype.Update = function(playerPos)
{
	if(this.seen == false)
	{
		dx = playerPos.x - this.position.x;
		dy = playerPos.y - this.position.y;
		this.dir = Math.atan2(dy, dx);
		velocity = new Vector2(this.speed * Math.cos(this.dir), this.speed * Math.sin(this.dir));
		this.position.x += velocity.x;
		this.position.y += velocity.y;
	}
}

Enemy.prototype.Draw = function(offsetX, offsetY)
{
	this.image.rotateDraw(new Vector2(((this.position.x - this.radius) - offsetX), ((this.position.y - this.radius) - offsetY)), this.radius, this.radius, this.dir);
}