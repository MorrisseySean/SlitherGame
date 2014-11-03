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
	IMAGE.GAMESIZE = 100;	
	
	IMAGE.PLAYERSPRITE = new Sprite(IMAGE.GAMESIZE, IMAGE.GAMESIZE, "images/player.png");
	IMAGE.ENEMYSPRITE = new Sprite(IMAGE.GAMESIZE * 2, IMAGE.GAMESIZE * 2, "images/monster.png");
	IMAGE.FLASHLIGHTSPRITE = new Sprite(window.innerWidth * 2, window.innerHeight * 4, "images/flashlight.png");
	IMAGE.BATTERYSPRITE = new Sprite(IMAGE.GAMESIZE, IMAGE.GAMESIZE, "images/battery.png");
	IMAGE.PILLSPRITE = new Sprite(IMAGE.GAMESIZE, IMAGE.GAMESIZE, "images/pills.png")
	IMAGE.FOODSPRITE = new Sprite(IMAGE.GAMESIZE, IMAGE.GAMESIZE, "images/food.png");
}