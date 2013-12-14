goog.provide('YGScoreManager');

/**
 * Object that manage current player score
 */
YGScoreManager = function()
{
	/**
	 * Current score
	 * @type {number}
	 * @private
	 */
	this._score = 0;
	
	/**
	 * Current multiplier
	 * @type {number}
	 * @private
	 */
	this._currentMultiplier = 1;
};

// -------------------------------------->

/**
 * Compute score for killed monster
 * 
 * @param {Array} monsters
 * @returns {boolean} has the score been updated
 */
YGScoreManager.prototype.computeScoreForKilledMonsters = function(monsters)
{
	if( !monsters )
	{
		return false;
	}
	
	if( monsters.length == 0 )
	{
		return false;
	}
	
	for( var i in monsters )
	{
		var monster = monsters[i];
		this._score += monster.getBaseScore() * this._currentMultiplier;
	}
	
	return true;
};

/**
 * Return the current score
 * 
 * @returns {Number}
 */
YGScoreManager.prototype.getScore = function()
{
	return this._score;
};

/**
 * Return the current score multiplier
 */
YGScoreManager.prototype.getScoreMultiplier = function()
{
	return this._currentMultiplier;
};