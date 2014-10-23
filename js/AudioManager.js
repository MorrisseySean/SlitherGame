function AudioManager()
{
	
}

AudioManager.prototype.Load = function()
{
	var audioBuffer;
	
	var request = new XMLHttpRequest();
	request.open('GET', "sounds/creep.mp3", true);
	request.responseType = 'arraybuffer'
	request.onload = function()
	{
		audioCtx.decodeAudioData(request.response, function(buffer){audioBuffer = buffer;}, onError);
	}
	request.send();
}

AudioManager.prototype.Update = function(playerPos, enemyPos)
{
	
}

function onError(e)
{

}