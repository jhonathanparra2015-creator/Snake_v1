////////////////////////////////////////////////////////////
// GAME v1.2
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

//themes array
var themesArr = [
	{
		src:"assets/snake_07.png",
		feed:"assets/snake_feed_07.png",
		brick:"assets/snake_brick_07.png",
		score:["assets/snake_score_07.png"],
		stroke:{
			stroke:15,
			color:"#7b552d",
			dashed:[12, 20],
			dashedColor:"#9A6B38",
		},
		design:{
			wall:"#E19800",
			floor:"#FFC837",
		}
	},
	{
		src:"assets/snake_06.png",
		feed:"assets/snake_feed_06.png",
		brick:"assets/snake_brick_06.png",
		score:["assets/snake_score_06.png"],
		stroke:{
			stroke:20,
			color:"#0060d3",
		},
		design:{
			wall:"#39741C",
			floor:"#A2D532",
		}
	},
	{
		src:"assets/snake_05.png",
		feed:"assets/snake_feed_05.png",
		brick:"assets/snake_brick_05.png",
		score:["assets/snake_score_05.png"],
		design:{
			wall:"#724125",
			floor:"#2EA613",
		}
	},
	{
		src:"assets/snake_04.png",
		feed:"assets/snake_feed_04.png",
		brick:"assets/snake_brick_04.png",
		score:["assets/snake_score_03_a.png","assets/snake_score_03_b.png","assets/snake_score_03_c.png"],
		design:{
			wall:"#56558E",
			floor:"#B2B3F5",
		}
	},
	{
		src:"assets/snake_03.png",
		feed:"assets/snake_feed_03.png",
		brick:"assets/snake_brick_03.png",
		score:["assets/snake_score_03_a.png","assets/snake_score_03_b.png","assets/snake_score_03_c.png"],
		design:{
			wall:"#5B4E45",
			floor:"#837934",
		}
	},
	{
		src:"assets/snake_02.png",
		feed:"assets/snake_feed_02.png",
		brick:"assets/snake_brick_02.png",
		score:["assets/snake_score_02.png"],
		design:{
			wall:"#000",
			floor:"#94D300",
		}
	},
	{
		src:"assets/snake_01.png",
		feed:"assets/snake_feed_01.png",
		brick:"assets/snake_brick_01.png",
		score:["assets/snake_score_01.png"],
		stroke:{
			stroke:30,
			color:"#000",
		},
		design:{
			wall:"#556642",
			floor:"#85A166",
		}
	},
	{
		src:"assets/snake_00.png",
		feed:"assets/snake_feed_00.png",
		brick:"assets/snake_brick_00.png",
		score:["assets/snake_score_00.png"],
		design:{
			wall:"#000",
			floor:"#abcc9a",
		}
	}
]

//classic settings
var defaultSettings = {
	row:12,
	column:19,
	wall:false,
	brick:true
};

//adventure settings
var adventureSettings = {
	enable:false,
	rowMin:10,
	rowMax:30,
	columnMin:10,
	columnMax:30,
	wall:true,
	brick:true
};

//game settings
var gameSettings = {
	gridSize:40,
	wallSize:10,
	showScreenControl:true, // true always show control, false for auto detect for touch devices
	screenControlSide:true, //true for right, false for left
	screenControlAlpha:.6,
	keyboard:{ //keyboard keycode
		up:[87,38],
		left:[65,37],
		right:[68,39],
		down:[83,40],
	},
	snakeLength:5,
	level:{
		speed:200,
		speedTimes:3, //total level times to incease speed
		speedIncrease:10,
		score:100,
		brickTimes:3 //total brick times to increase brick
	}
};

//game text display
var textDisplay = {
	adventureTitle:'ADVENTURE',
	adventureSize:'Grid Size',
	adventureWall:'WALL',
	adventureBrick:'BRICK',
	gridSize:'[COLUMN] x [ROW]',
	point:'SCORE : [NUMBER]',
	level:'LVL : [NUMBER]',
	brick:': [NUMBER]',
	gameover:'GAME OVER',
	exitTitle:'EXIT GAME',
	exitMessage:'Are you sure you want\nto quit game?',
	share:'Share your score:',
	resultTitle:'GAME OVER',
	resultDesc:'[NUMBER]',
}

//Social share, [SCORE] will replace with game score
var shareEnable = false; //toggle share
var shareTitle = 'Highscore on Snake Game is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Snake Game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var playerData = {score:0, level:0, brick:0};
var gameData = {paused:true, themeNum:0, type:'classic', control:false, adventure:{row:0, column:0, wall:false, brick:false}, settings:{}, grid:[], area:[], snake:[], snakeFeed:[], score:[], brick:[], level:{speed:0, speedTimes:0, brickTimes:0}, dir:"", nextDir:"", increase:false, complete:false};
var tweenData = {score:0, tweenScore:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});
	
	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});
	if($.browser.mobile || isTablet){
		
	}else{
		var isInIframe = (window.location != window.parent.location) ? true : false;
		if(isInIframe){
			this.document.onkeydown = keydown;
			this.document.onkeyup = keyup;
		
			$(window).blur(function() {
				appendFocusFrame();
			});
			appendFocusFrame();
        }else{
            this.document.onkeydown = keydown;
			this.document.onkeyup = keyup;
        }
	}

	buttonClassic.cursor = "pointer";
	buttonClassic.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'classic';
		goPage("game");
	});

	buttonAdventure.cursor = "pointer";
	buttonAdventure.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'adventure';
		goPage("theme");
	});

	buttonArrowL.cursor = "pointer";
	buttonArrowL.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleTheme(false);
	});

	buttonArrowR.cursor = "pointer";
	buttonArrowR.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleTheme(true);
	});

	buttonSelectTheme.cursor = "pointer";
	buttonSelectTheme.addEventListener("click", function(evt) {
		playSound('soundButton2');
		if(gameData.type == "classic"){
			goPage("game");
		}else{
			goPage("adventure");
		}
	});

	

	buttonRowL.cursor = "pointer";
	buttonRowL.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleAdventureRow(false);
	});

	buttonRowR.cursor = "pointer";
	buttonRowR.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleAdventureRow(true);
	});

	buttonColumnL.cursor = "pointer";
	buttonColumnL.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleAdventureColumn(false);
	});

	buttonColumnR.cursor = "pointer";
	buttonColumnR.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleAdventureColumn(true);
	});

	buttonAdventureStart.cursor = "pointer";
	buttonAdventureStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('main');
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}
	
	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
		
		stopAudio();
		stopGame();
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
	});

	$.radio[0].cursor = "pointer";
	$.radio[0].addEventListener("click", function(evt) {
		playSound('soundButton');
		toggleRadio("wall");
	});

	$.radio[1].cursor = "pointer";
	$.radio[1].addEventListener("click", function(evt) {
		playSound('soundButton');
		toggleRadio("brick");
	});

	gameData.adventure.column = adventureSettings.columnMin;
	gameData.adventure.row = adventureSettings.rowMin;
	gameData.adventure.wall = adventureSettings.wall;
	gameData.adventure.brick = adventureSettings.brick;

	if(adventureSettings.wall){
		$.radio[0].gotoAndStop("enable");
	}else{
		$.radio[0].gotoAndStop("disable");
	}

	if(adventureSettings.brick){
		$.radio[1].gotoAndStop("enable");
	}else{
		$.radio[1].gotoAndStop("disable");
	}
	checkAdventureSettings();
	setupTouchControl();
}

