//Hello World of Phaser=Basic Game=Single Scene in Spin & Win Game
//How to create the basic skeleton for the game->Game Loop

let prizes_config={
    count:12,
    prize_names:["3000 Credits","35% off","HardLuck","70% OFF","Swagpack","100% OFF","Netflix","50% OFF","Amazon Voucher","2 Extra Spin","CB Tshirt","CB Book"]
};
//var canSpin;
//var button;

let config={
    type:Phaser.WEBGL,
    width:800,
    height:600,
    backgroundColor:0xffcc00,
    
    scene:{
        preload:preload,
        create:create,
        update:update,
    },
    audio: {
        disableWebAudio: true
    }
};

let game=new Phaser.Game(config);

function preload()

{
    console.log("Preload");
    //load object,load some images
    this.load.image('background','Assets/back.jpg');
    console.log(this);
    this.load.image('button','Assets/button.png');
    this.load.image('wheel','Assets/wheel.png');
    this.load.image('pin','Assets/pin.png');
    this.load.image('stand','Assets/stand.png');
    this.load.audio('theme','Assets/gameaudio.ogg');
}
function create()
{
    console.log("Create");
    //create a backgound image
    let W=game.config.width;
    let H=game.config.height;
    background=this.add.sprite(0,0,"background")//let 0,0,'background
    background.setPosition(W/2,H/2);//background
    background.setScale(0.20);//background
    /*this.tweens.add({
        targets:background,
        angle:20,
        repeat:-1,
    });*/
    
    
    
    
     //let create a stand
    let stand=this.add.sprite(W/2,H/2+250,"stand");
    stand.setScale(0.25);
    
    //let create a wheel
   this.wheel=this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25);
    
    //let create a pin
    let pin=this.add.sprite(W/2,H/2-245,"pin");
    pin.setScale(0.25);
    //pin.depth=1(by default depth is 0)
    //scaling
    //wheel.scaleX=2;
    //wheel.scaleY=0.5;
    canSpin=true;
    
    //event listener for mouse click
    //this.input.on("pointerdown",spinwheel,this);
    
    //Add button
    var sprite=this.add.sprite(50,50,'button').setInteractive();
    sprite.setScale(0.25);
    sprite.on('pointerdown',spinwheel,this);
     
    
    //lets create text object
    font_style={
        font:"bold 25px Roboto",
        align:"center",
        color:"red",
    }
    this.game_text=this.add.text(260,5,"Welcome to spin and win",font_style);
    var text1=this.add.text(10,40,"Tap to spin",{font: '15px Arial'});
    
}

//Game loop
function update()
{
    console.log("Inside Update");
    
    
   // this.wheel.angle +=1;
   // this.wheel.scaleX +=0.01;
    //this.wheel.scaleY +=0.01;
    //this.wheel.alpha -= 0.01;
    
    
    
}

function spinwheel()
{    if(canSpin){
    this.game_text.clearTint();
    
    
    var music=this.sound.add('theme');
    
    music.play();
    console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse");
    
    let rounds=Phaser.Math.Between(2,4);
    let degrees=Phaser.Math.Between(0,11)*30;
    //console.log(rounds);
    
    let total_angle=rounds*360 + degrees;
    console.log(total_angle);
    
    let idx=prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count));
    canSpin=false;
    tween=this.tweens.add({
        targets:this.wheel,
        angle:total_angle,
        ease:"Cubic.easeOut",
        duration:6000,
        callbackScope:this,
        onComplete:function()
       {
           
            this.game_text.setText("You won "+ prizes_config.prize_names[idx]);
           this.game_text.setTint(0xff00ff,0xff00ff,0x000ff,0x000ff);
           
           canSpin=true;
           
        },
        
    });
    
}}
    
 
