goog.provide('YGBonusFactory');

goog.require('YGFireRateBonus');
goog.require('YGSpeedBonus');
goog.require('YGInvertedBonus');

/**
 * Create and return a new bonus with a random type
 * 
 * @returns {YGBonus}
 */
YGBonusFactory.createBonus = function()
{
	var random = Math.random();
	
	if( random <= 0.4 ) // 40% chance to get a fire rate
	{
		return new YGFireRateBonus(); 
	}
	else if( random > 0.4 && random <= 0.8 ) // 40% chance to get a speed bonus
	{
		return new YGSpeedBonus();
	}
	
	return new YGInvertedBonus(); // 20% chance to get inverted malus
};