function appendFocusFrame(){
	$('#mainHolder').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	$('#focus').click(function(){
		$('#focus').remove();
	});	
}


/*!
 * 
 * KEYBOARD EVENTS - This is the function that runs for keyboard events
 * 
 */
function keydown(event) {
	if(gameSettings.keyboard.left.indexOf(event.keyCode) != -1){
		gameData.moveControl.left = true;
	}else if(gameSettings.keyboard.right.indexOf(event.keyCode) != -1){
		gameData.moveControl.right = true;
	}else if(gameSettings.keyboard.up.indexOf(event.keyCode) != -1){
		gameData.moveControl.up = true;
	}else if(gameSettings.keyboard.down.indexOf(event.keyCode) != -1){
		gameData.moveControl.down = true;
	}
}

function keyup(event) {
	if(gameSettings.keyboard.left.indexOf(event.keyCode) != -1){
		gameData.moveControl.left = false;
	}else if(gameSettings.keyboard.right.indexOf(event.keyCode) != -1){
		gameData.moveControl.right = false;
	}else if(gameSettings.keyboard.up.indexOf(event.keyCode) != -1){
		gameData.moveControl.up = false;
	}else if(gameSettings.keyboard.down.indexOf(event.keyCode) != -1){
		gameData.moveControl.down = false;
	}
}

/*!
 * 
 * TOGGLE GAME TYPE - This is the function that runs to toggle game type
 * 
 */
function toggleRadio(con){
	if(gameData.adventure[con]){
		gameData.adventure[con] = false;
	}else{
		gameData.adventure[con] = true;
	}

	var radioIndex = con == "wall" ? 0 : 1;
	if(gameData.adventure[con]){
		$.radio[radioIndex].gotoAndStop("enable");
	}else{
		$.radio[radioIndex].gotoAndStop("disable");
	}
}

function toggleTheme(con){
	if(con){
		gameData.themeNum++;
		gameData.themeNum = gameData.themeNum > themesArr.length-1 ? 0 : gameData.themeNum;
	}else{
		gameData.themeNum--;
		gameData.themeNum = gameData.themeNum < 0 ? themesArr.length-1 : gameData.themeNum;
	}

	buildGrid();
}

function toggleAdventureRow(con){
	if(con){
		gameData.adventure.row++;
		gameData.adventure.row = gameData.adventure.row > adventureSettings.rowMax ? adventureSettings.rowMax : gameData.adventure.row;
	}else{
		gameData.adventure.row--;
		gameData.adventure.row = gameData.adventure.row < adventureSettings.rowMin ? adventureSettings.rowMin : gameData.adventure.row;
	}

	checkAdventureSettings();
}

function toggleAdventureColumn(con){
	if(con){
		gameData.adventure.column++;
		gameData.adventure.column = gameData.adventure.column > adventureSettings.columnMax ? adventureSettings.columnMax : gameData.adventure.column;
	}else{
		gameData.adventure.column--;
		gameData.adventure.column = gameData.adventure.column < adventureSettings.columnMin ? adventureSettings.columnMin : gameData.adventure.column;
	}

	checkAdventureSettings();
}

function checkAdventureSettings(){
	var gridSize = textDisplay.gridSize.replace('[COLUMN]', gameData.adventure.column);
	gridSize = gridSize.replace('[ROW]', gameData.adventure.row);

	sizeTxt.text = gridSize;
}

/*!
 * 
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 * 
 */
