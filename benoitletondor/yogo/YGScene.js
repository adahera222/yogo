goog.provide('YGScene');

goog.require('lime.Scene');
goog.require('box2d.World');
goog.require('box2d.Vec2');
goog.require('box2d.BodyDef');
goog.require('goog.events.EventType');
goog.require('YGHero');
goog.require('YGBorder');
goog.require('YGPhysicObject');
goog.require('YGContactsWatcher');
goog.require('YGImplements');
goog.require('YGMonsterFactory');
goog.require('YGMonster');
goog.require('YGMath');
goog.require('YGScoreManager');

YGScene = function(director)
{
	goog.base(this);
	
	/**
	 * Director containing this scene
	 * @type {lime.Director}
	 * @private
	 */
	this._director = director;
	
	/**
	 * Array containing all objects subject of physic
	 * @type {Array}
	 * @private
	 */
	this._physicsObjects = new Array();
	
	/*
	 * Physic
	 */
	var bounds = new box2d.AABB();
	bounds.minVertex.Set(-director.getSize().width, -director.getSize().height);
	bounds.maxVertex.Set(director.getSize().width, director.getSize().height);
	
	/**
	 * Physic world
	 * @type {box2d.World}
	 * @private
	 */
	this._world = new box2d.World(bounds, new box2d.Vec2(0, 0), false);
	
	/**
	 * The hero !
	 * @type {YGHero}
	 * @private
	 */
	this._hero = this.createHero();
	
	/**
	 * Array of monsters
	 * @type {Array}
	 * @private
	 */
	this._monsters = new Array();
	
	/**
	 * Score manager
	 * @type {YGScoreManager}
	 * @private
	 */
	this._scoreManager = new YGScoreManager();
	
	/*
	 * Add borders
	 */
	this.addBorders();
	
	/*
	 * Main loop binding
	 */
	lime.scheduleManager.schedule(this.mainLoop, this);
	
	/*
	 * Monster appear scheduling
	 */
	lime.scheduleManager.scheduleWithDelay(this.manageMonsters, this, 500);
};

goog.inherits(YGScene, lime.Scene);

//----------------------------------------->

/**
 * Main loop
 * @param int dt Delta time since the last mainloop call
 */
YGScene.prototype.mainLoop = function( dt )
{
	/*
	 * Physic
	 */
	if( dt>100 )
	{
		dt=100; // long delays(after pause) cause false collisions
	}
	
	/*
	 * Step the world !
	 */
    this._world.Step(dt / 1000, 1);
	for( var i in this._physicsObjects )
	{
		var physicObject = this._physicsObjects[i];
		
		// Apply forces to the object
		physicObject.setPosition(physicObject.getBody().GetCenterPosition());
		
		// Apply rotation if it's not the hero (the hero handle his own rotation)
		if( !(physicObject instanceof YGHero) )
		{
			physicObject.setRotation(YGMath.radianToDegree(physicObject.getBody().GetRotation()));
		}
	}
	
	/*
	 * Get contacts results
	 */
	var contactResults = YGContactsWatcher.onContacts(this._world.GetContactList());
	if( contactResults.isHeroKilled() )
	{
		//TODO
	}
	
	/*
	 * Manage score
	 */
	var newScore = this._scoreManager.computeScoreForKilledMonsters(contactResults.getDestroyedMonsters());
	if( newScore )
	{
		//TODO
	}
	
	/*
	 * Remove all objects that needs to
	 */
	var objectToRemove = contactResults.getObjectsToRemove();
	for( var j in objectToRemove )
	{
		var object = objectToRemove[j];
		this.removeChild(object);
	}
};

//--------------------------------------------->

/**
 * @override
 * @param child
 */
YGScene.prototype.appendChild = function( child )
{
	// If the object to add is a STPPhysicObject
	if( YGImplements.impls(child, YGPhysicObject) )
	{
		// Add it to the physic objects list
		this.subscribeObjectToPhysic(child);
	};
	
	// Call super
	goog.base(this, "appendChild", child);
};

/**
 * @override
 * @param child
 */
YGScene.prototype.removeChild = function( child )
{
	// If the object to add is a STPPhysicObject
	if( YGImplements.impls(child, YGPhysicObject) )
	{
		this.unsubscribeObjectToPhysic(child);
	};
	
	// Special behavior for monster
	if( child instanceof YGMonster )
	{
		// Call on destroy
		child.onDestroy();
		
		// Remove from array
		var index = this._monsters.indexOf(child);
		if (index > -1) 
		{
			
			this._monsters.splice(index, 1);
		}
	}
	
	// Call super
	goog.base(this, "removeChild", child);
};

