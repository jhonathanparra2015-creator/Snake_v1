////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, instructionContainer, resultContainer, moveContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.radio = {};
$.touch = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	themeContainer = new createjs.Container();
	adventureContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	gridContainer = new createjs.Container();
	maskContainer = new createjs.Container();
	bgContainer = new createjs.Container();
	snakeContainer = new createjs.Container();
	strokeContainer = new createjs.Container();
	scoreContainer = new createjs.Container();
	brickContainer = new createjs.Container();
	touchContainer = new createjs.Container();
	brickStatusContainer = new createjs.Container();
	brickIconContainer = new createjs.Container();
	scoreStatusContainer = new createjs.Container();
	levelStatusContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	touchContainer = new createjs.Container();
	touchMoveContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));

	buttonClassic = new createjs.Bitmap(loader.getResult('buttonClassic'));
	centerReg(buttonClassic);

	buttonAdventure = new createjs.Bitmap(loader.getResult('buttonAdventure'));
	centerReg(buttonAdventure);

	//theme
	buttonArrowL = new createjs.Bitmap(loader.getResult('buttonArrowL'));
	centerReg(buttonArrowL);

	buttonArrowR = new createjs.Bitmap(loader.getResult('buttonArrowR'));
	centerReg(buttonArrowR);

	buttonSelectTheme = new createjs.Bitmap(loader.getResult('buttonSelectTheme'));
	centerReg(buttonSelectTheme);

	themeContainer.addChild(buttonArrowL, buttonArrowR, buttonSelectTheme);

	//adventure
	itemAdventurePop = new createjs.Bitmap(loader.getResult('itemAdventurePop'));
	centerReg(itemAdventurePop);

	adventureTitleTxt = new createjs.Text();
	adventureTitleTxt.font = "75px bpreplaybold";
	adventureTitleTxt.color = '#fff';
	adventureTitleTxt.textAlign = "center";
	adventureTitleTxt.textBaseline='alphabetic';
	adventureTitleTxt.text = textDisplay.adventureTitle;

	adventureTitleShadowTxt = new createjs.Text();
	adventureTitleShadowTxt.font = "75px bpreplaybold";
	adventureTitleShadowTxt.color = '#883310';
	adventureTitleShadowTxt.textAlign = "center";
	adventureTitleShadowTxt.textBaseline='alphabetic';
	adventureTitleShadowTxt.text = textDisplay.adventureTitle;

	adventureSizeTxt = new createjs.Text();
	adventureSizeTxt.font = "40px bpreplaybold";
	adventureSizeTxt.color = '#883310';
	adventureSizeTxt.textAlign = "center";
	adventureSizeTxt.textBaseline='alphabetic';
	adventureSizeTxt.text = textDisplay.adventureSize;

	adventureWallTxt = new createjs.Text();
	adventureWallTxt.font = "40px bpreplaybold";
	adventureWallTxt.color = '#883310';
	adventureWallTxt.textAlign = "center";
	adventureWallTxt.textBaseline='alphabetic';
	adventureWallTxt.text = textDisplay.adventureWall;

	adventureBrickTxt = new createjs.Text();
	adventureBrickTxt.font = "40px bpreplaybold";
	adventureBrickTxt.color = '#883310';
	adventureBrickTxt.textAlign = "center";
	adventureBrickTxt.textBaseline='alphabetic';
	adventureBrickTxt.text = textDisplay.adventureBrick;

	sizeTxt = new createjs.Text();
	sizeTxt.font = "40px bpreplaybold";
	sizeTxt.color = '#883310';
	sizeTxt.textAlign = "center";
	sizeTxt.textBaseline='alphabetic';
	sizeTxt.text = textDisplay.share;

	itemNumberSize = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemNumberSize);

	buttonRowL = new createjs.Bitmap(loader.getResult('buttonMinus'));
	centerReg(buttonRowL);
	buttonRowR = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonRowR);

	buttonColumnL = new createjs.Bitmap(loader.getResult('buttonMinus'));
	centerReg(buttonColumnL);
	buttonColumnR = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonColumnR);

	buttonAdventureStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonAdventureStart);

	adventureContainer.addChild(itemAdventurePop, adventureTitleShadowTxt, adventureTitleTxt, adventureBrickTxt, adventureWallTxt, adventureSizeTxt, buttonAdventureStart, itemNumberSize, buttonRowL, buttonRowR, buttonColumnL, buttonColumnR, sizeTxt);

	for(var n=0; n<2; n++){
		var _frameW = 44;
		var _frameH = 44;
		var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "width": _frameW, "count": 2};
		var _animations = {
							enable:{frames: [0]},
							disable:{frames: [1]}
						};
							
		var radioData = new createjs.SpriteSheet({
			"images": [loader.getResult("buttonRadio")],
			"frames": _frame,
			"animations": _animations
		});

		$.radio[n] = new createjs.Sprite(radioData, "enable");
		$.radio[n].hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-20, -25, 150, 50));
		adventureContainer.addChild($.radio[n]);
	}
	
	//game
	gridWall = new createjs.Shape();	
	gridGround = new createjs.Shape();	

	levelTxt = new createjs.Text();
	levelTxt.font = "35px bpreplaybold";
	levelTxt.color = '#fff';
	levelTxt.textAlign = "left";
	levelTxt.textBaseline='alphabetic';

	levelShadowTxt = new createjs.Text();
	levelShadowTxt.font = "35px bpreplaybold";
	levelShadowTxt.color = '#883310';
	levelShadowTxt.textAlign = "left";
	levelShadowTxt.textBaseline='alphabetic';
	levelShadowTxt.y = 5;

	levelStatusContainer.addChild(levelShadowTxt, levelTxt);

	pointTxt = new createjs.Text();
	pointTxt.font = "35px bpreplaybold";
	pointTxt.color = '#fff';
	pointTxt.textAlign = "center";
	pointTxt.textBaseline='alphabetic';

	pointShadowTxt = new createjs.Text();
	pointShadowTxt.font = "35px bpreplaybold";
	pointShadowTxt.color = '#883310';
	pointShadowTxt.textAlign = "center";
	pointShadowTxt.textBaseline='alphabetic';
	pointShadowTxt.y = 5;

	scoreStatusContainer.addChild(pointShadowTxt, pointTxt);

	brickTxt = new createjs.Text();
	brickTxt.font = "35px bpreplaybold";
	brickTxt.color = '#fff';
	brickTxt.textAlign = "left";
	brickTxt.textBaseline='alphabetic';

	brickShadowTxt = new createjs.Text();
	brickShadowTxt.font = "35px bpreplaybold";
	brickShadowTxt.color = '#883310';
	brickShadowTxt.textAlign = "left";
	brickShadowTxt.textBaseline='alphabetic';
	brickShadowTxt.y = 5;
	brickTxt.x = brickShadowTxt.x = 25;

	brickStatusContainer.addChild(brickIconContainer, brickShadowTxt, brickTxt);

	itemStatus = new createjs.Bitmap(loader.getResult('itemStatus'));
	centerReg(itemStatus);

	statusTxt = new createjs.Text();
	statusTxt.font = "35px bpreplaybold";
	statusTxt.color = '#883310';
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.y = 8;

	statusContainer.addChild(itemStatus, statusTxt);

	buttonTouch = new createjs.Bitmap(loader.getResult('buttonTouch'));
	centerReg(buttonTouch);
	buttonTouchMove = new createjs.Bitmap(loader.getResult('buttonTouchMove'));
	centerReg(buttonTouchMove);

	var buttonArr = ["Up","Right","Down","Left"];
	var rotation = [0,90,180,270];
	touchMoveContainer.addChild(buttonTouch);

	for(var n=0; n<buttonArr.length; n++){
		$.touch[buttonArr[n]] = new createjs.Bitmap(loader.getResult('buttonTouchPress'));
		centerReg($.touch[buttonArr[n]]);
		$.touch[buttonArr[n]].visible = false;

		$.touch["arrow"+buttonArr[n]] = new createjs.Bitmap(loader.getResult('buttonTouchArrow'));
		centerReg($.touch["arrow"+buttonArr[n]]);

		$.touch[buttonArr[n]].regY = $.touch["arrow"+buttonArr[n]].regY = $.touch[buttonArr[n]].image.naturalHeight;
		$.touch["arrow"+buttonArr[n]].rotation = $.touch[buttonArr[n]].rotation = rotation[n];
		
		createHitarea($.touch["arrow"+buttonArr[n]]);
		touchMoveContainer.addChild($.touch[buttonArr[n]], $.touch["arrow"+buttonArr[n]]);
	}

	touchMoveContainer.addChild(buttonTouchMove);
	touchContainer.addChild(touchMoveContainer);

	gridMask = new createjs.Shape();
	snakeStroke = new createjs.Shape();
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemPop'));
	itemResultP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "25px bpreplaybold";
	resultShareTxt.color = '#883310';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "75px bpreplaybold";
	resultTitleTxt.color = '#fff';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;

	resultTitleShadowTxt = new createjs.Text();
	resultTitleShadowTxt.font = "75px bpreplaybold";
	resultTitleShadowTxt.color = '#883310';
	resultTitleShadowTxt.textAlign = "center";
	resultTitleShadowTxt.textBaseline='alphabetic';
	resultTitleShadowTxt.text = textDisplay.resultTitle;

	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "55px bpreplaybold";
	resultDescTxt.color = '#13ff00';
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.text = '';

	resultDescShadowTxt = new createjs.Text();
	resultDescShadowTxt.font = "55px bpreplaybold";
	resultDescShadowTxt.color = '#883310';
	resultDescShadowTxt.textAlign = "center";
	resultDescShadowTxt.textBaseline='alphabetic';
	resultDescShadowTxt.text = '';
	
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemPop'));
	itemExitP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	
	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "75px bpreplaybold";
	popTitleTxt.color = "#fff";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;

	popTitleShadowTxt = new createjs.Text();
	popTitleShadowTxt.font = "75px bpreplaybold";
	popTitleShadowTxt.color = '#883310';
	popTitleShadowTxt.textAlign = "center";
	popTitleShadowTxt.textBaseline='alphabetic';
	popTitleShadowTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "35px bpreplaybold";
	popDescTxt.lineHeight = 40;
	popDescTxt.color = "#883310";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(itemExit, itemExitP, popTitleShadowTxt, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	mainContainer.addChild(logo, logoP, buttonClassic);
	maskContainer.addChild(snakeStroke, snakeContainer);
	gridContainer.addChild(gridWall, gridGround, bgContainer, scoreContainer, brickContainer, maskContainer);
	gameContainer.addChild(levelStatusContainer, brickStatusContainer, scoreStatusContainer, statusContainer, touchContainer);

	resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleShadowTxt, resultTitleTxt, resultDescShadowTxt, resultDescTxt);
	
	// compartir desactivado
	
	canvasContainer.addChild(bg, bgP, mainContainer, gridContainer, themeContainer, adventureContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	changeViewport(viewport.isLandscape);
	resizeGameFunc();
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}
	
	gameCanvas.width = stageW;
	gameCanvas.height = stageH;
	
	canvasW=stageW;
	canvasH=stageH;
	
	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){
		if(viewport.isLandscape){
			bg.visible = true;
			bgP.visible = false;

			logo.visible = true;
			logoP.visible = false;
			
			if(adventureSettings.enable){
				buttonClassic.x = (canvasW/2) - 140;
				buttonClassic.y = canvasH/100 * 75;

				buttonAdventure.x = (canvasW/2) + 140;
				buttonAdventure.y = canvasH/100 * 75;
				buttonAdventure.visible = false;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonAdventure.visible = false;
			}

			//theme
			buttonArrowL.x = canvasW/2 - 400;
			buttonArrowL.y = canvasH/2;

			buttonArrowR.x = canvasW/2 + 400;
			buttonArrowR.y = canvasH/2;

			buttonSelectTheme.x = canvasW/2;
			buttonSelectTheme.y = canvasH/100 * 75;

			//adventure
			itemAdventurePop.x = canvasW/2;
			itemAdventurePop.y = canvasH/2;

			adventureTitleTxt.x = canvasW/2;
			adventureTitleTxt.y = canvasH/100 * 35;

			adventureTitleShadowTxt.x = canvasW/2;
			adventureTitleShadowTxt.y = adventureTitleTxt.y + 10;

			buttonAdventureStart.x = canvasW/2;
			buttonAdventureStart.y = canvasH/100 * 68;
			
			buttonRowL.x = (canvasW/2 + 160) - 30;
			buttonRowR.x = (canvasW/2 + 160) + 30;
			buttonColumnL.x = (canvasW/2 - 160) - 30;
			buttonColumnR.x = (canvasW/2 - 160) + 30;

			adventureSizeTxt.x = canvasW/2;
			adventureSizeTxt.y = canvasH/100 * 43;
			itemNumberSize.x = canvasW/2;
			sizeTxt.x = canvasW/2;
			itemNumberSize.y = buttonRowL.y = buttonRowR.y = buttonColumnL.y = buttonColumnR.y = canvasH/100 * 48;
			sizeTxt.y = itemNumberSize.y + 20;

			$.radio[0].x = canvasW/2 - 150;
			$.radio[0].y = canvasH/100 * 57;

			adventureWallTxt.x = $.radio[0].x + 80;
			adventureWallTxt.y = $.radio[0].y + 14;

			$.radio[1].x = canvasW/2 + 50;
			$.radio[1].y = canvasH/100 * 57;

			adventureBrickTxt.x = $.radio[1].x + 80;
			adventureBrickTxt.y = $.radio[1].y + 14;

			//game
			statusContainer.x = canvasW/2;
			statusContainer.y = canvasH/2;
			
			//result
			itemResult.visible = true;
			itemResultP.visible = false;
			
			buttonFacebook.x = canvasW/100*43;
			buttonFacebook.y = canvasH/100*55;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*55;
			buttonWhatsapp.x = canvasW/100*57;
			buttonWhatsapp.y = canvasH/100*55;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 68;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 49;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 35;

			resultTitleShadowTxt.x = resultTitleTxt.x;
			resultTitleShadowTxt.y = resultTitleTxt.y + 10;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 44;

			resultDescShadowTxt.x = resultDescTxt.x;
			resultDescShadowTxt.y = resultDescTxt.y + 8;
			
			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = (canvasW/2);
			buttonConfirm.y = (canvasH/100 * 56);
			
			buttonCancel.x = (canvasW/2);
			buttonCancel.y = (canvasH/100 * 68);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 35;

			popTitleShadowTxt.x = popTitleTxt.x
			popTitleShadowTxt.y = popTitleTxt.y + 10;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 43;
		}else{
			bg.visible = false;
			bgP.visible = true;

			logo.visible = false;
			logoP.visible = true;
			
			if(adventureSettings.enable){
				buttonClassic.x = (canvasW/2)
				buttonClassic.y = canvasH/100 * 73;

				buttonAdventure.x = (canvasW/2)
				buttonAdventure.y = canvasH/100 * 85;
				buttonAdventure.visible = false;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonAdventure.visible = false;
			}

			//theme
			buttonArrowL.x = canvasW/2 - 250;
			buttonArrowL.y = canvasH/2;

			buttonArrowR.x = canvasW/2 + 250;
			buttonArrowR.y = canvasH/2;

			buttonSelectTheme.x = canvasW/2;
			buttonSelectTheme.y = canvasH/100 * 85;

			//adventure
			itemAdventurePop.x = canvasW/2;
			itemAdventurePop.y = canvasH/2;

			adventureTitleTxt.x = canvasW/2;
			adventureTitleTxt.y = canvasH/100 * 38;

			adventureTitleShadowTxt.x = canvasW/2;
			adventureTitleShadowTxt.y = adventureTitleTxt.y + 10;

			buttonAdventureStart.x = canvasW/2;
			buttonAdventureStart.y = canvasH/100 * 64;
			
			buttonRowL.x = (canvasW/2 + 160) - 30;
			buttonRowR.x = (canvasW/2 + 160) + 30;
			buttonColumnL.x = (canvasW/2 - 160) - 30;
			buttonColumnR.x = (canvasW/2 - 160) + 30;

			adventureSizeTxt.x = canvasW/2;
			adventureSizeTxt.y = canvasH/100 * 44;
			itemNumberSize.x = canvasW/2;
			sizeTxt.x = canvasW/2;
			itemNumberSize.y = buttonRowL.y = buttonRowR.y = buttonColumnL.y = buttonColumnR.y = canvasH/100 * 49;
			sizeTxt.y = itemNumberSize.y + 20;

			$.radio[0].x = canvasW/2 - 150;
			$.radio[0].y = canvasH/100 * 56;

			adventureWallTxt.x = $.radio[0].x + 80;
			adventureWallTxt.y = $.radio[0].y + 14;

			$.radio[1].x = canvasW/2 + 50;
			$.radio[1].y = canvasH/100 * 56;

			adventureBrickTxt.x = $.radio[1].x + 80;
			adventureBrickTxt.y = $.radio[1].y + 14;

			//game
			statusContainer.x = canvasW/2;
			statusContainer.y = canvasH/2;
			
			//result
			itemResult.visible = false;
			itemResultP.visible = true;
			
			buttonFacebook.x = canvasW/100*39;
			buttonFacebook.y = canvasH/100*54;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*54;
			buttonWhatsapp.x = canvasW/100*61;
			buttonWhatsapp.y = canvasH/100*54;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 64;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 49;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 38;
	
			resultTitleShadowTxt.x = resultTitleTxt.x;
			resultTitleShadowTxt.y = resultTitleTxt.y + 10;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 45;

			resultDescShadowTxt.x = resultDescTxt.x;
			resultDescShadowTxt.y = resultDescTxt.y + 8;
			
			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = (canvasW/2);
			buttonConfirm.y = (canvasH/100 * 55);
			
			buttonCancel.x = (canvasW/2);
			buttonCancel.y = (canvasH/100 * 64);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 38;

			popTitleShadowTxt.x = popTitleTxt.x
			popTitleShadowTxt.y = popTitleTxt.y + 10;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 43;
		}
	}
}



/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 60;
		var nextCount = 0;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}

		if(gameSettings.screenControlSide){
			touchMoveContainer.x = (canvasW - offset.x) - 130;
			touchMoveContainer.y = (canvasH - offset.y) - 130;
		}else{
			touchMoveContainer.x = (offset.x) + 130;
			touchMoveContainer.y = (canvasH - offset.y) - 130;
		}

		resizeGrid();
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}