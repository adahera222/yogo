goog.provide('YGSprinterMonster');

goog.require('YGMonster');

/**
 * A monster that get quicker with time
 * 
 * @constructor
 * @extends {YGMonster}
 */
YGSprinterMonster = function()
{
	goog.base(this);
	
	this.setFill("#00FFFF");
	this.setSize(20, 20);
	
	/**
	 * Speed factor
	 * @type {number}
	 * @private
	 */
	this._speedFactor = 1;
	
	/*
	 * Fire scheduling
	 */
	lime.scheduleManager.scheduleWithDelay(this.speedUp, this, 1000);
};

goog.inherits(YGSprinterMonster, YGMonster);

// ------------------------------------->

/**
 * @inheritDoc
 * @override
 */
YGSprinterMonster.prototype.onDestroy = function()
{
	// Destroy scheduled task
	lime.scheduleManager.unschedule(this.speedUp, this);
};

/**
 * @inheritDoc
 * @override
 */
YGSprinterMonster.prototype.getSpeed = function()
{
	return 10 * this._speedFactor;
};

/**
 * Increment speed factor
 */
YGSprinterMonster.prototype.speedUp = function()
{
	this._speedFactor += 1;
};