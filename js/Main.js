var game;

function main()
{
	game = new Game();
	game.initCanvas();
	game.initGame();
	game.gameLoop();
	game.Draw();
}