function Enemy(x, y, radius)
{
	this.position = new Vector2(x, y);
	this.radius = radius;
	this.speed = 2;
	this.image = new Sprite(radius * 2, radius * 2);
	this.dir = 0;
}

Enemy.prototype.Load = function()
{
	this.image.load("images/monster.png");
}

Enemy.prototype.getPos = function()
{
	return this.position;
}
Enemy.prototype.Update = function(playerPos)
{
	dx = playerPos.x - this.position.x;
	dy = playerPos.y - this.position.y;
	this.dir = Math.atan2(dy, dx);
	velocity = new Vector2(this.speed * Math.cos(this.dir), this.speed * Math.sin(this.dir));
	this.position.x += velocity.x;
	this.position.y += velocity.y;
}

Enemy.prototype.Draw = function(offsetX, offsetY)
{
	this.image.rotateDraw(new Vector2(((this.position.x - this.radius) - offsetX), ((this.position.y - this.radius) - offsetY)), this.radius, this.radius, this.dir);
}