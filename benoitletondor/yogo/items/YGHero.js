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
     * Is left arrow pressed
     * @type {boolean}
     * @private
     */
    this._leftArrowPressed 	= false;
    
    /**
     * Is up arrow pressed
     * @type {boolean}
     * @private
     */
	this._upArrowPressed	= false;
	
	/**
	 * Is right arrow pressed
	 * @type {boolean}
     * @private
	 */
	this._rightArrowPressed = false;
	
	/**
	 * Is down arrow pressed
	 * @type {boolean}
     * @private
	 */
	this._downArrowPressed 	= false;
	
	/**
	 * Current movement x force
	 * @type {number}
     * @private
	 */
	this.x = 0;
	
	/**
	 * Current movement y force
	 * @type {boolean}
     * @private
	 */
	this.y = 0;
    
    /**
     * Current fire rate
     * @type {number}
     * @private
     */
    this._fireRate = YGHero.defaultFireRate;
    
    /**
     * Current speed
     * @type {number}
     * @private 
     */
    this._speed = YGHero.defaultSpeed;
    
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
	lime.scheduleManager.scheduleWithDelay(this.fire, this, this.getFireRate());
};

goog.inherits(YGHero, lime.Sprite);

// ----------------------------------------->

/**
 * Default speed of the hero
 * @expose
 */
YGHero.defaultSpeed = 200;

/**
 * Default fire rate
 * @expose
 */
YGHero.defaultFireRate = 300;

//----------------------------------------->

/**
 * Set force to the hero physic
 * 
 * @param {number} x
 * @param {number} y
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
	goog.events.listen(this._scene, [goog.events.EventType.KEYDOWN, goog.events.EventType.KEYUP], function (ev) 
	{
		switch(ev.event.keyCode)
		{
			case 37 : //left
				if( !self.leftArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					self.x += -self.getSpeed();
					self.leftArrowPressed = true;
				}
				else if( self.leftArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					self.x += self.getSpeed();
					self.leftArrowPressed = false;
				}
				break;
			case 38 : //up
				if( !self.upArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					self.y += -self.getSpeed();
					self.upArrowPressed = true;
				}
				else if( self.upArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					self.y += self.getSpeed();
					self.upArrowPressed = false;
				}
				break;
			case 39 : //right
				if( !self.rightArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					self.x += self.getSpeed();
					self.rightArrowPressed = true;
				}
				else if( self.rightArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					self.x += -self.getSpeed();
					self.rightArrowPressed = false;
				}
				break;
			case 40 : //down
				if( !self.downArrowPressed && ev.type == goog.events.EventType.KEYDOWN )
				{
					self.y += self.getSpeed();
					self.downArrowPressed = true;
				}
				else if( self.downArrowPressed && ev.type == goog.events.EventType.KEYUP )
				{
					self.y += -self.getSpeed();
					self.downArrowPressed = false;
				}
				break;
		}
		
		self.setForce(self.x, self.y);
	});
};

//------------------------------------------>

/**
 * Get the current speed of the hero
 * 
 * @returns {number}
 */
YGHero.prototype.getSpeed = function()
{
	return this._speed;
};

/**
 * Set the current speed of the hero (higher is quicker)
 * 
 * @param {number} speed
 */
YGHero.prototype.setSpeed = function(speed)
{
	this._speed = speed;
	
	/*
	 * Reset movement variables
	 */
	this.x = 0;
	this.y = 0;
	this.upArrowPressed = false;
	this.downArrowPressed = false;
	this.rightArrowPressed = false;
	this.leftArrowPressed = false;
};

/**
 * Get the current fire rate
 * 
 * @returns {number}
 */
YGHero.prototype.getFireRate = function()
{
	return this._fireRate;
};

/**
 * Set the current fire rate of the hero (lower is quicker)
 * 
 * @param {number} firerate
 */
YGHero.prototype.setFireRate = function(firerate)
{
	this._fireRate = firerate;
	
	lime.scheduleManager.unschedule(this.fire, this);
	lime.scheduleManager.scheduleWithDelay(this.fire, this, this.getFireRate());
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