/**
 * Subscribe an object to the physic loop
 * @param {YGPhysicObject} object
 */
YGScene.prototype.subscribeObjectToPhysic = function( object )
{
	if( object )
	{
		/*
		 * Save in array
		 */
		this._physicsObjects.push( object );
		
		/*
		 * Create body
		 */
		var bodyDef = new box2d.BodyDef();
        bodyDef.position.Set(object.getPosition().x, object.getPosition().y);
        bodyDef.rotation = YGMath.degreeToRadian(object.getRotation());
        bodyDef.AddShape(object.getShape());
        bodyDef.userData = object; //FIXME circular references is probably a bad idea
    	
        /*
         * Set body
         */
       	object.setBody(this._world.CreateBody(bodyDef));
	}
};

/**
 * Unsubscribe an object to the physic loop
 * @param {YGPhysicObject} object
 */
YGScene.prototype.unsubscribeObjectToPhysic = function( object )
{
	if( object )
	{
		/*
		 * Remove in array
		 */
		var index = this._physicsObjects.indexOf(object);
		if (index > -1) 
		{
			this._physicsObjects.splice(index, 1);
		}
		
		/*
		 * Destroy body
		 */
		var body = object.getBody();
	
		body.m_userData = null; // To avoid memory leaks
		this._world.DestroyBody(body);
	}
};

// --------------------------------------------->

/**
 * Manage current monsters & add a new monster
 */
YGScene.prototype.manageMonsters = function()
{
	/*
	 * Assign all monsters their new force & rotation
	 */
	for( var i in this._monsters )
	{
		var monster = this._monsters[i];
		
		var newForce = YGMath.getVectorBetweenPosition(monster.getPosition(), YGHero.Instance.getPosition(), monster.getSpeed());
		monster.getBody().SetLinearVelocity(newForce);
	}
	
	
	/*
	 * Create a new monster
	 */
	var monster = YGMonsterFactory.createMonster();
	
	// Compute position
	var x = 0;
	var y = Math.random() * this._director.getSize().height;
	if( y <= 50 || y > this._director.getSize().height - 50 )
	{
		x = Math.random() * this._director.getSize().width;
	}
	else
	{
		x = Math.random()* 50;
		
		if( Math.random() > 0.5 )
		{
			x+= this._director.getSize().width - 50; 
		}
	}
	
	x = Math.max(YGBorder.Size, x);
	y = Math.max(YGBorder.Size, y);
	x = Math.min(this._director.getSize().width-YGBorder.Size, x);
	y = Math.min(this._director.getSize().height-YGBorder.Size, y);
	
	monster.setPosition(x, y);
	
	//Add to monsters array & to the scene
	this._monsters.push(monster);
	this.appendChild(monster);
};

/**
 * Add borders to the scene
 */
YGScene.prototype.addBorders = function()
{
	var left = new YGBorder(this._director.getSize(), YGBorder.Orientation.VERTICAL);
	left.setPosition((YGBorder.Size/2), (this._director.getSize().height/2));
	this.appendChild(left);
	
	var right = new YGBorder(this._director.getSize(), YGBorder.Orientation.VERTICAL);
	right.setPosition(this._director.getSize().width - (YGBorder.Size/2), this._director.getSize().height/2);
	this.appendChild(right); 
	
	var top = new YGBorder(this._director.getSize(), YGBorder.Orientation.HORIZONTAL);
	top.setPosition(this._director.getSize().width/2, YGBorder.Size/2);
	this.appendChild(top);
	
	var bottom = new YGBorder(this._director.getSize(), YGBorder.Orientation.HORIZONTAL);
	bottom.setPosition(this._director.getSize().width/2, this._director.getSize().height - YGBorder.Size/2);
	this.appendChild(bottom);
};

/**
 * Create a hero at the center of the scene
 * @returns {YGHero}
 */
YGScene.prototype.createHero = function()
{
	var hero = new YGHero(this, this._director);
	hero.setPosition(this._director.getSize().width/2, this._director.getSize().height/2);
	this.appendChild(hero);
	return hero;
};