goog.provide("YGImplements");

/**
 * Helper to ensure that an object implements an interface
 * 
 * @param * object the object to test
 * @param Class classToImplement interface to test
 * @returns boolean
 */
YGImplements.impls = function(object, classToImplement)
{
	// Creation of an instance of the interface
	var instance = new classToImplement();
	
	// Iteration over instance properties
	for( var propertyName in instance ) 
	{	
		/*
		 * Check if property exists
		 */
		if( !goog.isDefAndNotNull(object[propertyName]) )
		{
			return false;
		}
		
		/*
		 * Check type
		 */
		if( !goog.typeOf(object[propertyName]) == goog.typeOf(instance[propertyName]) )
		{
			return false;
		}
	}
	
	return true;
};