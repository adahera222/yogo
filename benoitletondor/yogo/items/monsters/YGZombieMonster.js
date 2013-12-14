goog.provide('YGZombieMonster');

goog.require('YGMonster');

YGZombieMonster = function()
{
	goog.base(this);
	
	this.setFill("#0000FF");
	this.setSize(20, 20);
};

goog.inherits(YGZombieMonster, YGMonster);

// ------------------------------------->