function togglePop(con){
	confirmContainer.visible = con;
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	themeContainer.visible = false;
	adventureContainer.visible = false;
	gridContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	stopGame();
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
		break;

		case 'theme':
			targetContainer = themeContainer;
			gridContainer.visible = true;

			gameData.settings = {
				row:15,
				column:15,
				wall:defaultSettings.wall,
				brick:defaultSettings.brick
			};
			gameData.paused = false;
			buildGrid();
		break;

		case 'adventure':
			targetContainer = adventureContainer;
		break;
		
		case 'game':
			targetContainer = gameContainer;
			gridContainer.visible = true;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			stopGame();
			togglePop(false);
			
			playSound('soundResult');
			tweenData.tweenScore = 0;
			TweenMax.to(tweenData, .5, {tweenScore:playerData.score, overwrite:true, onUpdate:function(){
				resultDescTxt.text = resultDescShadowTxt.text = textDisplay.resultDesc.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
			}});

			saveGame(playerData.score);
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

/*!
 * 
 * START GAME - This is the function that runs to start game
 * 
 */
function startGame(){
	gameData.paused = false;
	gameData.complete = false;
	gameData.control = true;

	gameData.moveControl = {
		left:false,
		right:false,
		up:false,
		down:false
	}

	if(gameData.type == 'classic'){
		gameData.settings = {
			row:defaultSettings.row,
			column:defaultSettings.column,
			wall:defaultSettings.wall,
			brick:defaultSettings.brick
		};
	}else{
		gameData.settings = {
			row:gameData.adventure.row,
			column:gameData.adventure.column,
			wall:gameData.adventure.wall,
			brick:gameData.adventure.brick,
		};
	}

	brickContainer.removeAllChildren();
	gameData.brick = [];
	
	statusContainer.alpha = 0;
	buildGrid();
	updateBrickIcon();
	updateGameStats();
	playSound('soundStart');
	
	touchContainer.visible = false;
	if(gameSettings.showScreenControl){
		touchContainer.visible = true;
		touchContainer.alpha = gameSettings.screenControlAlpha;
	}else{
		if($.browser.mobile || isTablet){
			touchContainer.visible = true;
			touchContainer.alpha = gameSettings.screenControlAlpha;
		}
	}
}

function setupSnakeLevel(){
	tweenData.tweenScore = 0;
	playerData.score = 0;
	playerData.level = 0;
	playerData.brick = 0;

	gameData.level.speed = gameSettings.level.speed;
	gameData.level.speedTimes = 0;
	gameData.level.brickTimes = 0;
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
 function stopGame(){
	gameData.paused = true;
	gameData.control = false;
	TweenMax.killAll(false, true, false);
}

function saveGame(score){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}


/*!
 * 
 * BUILD GRID - This is the function that runs to build grid
 * 
 */
function buildGrid(){
	bgContainer.removeAllChildren();
	bgContainer.removeAllChildren();
	brickContainer.removeAllChildren();

	gameData.grid = [];
	gameData.area = [];

	var positionData = {x:0, y:0};
	var gridSize = gameSettings.gridSize;
	for(var r=0; r<gameData.settings.row; r++){
		gameData.grid.push([]);
		gameData.area.push([]);
		for(var c=0; c<gameData.settings.column; c++){
			var bgGrid = new createjs.Shape();
			bgGrid.graphics.beginFill(themesArr[gameData.themeNum].design.floor).drawRect(-(gridSize/2),-(gridSize/2),gridSize+1,gridSize+1);
			bgGrid.x = positionData.x;
			bgGrid.y = positionData.y;
			bgGrid.visible = false;
			bgContainer.addChild(bgGrid);
			positionData.x += gridSize;

			gameData.grid[r][c] = bgGrid;
			gameData.area[r][c] = 0;
		}

		positionData.x = 0;
		positionData.y += gridSize;
	}

	gameData.settings.width = (gameData.settings.column * gridSize) - (gridSize);
	gameData.settings.height = (gameData.settings.row * gridSize) - (gridSize);

	gridWall.graphics.clear();
	gridGround.graphics.clear();
	gridMask.graphics.clear();
	gridWall.graphics.beginFill(themesArr[gameData.themeNum].design.wall).drawRect(-(gameSettings.wallSize + (gridSize/2)),-(gameSettings.wallSize + (gridSize/2)),gameData.settings.width+gridSize+(gameSettings.wallSize*2), gameData.settings.height+gridSize+(gameSettings.wallSize*2));
	gridGround.graphics.beginFill(themesArr[gameData.themeNum].design.floor).drawRect(-((gridSize/2)),-((gridSize/2)),gameData.settings.width+gridSize, gameData.settings.height+gridSize);
	gridMask.graphics.beginFill("red").drawRect(0,0,(gameData.settings.column * gridSize), (gameData.settings.row * gridSize));
	gridMask.x = -(gridSize/2);
	gridMask.y = -(gridSize/2);
	maskContainer.mask = gridMask;

	gameData.dir = gameData.nextDir = "right";
	setupSnakeLevel();
	createSnake();
	insertType("score");
	
	if(curPage == "theme"){
		var snakeRow = gameData.snake[0].row;
		for(var n=0; n<10; n++){
			insertType("brick", snakeRow);
		}
	}

	resizeGrid();

	toggleLoopSnake(true);
}

function resizeGrid(){
	gridContainer.scaleX = gridContainer.scaleY = 1;
	var minBoardHeight = 450;
	var minBoardWidth = 780;
	if(!viewport.isLandscape){
		minBoardHeight = 750;
		minBoardWidth = 530;
	}
	var boardScaleX = 1;
	var boardScaleY = 1;

	if(gameData.settings.height > minBoardHeight){
		boardScaleY = minBoardHeight/gameData.settings.height;
	}

	if(gameData.settings.width > minBoardWidth){
		boardScaleX = minBoardWidth/gameData.settings.width;
	}

	if(boardScaleX < boardScaleY){
		gridContainer.scaleX = gridContainer.scaleY = boardScaleX;
	}else{
		gridContainer.scaleX = gridContainer.scaleY = boardScaleY;
	}

	var radio = gridContainer.scaleX;
	var gridSize = gameSettings.gridSize * radio;
	var wallSize = gameSettings.wallSize * radio;
	gridContainer.x = (canvasW/2) - ((gameData.settings.width*radio)/2);
	gridContainer.y = (canvasH/2) - ((gameData.settings.height*radio)/2);

	levelStatusContainer.x = canvasW/2 - (((gameData.settings.width*radio)/2) + (gridSize/2));
	levelStatusContainer.y = canvasH/2 - (((gameData.settings.height*radio)/2) + ((gridSize/2) + (wallSize) + 10));
	brickStatusContainer.x = levelStatusContainer.x + 160;
	brickStatusContainer.y = levelStatusContainer.y;

	scoreStatusContainer.x = canvasW/2;
	scoreStatusContainer.y = canvasH/2 + (((gameData.settings.height*radio)/2) + ((gridSize/2) + (wallSize) + 35));
}

/*!
 * 
 * CREATE SNAKE - This is the function that runs to show create snake
 * 
 */
function createSnake(){
	snakeContainer.removeAllChildren();
	gameData.snake = [];
	gameData.snakeFeed = [];
	gameData.increase = false;

	var snakeLength = gameSettings.snakeLength;
	snakeLength = snakeLength > gameData.settings.column ? gameData.settings.column-2 : snakeLength;
	var thisRow = Math.floor(gameData.settings.row/2);
	var thisColumn = Math.floor(gameData.settings.column/2) + Math.floor(snakeLength/2);

	for(var n=0; n<snakeLength; n++){
		var newSnake = createSnakeShape();
		gameData.snake.push(newSnake);

		gameData.area[thisRow][thisColumn] = 1;
		newSnake.x = gameData.grid[thisRow][thisColumn].x;
		newSnake.y = gameData.grid[thisRow][thisColumn].y;
		newSnake.nextX = newSnake.x;
		newSnake.nextY = newSnake.y;
		newSnake.base = {x:newSnake.x, y:newSnake.y};
		newSnake.row = thisRow;
		newSnake.column = thisColumn;
		thisColumn--;
	}

	checkSnakeRotation();
}

function createSnakeShape(){
	var _speed = 1;
	var _frameW = 42;
	var _frameH = 42;
	var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "width": _frameW, "count": 6};
	var _animations = {
						idle:{frames: [0], speed:_speed},
						tongue:{frames: [1], speed:_speed},
						eat:{frames: [2], speed:_speed},
						body:{frames: [3], speed:_speed},
						bodybend:{frames: [4], speed:_speed},
						tail:{frames: [5], speed:_speed}
					};
						
	var snakeData = new createjs.SpriteSheet({
		"images": [loader.getResult("snake"+gameData.themeNum)],
		"frames": _frame,
		"animations": _animations
	});

	var newSnake = new createjs.Sprite(snakeData, "idle");

	snakeContainer.addChild(newSnake);
	return newSnake;
}

/*!
 * 
 * INSERR TYPE - This is the function that runs to insert score and brick
 * 
 */
function insertType(type, excludeRow){
	if(type == "score"){
		if(gameData.score.length > 0){
			TweenMax.killTweensOf(gameData.score[0]);
		}
		scoreContainer.removeAllChildren();
		gameData.score = [];
	}

	//find space
	var spaceArr = [];
	for(var r=0; r<gameData.settings.row; r++){
		for(var c=0; c<gameData.settings.column; c++){
			if(gameData.area[r][c] == 0){
				var skipRow = false;
				if(excludeRow != undefined){
					if(excludeRow == r){
						skipRow = true;
					}
				}

				if(!skipRow){
					spaceArr.push({r:r, c:c});
				}
			}
		}
	}

	//insert score
	shuffle(spaceArr);

	var newType;
	var typeIndex = 2;
	if(type == "score"){
		var randomScoreIndex = Math.floor(Math.random() * themesArr[gameData.themeNum].score.length);
		newType = new createjs.Bitmap(loader.getResult('snakeScore'+randomScoreIndex+'_'+gameData.themeNum));
		centerReg(newType);
		scoreContainer.addChild(newType);
		gameData.score.push(newType);
		animateScore(newType);
	}else{
		typeIndex = 3;
		newType = new createjs.Bitmap(loader.getResult('snakeBrick'+gameData.themeNum));
		centerReg(newType);
		brickContainer.addChild(newType);
		gameData.brick.push(newType);

		if(curPage == "game")
			playSound("soundBrick");
	}

	gameData.area[spaceArr[0].r][spaceArr[0].c] = typeIndex;
	newType.x = gameData.grid[spaceArr[0].r][spaceArr[0].c].x;
	newType.y = gameData.grid[spaceArr[0].r][spaceArr[0].c].y;
}

function animateScore(obj){
	var tweenSpeed = .3;
	TweenMax.to(obj, tweenSpeed, {scaleX:.7, scaleY:.7, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {scaleX:1, scaleY:1, overwrite:true, onComplete:animateScore, onCompleteParams:[obj]});
	}});
}

