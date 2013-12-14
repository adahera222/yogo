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
    			results.addDestroyedMonster(object2);
    			
    			results.addObjectToRemove(object2);
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
    			results.addDestroyedMonster(object1);
    			
    			results.addObjectToRemove(object2);
    			results.addObjectToRemove(object1);
    		}
    	}
    	
    	/*
    	 * Hero
    	 */
    	if( (object1 instanceof YGHero) && (object2 instanceof YGMonster) )
    	{
    		results.setHeroKilled(true);
    	}
    	else if( (object1 instanceof YGMonster) && (object2 instanceof YGHero) )
    	{
    		results.setHeroKilled(true);
    	}
    }
    
    return results;
};