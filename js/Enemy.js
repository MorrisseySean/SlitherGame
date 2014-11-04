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
Enemy.prototype.Update = function(playerPos, playerDir, keys)
{
	if(this.seen == false)
	{
		
		dx = playerPos.x - this.position.x;
		dy = playerPos.y - this.position.y;
		dist = Math.sqrt((dx * dx) + (dy * dy))
		if(dist > 1500)
		{
			if(Math.floor(Math.random() * 2000) == 1)
			{
				velocity = new Vector2((dist * Math.cos(playerDir)), (dist * Math.sin(playerDir)));
				this.position = new Vector2(playerPos.x + velocity.x, playerPos.y + velocity.y);
			}
		}
		this.dir = Math.atan2(dy, dx);
		velocity = new Vector2(this.speed * Math.cos(this.dir), this.speed * Math.sin(this.dir));
		this.position.x += velocity.x;
		this.position.y += velocity.y;
	}
	if(keys["back"] == true)
	{		
		/*if(dist > 1000)
		{
			velocity = new Vector2(-(1000 * Math.cos(playerDir)), -(1000 * Math.sin(playerDir)));
			this.position = new Vector2(playerPos.x + velocity.x, playerPos.y + velocity.y);
		}
		*/
	}
}

Enemy.prototype.Draw = function(offsetX, offsetY)
{
	this.image.rotateDraw(new Vector2(((this.position.x - this.radius) - offsetX), ((this.position.y - this.radius) - offsetY)), this.radius, this.radius, this.dir);
}