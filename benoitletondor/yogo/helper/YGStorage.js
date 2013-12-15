goog.provide('YGStorage');

/**
 * Store a value in localstorage is available, fallback on cookie
 * 
 * @param {string} key
 * @param {string} value
 */
YGStorage.store = function(key, value)
{
	if( YGStorage.isLocalStorageAvailable() )
	{
		localStorage.setItem(key, value);
	}
	else
	{
		var cookie = [name, '=', value, '; domain=.', window.location.host.toString(), '; path=/;'].join('');
		document.cookie = cookie;
	}
};

/**
 * Read a value
 * 
 * @returns {string} value if found, null otherwise
 */
YGStorage.read = function(key)
{
	if( YGStorage.isLocalStorageAvailable() )
	{
		return localStorage.getItem(key);
	}
	
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
};

/**
 * Check if localstorage is available
 * 
 * @returns {boolean}
 */
YGStorage.isLocalStorageAvailable = function()
{
	try 
	{
		return 'localStorage' in window && window['localStorage'] !== null;
	} 
	catch (e) 
	{
		return false;
	}
};