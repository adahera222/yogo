goog.provide('YGHero');

goog.require('lime.Sprite');
goog.require('box2d.BoxDef');
goog.require('goog.math.Coordinate');
goog.require('YGBullet');
goog.require('YGMath');

/**
 * Our hero
 * 
 * @constructor
 * @param {lime.Scene} scene
 * @implements {STPPhysicObject}
 * @extends {lime.Sprite}
 */
YGHero = function(scene, director)
{
	goog.base(this);
	
	this.setSize(50, 50);
	this.setFill("#FF0000");
	
	/**
     * The physic body of the object
     * @type {box2d.Body}
     * @private
     */
    this._body = null;
    
    /**
     * Position of the mouse
     * @type {goog.math.Coordinate}
     * @private
     */
    this._mousePosition = new goog.math.Coordinate(0, 0);
    
    /**
     * Should we fire bullet ?
     * @type {boolean}
     * @private
     */
    this._shouldFire = false;
    
    /**
     * Scene director FIXME remove that reference
     * @type {lime.Director}
     * @private
     */
    this._director = director;
    
    /**
     * Scene FIXME remove that reference
     * @type {lime.Scene}
     * @private 
     */
    this._scene = scene;
    
    /*
     * Keyboard listener
     */
    this.keyboardListener();
	
	/*
	 * Click listener
	 */
    this.mouseListener();
	
	/*
	 * Fire scheduling
	 */
	lime.scheduleManager.scheduleWithDelay(this.fire, this, 300);
};

goog.inherits(YGHero, lime.Sprite);

// ----------------------------------------->

/**
 * Force that move the hero
 * @private
 */
YGHero._force = 250;

//----------------------------------------->

/**
 * Set force to the hero physic
 */
YGHero.prototype.setForce = function(x, y)
{
	var force = this.getBody().GetLinearVelocity();
	force.x = x;
	force.y = y;
};

/**
 * Fire a bullet if needed
 */
YGHero.prototype.fire = function(dt)
{
	if( this._shouldFire )
	{		
		var bulletForce = YGMath.getVectorBetweenPosition(this.getPosition(), this._mousePosition, 500);
		var angle = YGMath.getAngleForVector(bulletForce);
			   
		var bullet = new YGBullet(bulletForce);
		bullet.setPosition(this.getPosition());
		bullet.setRotation(angle);
		this._scene.appendChild(bullet);
	}
};

/**
 * Setup mouse listener
 */
YGHero.prototype.mouseListener = function()
{
	var self = this;
	
	/*
	 * Listener for clicks
	 */
	goog.events.listen(this._scene, ['mousedown','mouseup'], function (e) 
	{
		if( e.type == 'mousedown' )
		{
			self._shouldFire = true;
		}
		else
		{
			self._shouldFire = false;
		}
	});
	
	/*
	 * Listener for mouse position
	 */
	goog.events.listen(this._scene, ['mousemove'], function (e) 
	{
		// Save mouse position
		self._mousePosition = e.position;
		
		// Set hero rotation
		self.setRotation(YGMath.getAngleBetweenPosition(self.getPosition(), e.position));
	});
};

/**
 * Setup keyboard listener
 */
YGHero.prototype.keyboardListener = function()
{
	var self = this;
    
    var leftArrowPressed = false;
	var upArrowPressed = false;
	var rightArrowPressed = false;
	var downArrowPressed = false;
	var x = 0;
	var y = 0;
	goog.events.listen(this._scene, [goog.events.EventType.KEYDOWN, goog.events.EventType.KEYUP], function (ev) 
	{
		switch(ev.event.keyCode)
		{
			case 37 : //left
				if( !leftArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					x += -YGHero._force;
					leftArrowPressed = true;
				}
				else if( leftArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					x += YGHero._force;
					leftArrowPressed = false;
				}
				break;
			case 38 : //up
				if( !upArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					y += -YGHero._force;
					upArrowPressed = true;
				}
				else if( upArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					y += YGHero._force;
					upArrowPressed = false;
				}
				break;
			case 39 : //right
				if( !rightArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					x += YGHero._force;
					rightArrowPressed = true;
				}
				else if( rightArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					x += -YGHero._force;
					rightArrowPressed = false;
				}
				break;
			case 40 : //down
				if( !downArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					y += YGHero._force;
					downArrowPressed = true;
				}
				else if( downArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					y += -YGHero._force;
					downArrowPressed = false;
				}
				break;
		}
		
		self.setForce(x, y);
	});
};

//------------------------------------------>

/**
 * Get the body of the object
 * @returns {box2d.Body} 
 */
YGHero.prototype.getBody = function( )
{
	return this._body;
};

/**
 * Set the body of the object
 * @param {box2d.Body} body
 */
YGHero.prototype.setBody = function( body )
{
	if( body )
	{
		this._body = body;
	}
};

/**
 * Get the shape definition of this object
 * @returns {box2d.BoxDef}
 */
YGHero.prototype.getShape = function()
{
	var shapeDef = new box2d.BoxDef();
	
   	shapeDef.restitution = 0;
   	shapeDef.density = 1;
   	shapeDef.friction = 1;
   	shapeDef.extents.Set(this.getSize().width / 2, this.getSize().height / 2);
   	shapeDef.categoryBits = 0x0002;
   	
   	return shapeDef;
};