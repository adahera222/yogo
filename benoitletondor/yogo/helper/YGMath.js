goog.provide('YGMath');

goog.require('box2d.Vec2');

/**
 * Return the vector between positions
 * TODO add force param
 * 
 * @param {goog.math.Coordinate} basePosition
 * @param {goog.math.Coordinate} targetPosition
 * @returns {box2d.Vec2}
 */
YGMath.getVectorBetweenPosition = function(basePosition, targetPosition)
{
	var vector = new box2d.Vec2();
	vector.x = targetPosition.x - basePosition.x;
	vector.y = targetPosition.y - basePosition.y;
	
	return vector;
};

/**
 * Return the angle (in degree) of the given vector
 * http://stackoverflow.com/a/3309658/2508174
 * 
 * @param {box2d.Vec2}
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
 * @param {number}
 * @returns {number}
 */
YGMath.radianToDegree = function(radian)
{
	return radian * 180 / Math.PI;
};