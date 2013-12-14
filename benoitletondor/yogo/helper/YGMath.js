goog.provide('YGMath');

goog.require('box2d.Vec2');

/**
 * Return the vector between positions
 * 
 * @param {goog.math.Coordinate} basePosition
 * @param {goog.math.Coordinate} targetPosition
 * @param {number} opt_force
 * @returns {box2d.Vec2}
 */
YGMath.getVectorBetweenPosition = function(basePosition, targetPosition, opt_force)
{
	var vector = new box2d.Vec2();
	vector.x = targetPosition.x - basePosition.x;
	vector.y = targetPosition.y - basePosition.y;
	
	// If no force provided, just return the vector
	if( !opt_force )
	{
		return vector;
	}

	/*
	 * Apply force
	 */
	if( Math.abs(vector.x) > Math.abs(vector.y) )
	{
		vector.y = vector.y / Math.abs(vector.x);
		vector.x = vector.x < 0 ? -1 : 1;
	}
	else if( Math.abs(vector.x) < Math.abs(vector.y) )
	{
		vector.x = vector.x / Math.abs(vector.y);
		vector.y = vector.y < 0 ? -1 : 1;
	}
	else
	{
		vector.x = vector.x < 0 ? -1 : 1;
		vector.y = vector.y < 0 ? -1 : 1;
	}
	
	vector.x = opt_force * vector.x;
	vector.y = opt_force * vector.y;
	
	return vector;
};

/**
 * Return the angle (in degree) of the given vector
 * http://stackoverflow.com/a/3309658/2508174
 * 
 * @param {box2d.Vec2} vector
 * @returns {number}
 */
YGMath.getAngleForVector = function(vector)
{
	var angle = Math.atan2(-vector.y, vector.x);
	if (angle < 0)
	{
		angle += 2 * Math.PI;
	}
	
	return YGMath.radianToDegree(angle);
};

/**
 * Return the angle (in degree) between 2 positions
 * 
 * @param {goog.math.Coordinate} basePosition
 * @param {goog.math.Coordinate} targetPosition
 * @returns {number}
 */
YGMath.getAngleBetweenPosition = function(basePosition, targetPosition)
{
	return YGMath.getAngleForVector(YGMath.getVectorBetweenPosition(basePosition, targetPosition));
};

/**
 * Convert a radian angle to degree
 * 
 * @param {number} radian
 * @returns {number}
 */
YGMath.radianToDegree = function(radian)
{
	return radian * 180 / Math.PI;
};

/**
 * Convert a radian angle to degree
 * 
 * @param {number} degree
 * @returns {number}
 */
YGMath.degreeToRadian = function(degree)
{
	return degree * Math.PI / 180;
};