/*!
 * 
 * UPDATE SNAKE BODY - This is the function that runs to update snake body
 * 
 */
function checkSnakeRotation(){
	for(var n=0; n<gameData.snake.length; n++){
		var thisSnake = gameData.snake[n];
		getSnakeRotation(n,thisSnake);
	}
}

function getSnakeRotation(index,thisSnake){
	var girdSize = gameSettings.gridSize;
	thisSnake.rotation = 0;
	thisSnake.scaleX = thisSnake.scaleY = 1;

	if(index == 0){
		if(gameData.nextDir == "right"){
			thisSnake.scaleX = -1;
			thisSnake.rotation = 90;
		}else if(gameData.nextDir == "down"){
			thisSnake.rotation = 180;
		}else if(gameData.nextDir == "left"){
			thisSnake.rotation = 270;
		}
	}else if(index < gameData.snake.length-1){
		var nextGrid = gameData.snake[index-1];
		var currentGrid = thisSnake;
		var lastGrid = gameData.snake[index+1];

		if(getDistance(nextGrid.x, nextGrid.y, currentGrid.x, currentGrid.y) > gameSettings.gridSize){
			if(currentGrid.x == nextGrid.x){
				if(nextGrid.y > currentGrid.y){
					nextGrid = {x:currentGrid.x, y:currentGrid.y - girdSize};
				}else{
					nextGrid = {x:currentGrid.x, y:currentGrid.y + girdSize};
				}
			}else if(currentGrid.y == nextGrid.y){
				if(nextGrid.x > currentGrid.x){
					nextGrid = {x:currentGrid.x-girdSize, y:currentGrid.y};
				}else{
					nextGrid = {x:currentGrid.x+girdSize, y:currentGrid.y};
				}
			}
		}

		if(getDistance(lastGrid.x, lastGrid.y, currentGrid.x, currentGrid.y) > gameSettings.gridSize){
			if(currentGrid.x == lastGrid.x){
				if(lastGrid.y > currentGrid.y){
					lastGrid = {x:currentGrid.x, y:currentGrid.y - girdSize};
				}else{
					lastGrid = {x:currentGrid.x, y:currentGrid.y + girdSize};
				}
			}else if(currentGrid.y == lastGrid.y){
				if(lastGrid.x > currentGrid.x){
					lastGrid = {x:currentGrid.x-girdSize, y:currentGrid.y};
				}else{
					lastGrid = {x:currentGrid.x+girdSize, y:currentGrid.y};
				}
			}
		}

		if(nextGrid.x == currentGrid.x && lastGrid.x == currentGrid.x){
			//straight
			thisSnake.gotoAndStop("body");
		}else if(nextGrid.y == currentGrid.y && lastGrid.y == currentGrid.y){
			//straight
			thisSnake.gotoAndStop("body");
			thisSnake.rotation = 90;
		}else{
			//corner
			thisSnake.gotoAndStop("bodybend");
			if(lastGrid.x < currentGrid.x && nextGrid.y < currentGrid.y ){
				//left top
				thisSnake.rotation = 90;
			}else if(lastGrid.x < currentGrid.x && nextGrid.y > currentGrid.y ){
				//left bottom

			}else if(lastGrid.x > currentGrid.x && nextGrid.y < currentGrid.y ){
				//right top
				thisSnake.rotation = -180;
			}else if(lastGrid.x > currentGrid.x && nextGrid.y > currentGrid.y ){
				//right bottom
				thisSnake.rotation = -90;
			}else if(lastGrid.y < currentGrid.y && nextGrid.x < currentGrid.x ){
				//top left
				thisSnake.rotation = 90;
			}else if(lastGrid.y < currentGrid.y && nextGrid.x > currentGrid.x ){
				//top right
				thisSnake.rotation = 180;
			}else if(lastGrid.y > currentGrid.y && nextGrid.x < currentGrid.x ){
				//bottom left
				
			}else if(lastGrid.y > currentGrid.y && nextGrid.x > currentGrid.x ){
				//bottom right
				thisSnake.rotation = -90;
			}
		}
	}else{
		thisSnake.gotoAndStop("tail");
		var nextGrid = gameData.snake[index-1];
		var currentGrid = thisSnake;
		if(getDistance(nextGrid.x, nextGrid.y, currentGrid.x, currentGrid.y) > gameSettings.gridSize){
			if(nextGrid.x == currentGrid.x){
				if(nextGrid.y > currentGrid.y){
					thisSnake.rotation = 0;
				}else{
					thisSnake.rotation = 180;
				}
			}else if(nextGrid.y == currentGrid.y){
				if(nextGrid.x > currentGrid.x){
					thisSnake.rotation = -90;
				}else{
					thisSnake.rotation = 90;
				}
			}
		}else{
			if(nextGrid.x == currentGrid.x){
				if(nextGrid.y > currentGrid.y){
					thisSnake.rotation = 180;
				}
			}else if(nextGrid.y == currentGrid.y){
				if(nextGrid.x > currentGrid.x){
					thisSnake.rotation = 90;
				}else{
					thisSnake.rotation = -90;
				}
			}
		}
	}
}

