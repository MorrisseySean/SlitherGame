var game;

function main()
{
	game = new Game();
	game.initCanvas();
	game.initMaps();
	game.initGame();
	game.gameLoop();
	game.Draw();
}