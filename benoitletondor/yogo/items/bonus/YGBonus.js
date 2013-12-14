goog.provide('YGBonus');

goog.require('lime.Sprite');
goog.require('box2d.BoxDef');

/**
 * An abstract bonus
 * 
 * @constructor
 * @extends {lime.Sprite}
 * @implements {STPPhysicObject}
 */
YGBonus = function()
{
	goog.base(this);
	
	this.setSize(20, 20);
	this.setFill("#FFFF00");
	
	/**
     * The physic body of the object
     * @type {box2d.Body}
     * @private
     */
    this._body = null;
};

goog.inherits(YGBonus, lime.Sprite);

// ---------------------------------------->

/**
 * Get the body of the object
 * @returns {box2d.Body} 
 */
YGBonus.prototype.getBody = function( )
{
	return this._body;
};

/**
 * Set the body of the object & apply linear velocity
 * 
 * @param {box2d.Body} body
 */
YGBonus.prototype.setBody = function( body )
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
YGBonus.prototype.getShape = function()
{
	var shapeDef = new box2d.BoxDef();
	
   	shapeDef.restitution = 0;
   	shapeDef.density = 1;
   	shapeDef.friction = 0;
   	shapeDef.extents.Set(this.getSize().width / 2, this.getSize().height / 2);
   	shapeDef.categoryBits = 0x00012;
   	shapeDef.maskBits = 0x0002 | 0x0001; // Touch hero & static
   	
   	return shapeDef;
};