////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
 function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/logo_p.png', id:'logoP'},
			{src:'assets/button_classic.png', id:'buttonClassic'},
			{src:'assets/button_adventure.png', id:'buttonAdventure'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_select_theme.png', id:'buttonSelectTheme'},

			{src:'assets/button_radio.png', id:'buttonRadio'},
			{src:'assets/button_arrow_left.png', id:'buttonArrowL'},
			{src:'assets/button_arrow_right.png', id:'buttonArrowR'},
			{src:'assets/button_arrow_up.png', id:'buttonArrowU'},
			{src:'assets/button_arrow_down.png', id:'buttonArrowD'},
			{src:'assets/button_plus.png', id:'buttonPlus'},
			{src:'assets/button_minus.png', id:'buttonMinus'},
			{src:'assets/item_number.png', id:'itemNumber'},
			{src:'assets/item_status.png', id:'itemStatus'},
			{src:'assets/item_adventure_pop.png', id:'itemAdventurePop'},
			{src:'assets/button_touch.png', id:'buttonTouch'},
			{src:'assets/button_touch_move.png', id:'buttonTouchMove'},
			{src:'assets/button_touch_arrow.png', id:'buttonTouchArrow'},
			{src:'assets/button_touch_press.png', id:'buttonTouchPress'},
		
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_pop.png', id:'itemPop'},
			{src:'assets/item_pop_p.png', id:'itemPopP'},
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
	];

	for(var n=0; n<themesArr.length; n++){
		manifest.push({src:themesArr[n].src, id:'snake'+n});
		manifest.push({src:themesArr[n].feed, id:'snakeFeed'+n});
		manifest.push({src:themesArr[n].brick, id:'snakeBrick'+n});

		for(var s=0; s<themesArr[n].score.length; s++){
			manifest.push({src:themesArr[n].score[s], id:'snakeScore'+s+'_'+n});
		}
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/sound_click.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/sound_click_2.ogg', id:'soundButton2'});
		manifest.push({src:'assets/sounds/sound_over.ogg', id:'soundOver'});
		manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/sound_bite1.ogg', id:'soundBite1'});
		manifest.push({src:'assets/sounds/sound_bite2.ogg', id:'soundBite2'});
		manifest.push({src:'assets/sounds/sound_swing.ogg', id:'soundSwing'});
		manifest.push({src:'assets/sounds/sound_wall1.ogg', id:'soundWall1'});
		manifest.push({src:'assets/sounds/sound_wall2.ogg', id:'soundWall2'});
		manifest.push({src:'assets/sounds/sound_wall3.ogg', id:'soundWall3'});
		manifest.push({src:'assets/sounds/sound_brick.ogg', id:'soundBrick'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}