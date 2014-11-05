var AUDIO;
function AudioManager()
{
	AUDIO = this;
	this.audioBuffer;
	this.loaded = false;
}

AudioManager.prototype.Load = function(obj)
{
	var request = new XMLHttpRequest();
	request.open('GET', obj.src, true);
	request.responseType = 'arraybuffer'
	request.onload = function()
	{
		audioCtx.decodeAudioData(request.response, function(buffer){obj.buffer = buffer;AUDIO.loaded = true;console.log("Loaded")}, onError);
	}
	request.send();
}

AudioManager.prototype.isLoaded = function()
{
	return AUDIO.loaded;
}
AudioManager.prototype.Update = function(playerPos, enemyPos, gameLoop)
{
	//Use the player position to create ambient sound based on position
	dx = enemyPos.x - playerPos.x;
	dy = enemyPos.y - playerPos.y;
	dist = Math.sqrt((dx * dx) + (dy * dy));
	if(dist < 50)
	{
		AUDIO.setVolume(gameLoop, 2);
	}
	else
	{
		AUDIO.setVolume(gameLoop, 2 - (dist/1500));
	}	
}

function playSound(obj)
{
	//Sets up the sound with the object properties and sets it to play.
	var source = audioCtx.createBufferSource();
	//Get the object buffer.
	source.buffer = obj.buffer;
	//Set the sound to looping or not
	source.loop = obj.loop;
	//Add volume controller
	obj.gainNode = audioCtx.createGain();
	obj.gainNode.gain.value = obj.volume;
	source.connect(obj.gainNode);
	//Connect and play the sound starting from 0.
	obj.gainNode.connect(audioCtx.destination);		
	source.start(0);
	
	//Tell the object it has started
	obj.playing = true;
}
AudioManager.prototype.setVolume = function(obj, change)
{
	obj.gainNode.gain.value = Math.min(2,change);
	obj.gainNode.gain.value = Math.max(0.1,change);
}
function onError(e)
{
	console.log("Error");
}