/*!
 * 
 * LOOP SNAKE - This is the function that runs to loop snake
 * 
 */

function toggleLoopSnake(con){
	if(con){
		gameData.loopSnake = true;
		gameData.startDate = new Date();
	}else{
		gameData.loopSnake = false;
	}
}

function loopSnake(){
	var hitWall = false;
	var hitBrick = false;
	var hitObject = false;
	var hitScore = false;
	var extend = false;
	var lastRow = -1;
	var lastColumn = -1;
	var exctendSnake;
	var smoothAnimation = themesArr[gameData.themeNum].stroke == undefined ? false : true;

	if(gameData.increase){
		gameData.increase = false;
		var row = gameData.snake[0].row;
		var column = gameData.snake[0].column;

		exctendSnake = createSnakeShape();
		exctendSnake.x = gameData.grid[row][column].x;
		exctendSnake.y = gameData.grid[row][column].y;
		exctendSnake.nextX = exctendSnake.x;
		exctendSnake.nextY = exctendSnake.y;
		exctendSnake.base = {x:exctendSnake.x, y:exctendSnake.y};
		exctendSnake.row = row;
		exctendSnake.column = column;
		exctendSnake.visible = false;

		gameData.snake.unshift(exctendSnake);
		extend = true;
	}

	for(var n=0; n<gameData.snake.length; n++){
		var thisSnake = gameData.snake[n];
		
		var row = thisSnake.row;
		var column = thisSnake.column;
		if(n == 0){
			if(gameData.nextDir == "left"){
				column--;
			}else if(gameData.nextDir == "right"){
				column++;
			}else if(gameData.nextDir == "up"){
				row--;
			}else if(gameData.nextDir == "down"){
				row++;
			}	
		}else{
			row = lastRow;
			column = lastColumn;
		}

		lastRow = thisSnake.row;
		lastColumn = thisSnake.column;

		if(gameData.settings.wall){
			if(row < 0 || row >= gameData.settings.row){
				hitWall = true;
			}
			if(column < 0 || column >= gameData.settings.column){
				hitWall = true;
			}
		}

		row = row < 0 ? gameData.settings.row-1 : row;
		row = row >= gameData.settings.row ? 0 : row;
		column = column < 0 ? gameData.settings.column-1 : column;
		column = column >= gameData.settings.column ? 0 : column;
		
		if(gameData.area[row][column] == 3){
			hitBrick = true;
		}

		if(!hitWall && !hitBrick){
			if(gameData.area[row][column] == 1){
				hitObject = true;
			}

			if(!hitObject){
				gameData.area[thisSnake.row][thisSnake.column] = 0;

				thisSnake.base.x = gameData.grid[row][column].x;
				thisSnake.base.y = gameData.grid[row][column].y;

				if(smoothAnimation && n == 0){
					animateSnake(thisSnake, row, column);
				}else{
					thisSnake.x = gameData.grid[row][column].x;
					thisSnake.y = gameData.grid[row][column].y;
					thisSnake.nextX = thisSnake.x;
					thisSnake.nextY = thisSnake.y;
				}

				thisSnake.row = row;
				thisSnake.column = column;
				if(gameData.area[row][column] == 2){
					hitScore = true;
				}
				gameData.area[row][column] = 1;
			}
		}

		if(extend){
			n = gameData.snake.length;
			exctendSnake.visible = true;
		}

		if(hitWall){
			n = gameData.snake.length;
			var randomSound = Math.floor(Math.random()*3);
			playSound('soundWall'+(randomSound+1));

			endGame();
		}

		if(hitBrick){
			n = gameData.snake.length;
			var randomSound = Math.floor(Math.random()*3);
			playSound('soundWall'+(randomSound+1));

			endGame();
		}

		if(hitObject){
			n = gameData.snake.length;
			var randomSound = Math.floor(Math.random()*3);
			playSound('soundWall'+(randomSound+1));

			endGame();
		}
	}

	if(!hitObject && !hitBrick && !hitWall){
		checkSnakeRotation();
	}
	checkScoreNearby();
	
	if(hitScore){
		var randomSound = Math.floor(Math.random()*2);
		playSound('soundBite'+(randomSound+1));

		gameData.increase = true;
		animateSnakeFeed();
		increaseGameStats();
		insertType("score");
	}

	if(gameData.dir != gameData.nextDir){
		playSound('soundSwing');
	}

	gameData.dir = gameData.nextDir;
}

 /*!
 * 
 * SNAKE ANIMATION - This is the function that runs to animate snake
 * 
 */
