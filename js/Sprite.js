//A sprite class that allows the loading, drawing and rotating of sprites.

function Sprite(width, height)
{
	this.img = new Image();
	this.width = width;
	this.height = height;
}

Sprite.prototype.load = function(str)
{
	this.img.src = str;
}

Sprite.prototype.draw = function(position)
{
	canvasCtx.drawImage(this.img, position.x, position.y, this.width, this.height);
}
Sprite.prototype.rotateDraw = function(position, radius, rotation)
{
	//Draw the sprite rotated about its center
	canvasCtx.save();
	canvasCtx.translate(position.x + radius, position.y + radius);
	canvasCtx.rotate(rotation);
	canvasCtx.translate(-(position.x + radius), -(position.y + radius));
	this.draw(position);	
	canvasCtx.restore();
}
