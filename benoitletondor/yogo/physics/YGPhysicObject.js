goog.provide('YGPhysicObject');

/**
 * Interface to implements for all physics objects
 * @interface
 */
YGPhysicObject = function()
{};

/**
 * Get the body of the object
 * @returns {box2d.Body} 
 */
YGPhysicObject.prototype.getBody = function( )
{};

/**
 * Set the body of the object
 * @param {box2d.Body} body
 */
YGPhysicObject.prototype.setBody = function( body )
{};

/**
 * Get the shape definition of this object
 * @returns {box2d.ShapeDef}
 */
YGPhysicObject.prototype.getShape = function()
{};

/**
 * Get the size of this object
 * @returns {goog.math.Size}
 */
YGPhysicObject.prototype.getSize = function()
{};