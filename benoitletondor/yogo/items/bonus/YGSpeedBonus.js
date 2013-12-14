goog.provide('YGSpeedBonus');

goog.require('YGBonus');

/**
 * A bonus that up hero's speed
 * 
 * @constructor
 * @extends {YGBonus}
 */
YGSpeedBonus = function()
{
	goog.base(this);
	
	this.setSize(20, 20);
	this.setFill("#FF8800");
};

goog.inherits(YGSpeedBonus, YGBonus);