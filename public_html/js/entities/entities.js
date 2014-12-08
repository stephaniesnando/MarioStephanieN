// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x,y, {
                image: "mario",
                spritewidth: "128",
                spriteheight:"128",
                width: 128,
                height: 128,
                getShape: function (){
                    return (new me.Rect(0, 0, 30, 128)).toPolygon();
                }
       }]);
    
        this.renderable.addAnimation("idle", [3]);
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
        this.renderable.addAnimation("jump", [5, 5]);
        
        this.renderable.setCurrentAnimation("idle");
        
        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update: function(delta) {
        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(false);
            
            
        } else if (me.input.isKeyPressed('left')) {
            // unflip the sprite
            this.flipX(true);
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
            }
            
        }else{
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("jump")){
            if(!this.body.jumping && !this.body.falling){
                this.body.jumping = true;
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }
        }
  
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
                
            }
        }else{
            this.renderable.setCurrentAnimation("idle");
        }


        this._super(me.Entity, "update", [delta] );
        return true;
    },
                            
    collideHandler: function(response){
    }
    
    
});


//this.updateMovement();
//    if(this.vel.y !=0){
//        this.setCurrentAnimation("jump");
//    }else {
//        this.setCurrentAnimation("walk");
//    }

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        console.log("Trigger");
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
        },
    
    onCollision: function(){
        console.log("BOOOOM!!!@!@!!!!");
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current(). resetPlayer(this.xSpawn, this.ySpawn);
    }
    
});

game.BadGuy = me.Entity.extend({
    init: function (x, y, settings){
       this._super(me.Entity, 'init', [x,y, {
                image: "slime",
                spritewidth: "60",
                spriteheight:"28",
                width: 60,
                height: 28,
                getShape: function (){
                    return (new me.Rect(0, 0, 60, 28)).toPolygon();
                }
       }]); 
   
   this.spritewidth = 60;
   x = this.pos.x;
   this.startX = x;
   
    },
    
    update: function(delta){
        
    }
    
});