goog.provide('YGContactsResult');

/**
 * Object that contains contacts resolution result
 * 
 * @constructor
 * @returns {YGContactsResult}
 */
YGContactsResult = function()
{
	/**
	 * Array that contains object to remove
	 * @type Array
	 * @private
	 */
	this._objectToRemove = new Array();
};

// ------------------------------------->

/**
 * Add an object to remove
 * @param {YGPhysicObject} object
 */
YGContactsResult.prototype.addObjectToRemove = function(object)
{
	if( this._objectToRemove.indexOf(object) < 0 )
	{
		this._objectToRemove.push(object);
	}
};

/**
 * Return objects to remove from the scene
 * @returns {Array}
 */
YGContactsResult.prototype.getObjectsToRemove = function()
{
	return this._objectToRemove;
};