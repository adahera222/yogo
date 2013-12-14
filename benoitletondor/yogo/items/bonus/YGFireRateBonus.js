goog.provide('YGFireRateBonus');

goog.require('YGBonus');

/**
 * A bonus that up hero's fire rate
 * 
 * @constructor
 * @extends {YGBonus}
 */
YGFireRateBonus = function()
{
	goog.base(this);
	
	this.setSize(20, 20);
	this.setFill("#FFFF00");
};

goog.inherits(YGFireRateBonus, YGBonus);