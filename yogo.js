//set main namespace
goog.provide('yogo');


//get requirements
goog.require('lime.Director');
goog.require('YGScene');


// entrypoint
yogo.start = function()
{
	// Create director
	var director = new lime.Director(document.body);
	director.setDisplayFPS(true);

	// Create scene
	_scene = new YGScene(director);
	
	director.replaceScene(_scene);
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('yogo.start', yogo.start);
