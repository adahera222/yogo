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
	
	this.setFill("assets/zombie.png");
	this.setSize(20, 18);
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