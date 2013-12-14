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
 * Called before destruction of this monster to clean up variables
 * Can be overrided by child
 */
YGMonster.prototype.onDestroy = function()
{
	
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