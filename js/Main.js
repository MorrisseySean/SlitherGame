var game;

function main()
{
	window.IMAGE = {};
	LoadAssets();
	game = new Game();
	game.init();
	game.gameLoop();
}

function LoadAssets()
{
	GAMESIZE = 50;	
	
	IMAGE.PLAYERSPRITE = new Sprite(GAMESIZE * 2, GAMESIZE * 2, "images/player.png");
	IMAGE.ENEMYSPRITE = new Sprite(GAMESIZE * 4, GAMESIZE * 4, "images/monster.png");
	IMAGE.FLASHLIGHTSPRITE = new Sprite(window.innerWidth * 2, window.innerHeight * 4, "images/flashlight.png");
	IMAGE.BATTERYSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/battery.png");
	IMAGE.PILLSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/pills.png")
}