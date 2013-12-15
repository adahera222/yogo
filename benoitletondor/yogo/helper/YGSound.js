goog.provide('YGSound');

goog.require('lime.audio.Audio');

/**
 * Sound class that fix lime.audio.Audio bug with new webaudio API
 * https://developer.mozilla.org/en-US/docs/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
 * 
 * @constructor
 * @param {string} filePath
 * @extends {lime.audio.Audio}
 */
YGSound = function(filePath)
{
	/**
	 * Is the new API available on the browser
	 * @type {Boolean}
	 * @private
	 */
	this._newAPI = false;
	
	try
	{
		this._newAPI = goog.isDefAndNotNull(new lime.audio.AudioContext()["createGain"]);
	}
	catch(e)
	{
		this._newAPI = false;
	}
	
	goog.base(this, filePath);
};

goog.inherits(YGSound, lime.audio.Audio);

// --------------------------------------->

/**
 * @override
 * @inheritDoc
 */
YGSound.prototype.prepareContext_ = function()
{
	if( this._newAPI )
	{
		if (lime.audio.context) return;
	    var context = lime.audio.context = new lime.audio.AudioContext();
	    var gain = lime.audio.masterGain = context['createGain']();
	    gain['connect'](context['destination']);
	}
	else
	{
		goog.base(this, "prepareContext_");
	}
};

/**
 * @override
 * @inheritDoc
 */
YGSound.prototype.play = function(opt_loop) 
{
	if( this._newAPI )
	{
		if (!this.isLoaded()) {
	        this.autoplay_ = goog.array.toArray(arguments);
	    }
	    if (this.isLoaded() && !this.isPlaying() && !lime.audio.getMute()) {
	        if (lime.audio.AudioContext) {
	            if (this.source && this.source['playbackState'] == this.source['FINISHED_STATE']) {
	                this.playPosition_ = 0;
	            }
	            this.source = lime.audio.context['createBufferSource']();
	            this.source.buffer = this.buffer;
	            this.gain = lime.audio.context['createGain']();
	            this.gain['connect'](lime.audio.masterGain);
	            this.gain['gain']['value'] = this.volume_;
	            this.source['connect'](this.gain);

	            this.playTime_ = lime.audio.context['currentTime'];
	            var delay = arguments[1] || 0;

	            if (this.playPosition_ > 0) {
	                this.source['start'](delay, this.playPosition_, this.buffer.duration - this.playPosition_);
	            }
	            else {
	                this.source['start'](delay);
	            }
	            this.playPositionCache = this.playPosition_;
	            this.endTimeout_ = setTimeout(goog.bind(this.onEnded_, this),
	                (this.buffer.duration - (this.playPosition_ || 0)) * 1000 - 150);
	        }
	        else {
	            this.baseElement.play();
	        }
	        this.playing_ = true;
	        this.loop_ = !!opt_loop;
	        if (lime.audio._playQueue.indexOf(this) == -1) {
	          lime.audio._playQueue.push(this);
	        }
	    }
	}
	else
	{
		goog.base(this, "play", opt_loop);
	}
};

/**
 * @override
 * @inheritDoc
 */
YGSound.prototype.stop = function() 
{
	if( this._newAPI )
	{
		if (!this.isLoaded()) {
	        this.autoplay_ = null;
	    }
	    if (this.isPlaying()) {
	        if (lime.audio.AudioContext) {
	            clearTimeout(this.endTimeout_);
	            this.playPosition_ = lime.audio.context.currentTime - this.playTime_ + (this.playPosition_ || 0);
	            if (this.playPosition_ > this.buffer.duration) {
	                this.playPosition_ = 0;
	            }
	            this.source['stop'](0);
	            this.gain['disconnect'](lime.audio.masterGain);
	            this.source = null;
	        }
	        else {
	            this.baseElement.pause();
	        }
	        this.playing_ = false;
	    }
	}
	else
	{
		goog.base(this, "stop");
	}
};