function animateSnake(thisSnake, row, column){
	var jumpAnimation = false;
	var extraX = 0;
	var extraY = 0;
	var gridSize = gameSettings.gridSize;

	if(column == 0 && thisSnake.column == gameData.settings.column-1){
		jumpAnimation = true;
		extraX = gridSize/2;
	}else if(column == gameData.settings.column-1 && thisSnake.column == 0){
		jumpAnimation = true;
		extraX = -(gridSize/2);
	}if(row == 0 && thisSnake.row == gameData.settings.row-1){
		jumpAnimation = true;
		extraY = gridSize/2;
	}else if(row == gameData.settings.row-1 && thisSnake.row == 0){
		jumpAnimation = true;
		extraY = -(gridSize/2);
	}

	if(jumpAnimation){
		thisSnake.nextX = thisSnake.x + extraX;
		thisSnake.nextY = thisSnake.y + extraY;
		TweenMax.to(thisSnake, (gameData.level.speed/2)/1000, {x:thisSnake.x + extraX, y:thisSnake.y + extraY, ease:Linear.easeNone, overwrite:true, onComplete:function(){
			thisSnake.nextX = gameData.grid[row][column].x;
			thisSnake.nextY = gameData.grid[row][column].y;
			thisSnake.x = gameData.grid[row][column].x - extraX;
			thisSnake.y = gameData.grid[row][column].y - extraY;
			TweenMax.to(thisSnake, (gameData.level.speed/2)/1000, {x:gameData.grid[row][column].x, y:gameData.grid[row][column].y, ease:Linear.easeNone, overwrite:true});
		}});
	}else{
		thisSnake.nextX = gameData.grid[row][column].x;
		thisSnake.nextY = gameData.grid[row][column].y;
		TweenMax.to(thisSnake, gameData.level.speed/1000, {x:gameData.grid[row][column].x, y:gameData.grid[row][column].y, ease:Linear.easeNone, overwrite:true});
	}
}

function checkScoreNearby(){
	var thisSnake = gameData.snake[0];
	if(randomBoolean()){
		thisSnake.gotoAndStop("idle");
	}else{
		thisSnake.gotoAndStop("tongue");
	}
	for(var n=0; n<gameData.score.length; n++){
		var thisScore = gameData.score[n];
		if(getDistance(thisScore.x, thisScore.y, thisSnake.x, thisSnake.y) < gameSettings.gridSize * 3){
			thisSnake.gotoAndStop("eat");
		}
	}
}

function animateSnakeFeed(){
	var newSnakeFeed = new createjs.Bitmap(loader.getResult('snakeFeed'+gameData.themeNum));
	centerReg(newSnakeFeed);
	snakeContainer.addChild(newSnakeFeed);
	gameData.snakeFeed.push(newSnakeFeed);

	var pathArray = [];
	var lastSnake = null;
	var totalLength = gameData.snake.length > 10 ? 10 : gameData.snake.length;
	for(var n=0; n<totalLength; n++){
		var thisSnake = gameData.snake[n];
		if(lastSnake != null && getDistance(lastSnake.x, lastSnake.y, thisSnake.x, thisSnake.y) > gameSettings.gridSize){
			n = totalLength;
		}else{
			pathArray.push({x:thisSnake.x, y:thisSnake.y});
		}
		lastSnake = thisSnake;
	}

	newSnakeFeed.x = gameData.snake[0].x;
	newSnakeFeed.y = gameData.snake[0].y;

	if(pathArray.length > 1){
		TweenMax.to(newSnakeFeed, getDuration(pathArray.length * gameSettings.gridSize, 1000), {bezier:{type:"thru", values:pathArray, curviness:0, autoRotate:true}, scaleX:.5, scaleY:.5, ease:Linear.easeNone, repeat:0, overwrite:true, onComplete:animateSnakeFeedComplete});
	}else{
		animateSnakeFeedComplete();
	}
}

function loopSnakeFeed(newSnakeFeed){
	var pathArray = [];
	var firstPath = gameData.snake[newSnakeFeed.feedIndex];
	var secondPath = gameData.snake[newSnakeFeed.feedIndex+1];

	newSnakeFeed.feedIndex++;
	if(getDistance(firstPath.x, firstPath.y, secondPath.x, secondPath.y) > gameSettings.gridSize){

	}else{
		pathArray.push({x:firstPath.x, y:firstPath.y});
		pathArray.push({x:secondPath.x, y:secondPath.y});
	}

	if(pathArray.length > 1){
		TweenMax.to(newSnakeFeed, getDuration(gameSettings.gridSize, 1000), {bezier:{type:"thru", values:pathArray, curviness:0, autoRotate:true}, ease:Linear.easeNone, repeat:0, overwrite:true, onComplete:loopSnakeFeedComplete, onCompleteParams:[newSnakeFeed]});
	}else{
		loopSnakeFeedComplete(newSnakeFeed);
	}
}

function loopSnakeFeedComplete(newSnakeFeed){
	if(newSnakeFeed.feedIndex < gameData.snake.length-3){
		loopSnakeFeed(newSnakeFeed);
	}else{
		animateSnakeFeedComplete();
	}
}

function getDuration(distance, pixelsPerSecond){
	var duration = distance / pixelsPerSecond;
	return duration;
}

function animateSnakeFeedComplete(){
	var snakeFeed = gameData.snakeFeed[0];
	snakeContainer.removeChild(snakeFeed);
	gameData.snakeFeed.splice(0,1);
}

 /*!
 * 
 * DRAW STROKE - This is the function that runs to draw stroke
 * 
 */
