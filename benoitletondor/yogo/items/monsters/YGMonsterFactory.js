goog.provide('YGMonsterFactory');

goog.require('YGZombieMonster');
goog.require('YGSprinterMonster');

/**
 * Create and return a new monster with a random type
 * 
 * @returns {YGMonster}
 */
YGMonsterFactory.createMonster = function()
{
	var random = Math.random();
	
	if( random >= 0.8 ) // 20% chance to get a sprinter
	{
		return new YGSprinterMonster(); 
	}
	else
	{
		return new YGZombieMonster();  
	}
};