goog.provide('YGZombieMonster');

goog.require('YGMonster');

/**
 * A slow & stupid monster
 * 
 * @constructor
 * @extends {YGMonster}
 */
YGZombieMonster = function()
{
	goog.base(this);
	
	this.setFill("#0000FF");
	this.setSize(10, 10);
};

goog.inherits(YGZombieMonster, YGMonster);

// ------------------------------------->

/**
 * @inheritDoc
 * @override
 */
YGZombieMonster.prototype.getBaseScore = function()
{
	return 10;
};

/**
 * @inheritDoc
 * @override
 */
YGZombieMonster.prototype.getSpeed = function()
{
	return 10;
};

/**
 * @inheritDoc
 * @override
 */
YGZombieMonster.prototype.getNumberOfLife = function()
{
	return 1;
};