function drawSnakeStroke(){
	snakeStroke.graphics.clear();
	if(themesArr[gameData.themeNum].stroke == undefined){
		return;
	}

	var gridSize = gameSettings.gridSize;
	gameData.allPath = [];
	gameData.findPath = [];

	for(var r=0; r<gameData.settings.row; r++){
		for(var c=0; c<gameData.settings.column; c++){
			gameData.grid[r][c].alpha = 1;
		}
	}
	
	for(var n=0; n<gameData.snake.length; n++){
		var thisSnake = gameData.snake[n];
		var frontPos = n == 0 ? null : gameData.snake[n-1];
		var backPos = n == gameData.snake.length-1 ? null : gameData.snake[n+1];
		var snakeGrid = gameData.grid[thisSnake.row][thisSnake.column];
		
		if(n == 0){
			gameData.findPath.push({x:thisSnake.x, y:thisSnake.y});
			checkBackPos(n, backPos.base, thisSnake);
		}

		if(n != 0){
			if(n == gameData.snake.length-1){
				checkFrontPos(n, frontPos.base, thisSnake.base);
				gameData.findPath.push({x:thisSnake.base.x, y:thisSnake.base.y});

				var lastGridPos = {x:thisSnake.nextX, y:thisSnake.nextY};
				checkBackPos(n, lastGridPos, thisSnake.base);

				gameData.findPath.push({x:thisSnake.nextX, y:thisSnake.nextY});
				gameData.findPath.push({x:thisSnake.x, y:thisSnake.y});
			}else{
				checkFrontPos(n, frontPos.base, thisSnake.base);
				gameData.findPath.push({x:thisSnake.base.x, y:thisSnake.base.y});
				checkBackPos(n, backPos.base, thisSnake.base);
			}
		}
	}
	cutNewPath();
	
	for(var n=0; n<gameData.allPath.length; n++){
		snakeStroke.graphics.setStrokeStyle(themesArr[gameData.themeNum].stroke.stroke, 'round', 'round').beginStroke(themesArr[gameData.themeNum].stroke.color);
		for(var p=0; p<gameData.allPath[n].length; p++){
			snakeStroke.graphics.lt(gameData.allPath[n][p].x, gameData.allPath[n][p].y);
		}
		snakeStroke.graphics.endStroke();
	}

	if(themesArr[gameData.themeNum].stroke.dashed != undefined){
		for(var n=0; n<gameData.allPath.length; n++){
			snakeStroke.graphics.setStrokeStyle(themesArr[gameData.themeNum].stroke.stroke).setStrokeDash(themesArr[gameData.themeNum].stroke.dashed, 0).beginStroke(themesArr[gameData.themeNum].stroke.dashedColor);
			for(var p=0; p<gameData.allPath[n].length; p++){
				snakeStroke.graphics.lt(gameData.allPath[n][p].x, gameData.allPath[n][p].y);
			}
			snakeStroke.graphics.endStroke();
		}	
	}
}

function cutNewPath(){
	gameData.allPath.push(gameData.findPath);
	gameData.findPath = [];
}

function checkFrontPos(index, frontPos, thisSnake){
	var gridSize = gameSettings.gridSize;
	if(frontPos != null && getDistance(frontPos.x, frontPos.y, thisSnake.x, thisSnake.y) > gridSize*2){
		if(frontPos.y == thisSnake.y){
			if(frontPos.x < thisSnake.x){
				gameData.findPath.push({x:gameData.settings.width+(gridSize/2), y:thisSnake.y});
			}else if(frontPos.x > thisSnake.x){
				gameData.findPath.push({x:-(gridSize/2), y:thisSnake.y});
			}
		}
		
		if(frontPos.x == thisSnake.x){
			if(frontPos.y < thisSnake.y){
				gameData.findPath.push({x:thisSnake.x, y:gameData.settings.height+(gridSize/2)});
			}else if(frontPos.y > thisSnake.y){
				gameData.findPath.push({x:thisSnake.x, y:-(gridSize/2)});
			}
		}
	}
}

function checkBackPos(index, backPos, thisSnake){
	var gridSize = gameSettings.gridSize;
	if(backPos != null && getDistance(backPos.x, backPos.y, thisSnake.x, thisSnake.y) > gridSize*2){
		if(backPos.y == thisSnake.y){
			if(backPos.x > thisSnake.x){
				gameData.findPath.push({x:-(gridSize/2), y:thisSnake.y});
				cutNewPath();
			}else if(backPos.x < thisSnake.x){
				gameData.findPath.push({x:gameData.settings.width+(gridSize/2), y:thisSnake.y});
				cutNewPath();
			}
		}
		
		if(backPos.x == thisSnake.x){
			if(backPos.y > thisSnake.y){
				gameData.findPath.push({x:thisSnake.x, y:-(gridSize/2)});
				cutNewPath();
			}else if(backPos.y < thisSnake.y){
				gameData.findPath.push({x:thisSnake.x, y:gameData.settings.height+(gridSize/2)});
				cutNewPath();
			}
		}
	}
}

 /*!
 * 
 * GAME CONTROL - This is the function that runs control snake
 * 
 */
function gameControl(dir){
	
	if(!gameData.control){
		return;
	}

	toggleTouchArrow("up", false);
	toggleTouchArrow("down", false);
	toggleTouchArrow("left", false);
	toggleTouchArrow("right", false);

	if(gameData.moveControl.left){
		dir = "left";
	}

	if(gameData.moveControl.right){
		dir = "right";
	}

	if(gameData.moveControl.up){
		dir = "up";
	}

	if(gameData.moveControl.down){
		dir = "down";
	}

	toggleTouchArrow(dir, true);

	var excludeDir = "";
	if(gameData.dir == "left"){
		excludeDir = "right";
	}else if(gameData.dir == "right"){
		excludeDir = "left";
	}else if(gameData.dir == "up"){
		excludeDir = "down";
	}else if(gameData.dir == "down"){
		excludeDir = "up";
	}

	if(excludeDir != dir){
		gameData.nextDir = dir;
	}
}

function checkControl(){
	if(!gameData.control){
		return;
	}

	var dir = "";
	toggleTouchArrow("up", false);
	toggleTouchArrow("down", false);
	toggleTouchArrow("left", false);
	toggleTouchArrow("right", false);

	if(gameData.moveControl.left){
		dir = "left";
	}

	if(gameData.moveControl.right){
		dir = "right";
	}

	if(gameData.moveControl.up){
		dir = "up";
	}

	if(gameData.moveControl.down){
		dir = "down";
	}
	
	if(dir != ""){
		toggleTouchArrow(dir, true);

		var excludeDir = "";
		if(gameData.dir == "left"){
			excludeDir = "right";
		}else if(gameData.dir == "right"){
			excludeDir = "left";
		}else if(gameData.dir == "up"){
			excludeDir = "down";
		}else if(gameData.dir == "down"){
			excludeDir = "up";
		}

		if(excludeDir != dir){
			gameData.nextDir = dir;
		}
	}
}

/*!
 * 
 * GAME SCORE STATUS - This is the function that runs to show and update game score status
 * 
 */
function updateBrickIcon(){
	brickIconContainer.removeAllChildren();

	var newBrickIcon = new createjs.Bitmap(loader.getResult('snakeBrick' + gameData.themeNum));
	centerReg(newBrickIcon);
	newBrickIcon.scaleX = newBrickIcon.scaleY = .8;
	newBrickIcon.y = -10;

	brickIconContainer.addChild(newBrickIcon);
}

function increaseGameStats(){
	playerData.level++;
	playerData.score += gameSettings.level.score;

	gameData.level.speedTimes++;
	gameData.level.brickTimes++;

	if(gameData.level.speedTimes >= gameSettings.level.speedTimes){
		gameData.level.speedTimes = 0;
		gameData.level.speed -= gameSettings.level.speedIncrease;
	}

	if(gameData.level.brickTimes >= gameSettings.level.brickTimes){
		gameData.level.brickTimes = 0;
		playerData.brick++;
		insertType("brick");
	}
	updateGameStats();
}


