var AUDIO;
function AudioManager()
{
	AUDIO = this;
	this.audioBuffer;
	this.loaded = false;
	this.source = 0;
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
	this.source = audioCtx.createBufferSource();
	//Get the object buffer.
	this.source.buffer = obj.buffer;
	//Set the sound to looping or not
	this.source.loop = obj.loop;
	//Add volume controller
	obj.gainNode = audioCtx.createGain();
	obj.gainNode.gain.value = obj.volume;
	this.source.connect(obj.gainNode);
	//Connect and play the sound starting from 0.
	obj.gainNode.connect(audioCtx.destination);		
	this.source.start(0);
	
	//Tell the object it has started
	obj.playing = true;
}

function stop() 
{
    this.source.noteOff(audioCtx.currentTime); // stop the source immediately
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