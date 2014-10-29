//A sprite class that allows the loading, drawing and rotating of sprites.

function Sprite(width, height, str)
{
	this.img = new Image();
	this.width = width;
	this.height = height;
	this.img.src = str;
}

Sprite.prototype.draw = function(position)
{
	canvasCtx.drawImage(this.img, position.x, position.y, this.width, this.height);
}
Sprite.prototype.rotateDraw = function(position, offsetX, offsetY, rotation)
{
	//Draw the sprite rotated about its center
	canvasCtx.save();
	canvasCtx.translate(position.x + offsetX, position.y + offsetY);
	canvasCtx.rotate(rotation);
	canvasCtx.translate(-(position.x + offsetX), -(position.y + offsetY));
	this.draw(position);	
	canvasCtx.restore();
}
