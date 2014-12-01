var game, GAMESIZE;

function main()
{
	GAMESIZE = window.innerWidth/15;
	window.IMAGE = {};
	LoadAssets();
	game = new Game();
	game.init();
	game.gameLoop();
}

function LoadAssets()
{	
	IMAGE.NOTE = new Sprite(window.innerWidth, window.innerHeight, "images/note.png");
	IMAGE.GROUNDSPRITE = new Sprite(GAMESIZE * 2, GAMESIZE * 2, "images/ground.png");
	IMAGE.FLOORSPRITE = new Sprite(GAMESIZE * 2, GAMESIZE * 2, "images/wood.png");
	IMAGE.WALLSPRITE = new Sprite(GAMESIZE * 2, GAMESIZE * 2, "images/wall.png");
	IMAGE.PLAYERSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/player.png");
	IMAGE.ENEMYSPRITE = new Sprite(GAMESIZE * 2, GAMESIZE * 2, "images/monster.png");
	IMAGE.FLASHLIGHTSPRITE = new Sprite(window.innerWidth * 2, window.innerHeight * 4, "images/flashlight.png");
	IMAGE.DARKNESS = new Sprite(window.innerWidth * 2, window.innerHeight * 4, "images/darkness.png");
	IMAGE.BATTERYSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/battery.png");
	IMAGE.PILLSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/pills.png");
	IMAGE.FOODSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/food.png");
	IMAGE.WATERSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/water.png");
	IMAGE.LIGHTERSPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/lighter.png");
	IMAGE.BANDAGESPRITE = new Sprite(GAMESIZE, GAMESIZE, "images/bandage.png");
}

function Loading()
{
	
}