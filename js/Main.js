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
	IMAGE.GAMESIZE = 50;	
	
	IMAGE.PLAYERSPRITE = new Sprite(IMAGE.GAMESIZE * 2, IMAGE.GAMESIZE * 2, "images/player.png");
	IMAGE.ENEMYSPRITE = new Sprite(IMAGE.GAMESIZE * 4, IMAGE.GAMESIZE * 4, "images/monster.png");
	IMAGE.FLASHLIGHTSPRITE = new Sprite(window.innerWidth * 2, window.innerHeight * 4, "images/flashlight.png");
	IMAGE.BATTERYSPRITE = new Sprite(IMAGE.GAMESIZE * 2, IMAGE.GAMESIZE * 2, "images/battery.png");
	IMAGE.PILLSPRITE = new Sprite(IMAGE.GAMESIZE * 2, IMAGE.GAMESIZE * 2, "images/pills.png")
}