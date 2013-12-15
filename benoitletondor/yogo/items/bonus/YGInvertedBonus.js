goog.provide('YGInvertedBonus');

goog.require('YGBonus');

/**
 * A bonus that invert hero's rotation
 * 
 * @constructor
 * @extends {YGBonus}
 */
YGInvertedBonus = function()
{
	goog.base(this);
};

goog.inherits(YGInvertedBonus, YGBonus);