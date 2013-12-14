goog.provide('YGContactsWatcher');

goog.require('YGContactsResult');

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
    }
    
    return results;
};