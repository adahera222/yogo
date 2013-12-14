goog.provide('YGBonusFactory');

goog.require('YGFireRateBonus');

/**
 * Create and return a new bonus with a random type
 * 
 * @returns {YGBonus}
 */
YGBonusFactory.createBonus = function()
{
	var random = Math.random();
	
	if( random >= 0.5 ) // 50% chance to get a fire rate
	{
		return new YGFireRateBonus(); 
	}
	else
	{
		return new YGFireRateBonus();  //TODO
	}
};