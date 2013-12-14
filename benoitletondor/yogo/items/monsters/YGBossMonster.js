goog.provide('YGBossMonster');

goog.require('YGMonster');

/**
 * A boss monster, stronger than others
 * 
 * @constructor
 * @extends {YGMonster}
 */
YGBossMonster = function()
{
	goog.base(this);
	
	this.setFill("#006633");
	this.setSize(20, 20);
};

goog.inherits(YGBossMonster, YGMonster);

// ------------------------------------------>

/**
 * @inheritDoc
 * @override
 */
YGBossMonster.prototype.getBaseScore = function()
{
	return 100;
};

/**
 * @inheritDoc
 * @override
 */
YGBossMonster.prototype.getSpeed = function()
{
	return 30;
};

/**
 * @inheritDoc
 * @override
 */
YGBossMonster.prototype.getNumberOfLife = function()
{
	return 10;
};