goog.provide('YGFireRateBonus');

goog.require('YGBonus');

/**
 * A bonus that up hero fire rate
 * 
 * @constructor
 * @extends {YGFireRateBonus}
 */
YGFireRateBonus = function()
{
	goog.base(this);
	
	this.setSize(20, 20);
	this.setFill("#FFFF00");
};

goog.inherits(YGFireRateBonus, YGBonus);