goog.provide('YGContactsWatcher');

goog.require('YGContactsResult');
goog.require('YGBullet');
goog.require('YGBorder');
goog.require('YGMonster');
goog.require('YGHero');

/**
 * Iterate over contacts to resolve them
 * 
 * @param contactIterator
 * @returns {YGContactsResult} result
 */
YGContactsWatcher.onContacts = function(contactIterator)
{
	/*
	 * An array that contains all objects to remove after this step
	 */
	var results = new YGContactsResult();
	
	/*
	 * Iterate over contacts to retreive contacts with pig
	 */
    while (contactIterator) 
    {
    	var contact = contactIterator;
    	contactIterator = contact.GetNext();
    	
    	// Extract objects that are contains into body user data
    	var object1 = contact.GetShape1().GetBody().GetUserData();
    	var object2 = contact.GetShape2().GetBody().GetUserData();
    	
    	/*
    	 * Bullets
    	 */
    	if( object1 instanceof YGBullet )
    	{
    		if( object2 instanceof YGBorder )
    		{
    			results.addObjectToRemove(object1);
    		}
    		else if( object2 instanceof YGMonster )
    		{
    			// If the monster should die, destroy it
    			if( object2.shot() )
    			{
    				results.addDestroyedMonster(object2);
    				results.addObjectToRemove(object2);
    			}
    			
    			results.addObjectToRemove(object1);
    		}
    	}
    	
    	if( object2 instanceof YGBullet )
    	{
    		if( object1 instanceof YGBorder )
    		{
    			results.addObjectToRemove(object2);
    		}
    		else if( object1 instanceof YGMonster )
    		{
    			// If the monster should die, destroy it
    			if( object1.shot() )
    			{
    				results.addDestroyedMonster(object1);
    				results.addObjectToRemove(object1);
    			}
    			
    			results.addObjectToRemove(object2);
    		}
    	}
    	
    	/*
    	 * Hero
    	 */
    	if( object1 instanceof YGHero )
    	{
    		// If hero hit monster = die
    		if( object2 instanceof YGMonster )
    		{
    			results.setHeroKilled(true);
    		}
    		// If hero hit bonus = he gains it
    		else if( object2 instanceof YGBonus )
    		{
    			results.addUnlockedBonus(object2);
    			results.addObjectToRemove(object2);
    		}
    	}
    	else if( object2 instanceof YGHero )
    	{
    		// If hero hit monster = die
    		if( object1 instanceof YGMonster )
    		{
    			results.setHeroKilled(true);
    		}
    		// If hero hit bonus = he gains it
    		else if( object1 instanceof YGBonus )
    		{
    			results.addUnlockedBonus(object1);
    			results.addObjectToRemove(object1);
    		}
    	}
    }
    
    return results;
};