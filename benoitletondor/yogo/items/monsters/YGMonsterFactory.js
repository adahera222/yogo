goog.provide('YGMonsterFactory');

goog.require('YGZombieMonster');
goog.require('YGSprinterMonster');
goog.require('YGBossMonster');

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

	return new YGZombieMonster(); 
};

/**
 * Create and return a boss
 * 
 * @returns {YGBossMonster}
 */
YGMonsterFactory.createBoss = function()
{
	return new YGBossMonster();
};