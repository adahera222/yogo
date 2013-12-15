goog.provide('YGMonster');

goog.require('lime.Sprite');
goog.require('box2d.BoxDef');

/**
 * An abstract monster
 * 
 * @constructor
 * @extends {lime.Sprite}
 * @implements {STPPhysicObject}
 */
YGMonster = function()
{
	goog.base(this);
	
	/**
	 * Current number of life of this monster
	 * @type {number}
	 * @private
	 */
	this._life = this.getNumberOfLife();
	
	/**
     * The physic body of the object
     * @type {box2d.Body}
     * @private
     */
    this._body = null;
};

goog.inherits(YGMonster, lime.Sprite);

//----------------------------------------->

/**
 * Return the speed of the monster
 * Should be overrided by child
 * 
 * @returns {number}
 */
YGMonster.prototype.getSpeed = function()
{
	return null;
};

/**
 * Return the score for the player when the monster is killed
 * Should be overrided by child
 * 
 * @returns {number}
 */
YGMonster.prototype.getBaseScore = function()
{
	return null;
};

/**
 * Return the number of life of the monster
 * Should be overrided by child
 * 
 * @returns {number}
 */
YGMonster.prototype.getNumberOfLife = function()
{
	return null;
};

/**
 * Called before destruction of this monster to clean up variables
 * Can be overrided by child
 */
YGMonster.prototype.onDestroy = function()
{
	
};

//----------------------------------------->

/**
 * Called when the monster receive a shot
 * 
 * @returns {boolean} true if the monster should die, false otherwise
 */
YGMonster.prototype.shot = function()
{
	this._life--;
	
	if( this._life <= 0 )
	{
		return true;
	}
	
	return false;
};

//----------------------------------------->

/**
 * Get the body of the object
 * @returns {box2d.Body} 
 */
YGMonster.prototype.getBody = function( )
{
	return this._body;
};

/**
 * Set the body of the object & apply linear velocity
 * 
 * @param {box2d.Body} body
 */
YGMonster.prototype.setBody = function( body )
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
YGMonster.prototype.getShape = function()
{
	var shapeDef = new box2d.BoxDef();
	
   	shapeDef.restitution = 0;
   	shapeDef.density = 1;
   	shapeDef.friction = 0;
   	shapeDef.extents.Set(this.getSize().width / 2, this.getSize().height / 2);
   	shapeDef.categoryBits = 0x0008;
   	shapeDef.maskBits = ~0x0008; // Touch everything except other monsters
   	
   	return shapeDef;
};