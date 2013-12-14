goog.provide('YGBonusManager');

goog.require('YGFireRateBonus');
goog.require('YGSpeedBonus');
goog.require('YGInvertedBonus');

/**
 * Object that manage bonuses
 * 
 * @constructor
 * @param {YGHero} hero
 */
YGBonusManager = function(hero)
{
	/**
	 * The hero to give bonus to
	 * @type {YGHero}
	 * @private
	 */
	this._hero = hero;
};

// --------------------------------------->

/**
 * Method to call when a bonus is take by the hero
 * 
 * @param {Array} bonuses
 */
YGBonusManager.prototype.onBonuses = function(bonuses)
{
	if( !bonuses )
	{
		return;
	}
	
	for( var i in bonuses )
	{
		var bonus = bonuses[i];
		
		if( bonus instanceof YGFireRateBonus )
		{
			this.addFireRateBonus();
		}
		else if( bonus instanceof YGSpeedBonus )
		{
			this.addSpeedBonus();
		}
		else if( bonus instanceof YGInvertedBonus )
		{
			this.addInvertedBonus();
		}
	}
};

//--------------------------------------->

/**
 * Add the fire rate bonus
 */
YGBonusManager.prototype.addFireRateBonus = function()
{
	lime.scheduleManager.unschedule(this.removeFireRateBonus, this);
	lime.scheduleManager.scheduleWithDelay(this.removeFireRateBonus, this, 5000, 1);
	
	this._hero.setFireRate(YGHero.defaultFireRate / 2);
};

/**
 * Remove the fire rate bonus
 */
YGBonusManager.prototype.removeFireRateBonus = function()
{
	this._hero.setFireRate(YGHero.defaultFireRate);
};

//--------------------------------------->

/**
 * Add the speed bonus
 */
YGBonusManager.prototype.addSpeedBonus = function()
{
	lime.scheduleManager.unschedule(this.removeSpeedBonus, this);
	lime.scheduleManager.scheduleWithDelay(this.removeSpeedBonus, this, 5000, 1);
	
	this._hero.setSpeed(YGHero.defaultSpeed * 2);
};

/**
 * Remove the speed bonus
 */
YGBonusManager.prototype.removeSpeedBonus = function()
{
	this._hero.setSpeed(YGHero.defaultSpeed);
};

// --------------------------------------->

/**
 * Add the inverted bonus
 */
YGBonusManager.prototype.addInvertedBonus = function()
{
	lime.scheduleManager.unschedule(this.removeInvertedBonus, this);
	lime.scheduleManager.scheduleWithDelay(this.removeInvertedBonus, this, 2000, 1);
	
	this._hero.setInverted(true);
};

/**
 * Remove the inverted bonus
 */
YGBonusManager.prototype.removeInvertedBonus = function()
{
	this._hero.setInverted(false);
};