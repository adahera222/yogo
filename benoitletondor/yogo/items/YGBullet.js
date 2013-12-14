goog.provide('YGBullet');

goog.require('lime.Sprite');
goog.require('box2d.BoxDef');

/**
 * A bullet fired by the hero
 * 
 * @constructor
 * @param {box2d.Vec2} force
 * @implements {STPPhysicObject}
 * @extends {lime.Sprite}
 */
YGBullet = function(force)
{
	goog.base(this);
	
	this.setSize(6, 3);
	this.setFill("#eebd12");
	
	/**
	 * Start force
	 * @type {box2d.Vec2}
	 * @private
	 */
	this._force = force;
	
	/**
     * The physic body of the object
     * @type {box2d.Body}
     * @private
     */
    this._body = null;
};

goog.inherits(YGBullet, lime.Sprite);

// ---------------------------------------->

/**
 * Get the body of the object
 * @returns {box2d.Body} 
 */
YGBullet.prototype.getBody = function( )
{
	return this._body;
};

/**
 * Set the body of the object & apply linear velocity
 * 
 * @param {box2d.Body} body
 */
YGBullet.prototype.setBody = function( body )
{
	if( body )
	{
		this._body = body;
		this._body.SetLinearVelocity(this._force);
	}
};

/**
 * Get the shape definition of this object
 * @returns {box2d.BoxDef}
 */
YGBullet.prototype.getShape = function()
{
	var shapeDef = new box2d.BoxDef();
	
   	shapeDef.restitution = 0;
   	shapeDef.density = 1;
   	shapeDef.friction = 0;
   	shapeDef.extents.Set(this.getSize().width / 2, this.getSize().height / 2);
   	shapeDef.categoryBits = 0x0004;
   	shapeDef.maskBits = 0x0001 | 0x0008; // static + monsters
   	
   	return shapeDef;
};