function updateGameStats(){
	TweenMax.to(tweenData, .5, {tweenScore:playerData.score, overwrite:true, onUpdate:function(){
		pointTxt.text = pointShadowTxt.text = textDisplay.point.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
	}});

	levelTxt.text = levelShadowTxt.text = textDisplay.level.replace('[NUMBER]', playerData.level);
	brickTxt.text = brickShadowTxt.text = textDisplay.brick.replace('[NUMBER]', playerData.brick);

	brickStatusContainer.visible = true;
	if(!gameData.settings.brick){
		brickStatusContainer.visible = false;
	}
}

/*!
 * 
 * GAME STATUS - This is the function that runs to show game status
 * 
 */
function showGameStatus(con){
	if(con == 'gameover'){
		statusTxt.text = textDisplay.gameover;
	}

	statusContainer.alpha = 0;
	TweenMax.to(statusContainer, .5, {alpha:1, overwrite:true});
}

/*!
 * 
 * UPDATE GAME - This is the function that runs to loop game update
 * 
 */
function updateGame(){
	if(!gameData.paused){
		if(gameData.loopSnake){
			gameData.nowDate = new Date();
			var timer = Math.floor((gameData.nowDate.getTime() - gameData.startDate.getTime()));
			if(timer > gameData.level.speed){
				gameData.startDate = new Date();
				loopSnake();
			}
		}

		drawSnakeStroke();
		checkControl();
	}
}

/*!
 * 
 * GAME CONTROL - This is the function that runs for game control
 * 
 */
function toggleTouchAlpha(obj, con){
	if(con){
		obj.alpha = .6;
	}else{
		obj.alpha = 1;
	}
}

function setupTouchControl(){
	var buttonArr = ["Up","Right","Down","Left"];
	for(var n=0; n<buttonArr.length; n++){
		$.touch["arrow"+buttonArr[n]].id = buttonArr[n].toLowerCase();
		$.touch["arrow"+buttonArr[n]].addEventListener("mousedown", function(evt) {
			toggleTouchArrow(evt.target.id, true);
			gameData.moveControl[evt.target.id] = true;
		});
		
		$.touch["arrow"+buttonArr[n]].addEventListener("pressup", function(evt) {
			toggleTouchArrow(evt.target.id, false);
			gameData.moveControl[evt.target.id] = false;
		});
	}

	buttonTouchMove.cursor = "pointer";
	buttonTouchMove.addEventListener("mousedown", function(evt) {
		toggleMoveEvent(evt, 'drag');
	});
	buttonTouchMove.addEventListener("pressmove", function(evt) {
		toggleMoveEvent(evt, 'move')
	});
	buttonTouchMove.addEventListener("pressup", function(evt) {
		toggleMoveEvent(evt, 'drop')
	});
}

function toggleMoveEvent(obj, con){
	switch(con){
		case 'drag':
			var global = touchMoveContainer.localToGlobal(obj.currentTarget.x, obj.currentTarget.y);
			obj.currentTarget.offset = {x:global.x-(obj.stageX), y:global.y-(obj.stageY)};
		break;
		
		case 'move':
			var local = touchMoveContainer.globalToLocal(obj.stageX, obj.stageY);
			var moveX = ((local.x) + obj.currentTarget.offset.x);
			var moveY = ((local.y) + obj.currentTarget.offset.y);

			var posData = dragLimit(moveX, moveY);
			obj.currentTarget.x = posData.x;
			obj.currentTarget.y = posData.y;

			var range = 10;
			gameData.moveControl.up = false;
			gameData.moveControl.left = false;
			gameData.moveControl.right = false;
			gameData.moveControl.down = false;

			toggleTouchArrow("left", false);
			toggleTouchArrow("right", false);
			toggleTouchArrow("up", false);
			toggleTouchArrow("down", false);

			if(obj.currentTarget.x <= -range){
				gameData.moveControl.left = true;
				toggleTouchArrow("left", true);
			}

			if(obj.currentTarget.x >= range){
				gameData.moveControl.right = true;
				toggleTouchArrow("right", true);
			}

			if(obj.currentTarget.y <= -range){
				gameData.moveControl.up = true;
				toggleTouchArrow("up", true);
			}

			if(obj.currentTarget.y >= range){
				gameData.moveControl.down = true;
				toggleTouchArrow("down", true);
			}
		break;
		
		case 'drop':
			gameData.moveControl.up = false;
			gameData.moveControl.left = false;
			gameData.moveControl.right = false;
			gameData.moveControl.down = false;
			resetControlUI();
		break;
	}
}

function dragLimit(x, y) {
	var radius = 20;
    var dist = dragDistance([x, y], [0,0]);
    if (dist <= radius) {
        return {x: x, y: y};
    }else {
		x = x - 0;
		y = y - 0;
		var radians = Math.atan2(y, x)
		return {
			x: Math.cos(radians) * radius + 0,
			y: Math.sin(radians) * radius + 0
		}
	} 
}

function dragDistance(dot1, dot2) {
    var x1 = dot1[0],
        y1 = dot1[1],
        x2 = dot2[0],
        y2 = dot2[1];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function resetControlUI(){
	toggleTouchArrow("up", false);
	toggleTouchArrow("down", false);
	toggleTouchArrow("left", false);
	toggleTouchArrow("right", false);

	buttonTouchMove.x = buttonTouchMove.y = 0;
}

function toggleTouchArrow(dir, con){
	dir = capitalizeFirstLetter(dir);
	if(dir){
		if(!con){
			$.touch[dir].visible = false;
			$.touch["arrow"+dir].visible = true;
		}else{
			$.touch[dir].visible = true;
			$.touch["arrow"+dir].visible = false;
		}
	}
}

function capitalizeFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/*!
 * 
 * END GAME - This is the function that runs for game end
 * 
 */
function endGame(){
	gameData.paused = true;

	playSound('soundOver');
	toggleLoopSnake(false);
	resetControlUI();
	showGameStatus("gameover");

	TweenMax.to(gameContainer, 3, {overwrite:true, onComplete:function(){
		goPage('result')
	}});
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTimeGame(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	return minutes+':'+seconds;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}


/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", playerData.score);
	text = shareMessage.replace("[SCORE]", playerData.score);
	
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}
