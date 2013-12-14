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
	 * Boolean that tell if the hero has been killed during contacts
	 * @type {boolean}
	 * @private
	 */
	this._heroKilled = false;
	
	/**
	 * Array that contains object to remove
	 * @type Array
	 * @private
	 */
	this._objectToRemove = new Array();
	
	/**
	 * Array that contains object to remove
	 * @type Array
	 * @private
	 */
	this._monstersDestroyed = new Array();
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

/**
 * Add a monster that just get destroyed
 * @param {YGMonster} monster
 */
YGContactsResult.prototype.addDestroyedMonster = function(monster)
{
	if( this._monstersDestroyed.indexOf(monster) < 0 )
	{
		this._monstersDestroyed.push(monster);
	}
};

/**
 * Return monsters that have been destroyed
 * @returns {Array}
 */
YGContactsResult.prototype.getDestroyedMonsters = function()
{
	return this._monstersDestroyed;
};

/**
 * Set the boolean that tell if the hero has been killed
 * 
 * @param {boolean} killed
 */
YGContactsResult.prototype.setHeroKilled = function(killed)
{
	this._heroKilled = killed;
};

/**
 * Return true if the hero has been killed
 * @returns {Boolean}
 */
YGContactsResult.prototype.isHeroKilled = function()
{
	return this._heroKilled;
};