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
AudioManager.prototype.Update = function(playerPos, enemyPos)
{
	
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
	//Connect and play the sound starting from 0.
	source.connect(audioCtx.destination);
	source.connect(obj.gainNode);	
	source.start(0);
	
	//Tell the object it has started
	obj.playing = true;
}

function onError(e)
{
	console.log("Error");
}