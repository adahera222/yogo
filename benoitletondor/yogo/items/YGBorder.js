goog.provide('YGBorder');

goog.require('lime.Sprite');
goog.require('box2d.BoxDef');

/**
 * A scene border
 * 
 * @constructor
 * @param {goog.math.Size} directorSize
 * @param {YGBorder.Orientation} orientation
 * @implements {STPPhysicObject}
 * @extends {lime.Sprite}
 */
YGBorder = function(directorSize, orientation)
{
	goog.base(this);
	
	if( orientation == YGBorder.Orientation.VERTICAL )
	{
		this.setSize(10, directorSize.height);
	}
	else
	{
		this.setSize(directorSize.width, 10);
	}
	
    this.setFill("#AAAAAA");
    
    /**
     * The physic body of the object
     * @type {box2d.Body}
     * @private
     */
    this._body = null;
};

goog.inherits(YGBorder, lime.Sprite);

//--------------------------------------------->

/**
 * Orientation of the border
 * @expose
 */
YGBorder.Orientation = {
	VERTICAL : "vertical",
	HORIZONTAL : "horizontal"
};

/**
 * Size of the border
 * @expose
 */
YGBorder.Size = 10;

//--------------------------------------------->

/**
 * Get the body of the object
 * @returns {box2d.Body} 
 */
YGBorder.prototype.getBody = function( )
{
	return this._body;
};

/**
 * Set the body of the object
 * @param {box2d.Body} body
 */
YGBorder.prototype.setBody = function( body )
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
YGBorder.prototype.getShape = function()
{
	var shapeDef = new box2d.BoxDef();
	
   	shapeDef.restitution = 0;
   	shapeDef.density = 0; // Static
   	shapeDef.friction = 1;
   	shapeDef.extents.Set(this.getSize().width / 2, this.getSize().height / 2);
   	
   	return shapeDef;
};