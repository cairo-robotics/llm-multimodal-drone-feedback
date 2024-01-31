// Let's begin working on the background of the qued copter game. Let's go for a basic white background with two thick black borders on the left and right ends that together may occupy 30-40% of the entire game background.
// througout this code, I commented the code for the control with mouse
var myGameDrone
var landingZone
var textblock
var startGame
// var virtJoystick;
// var background;
// for talpha and theta I will start coding on the case where there are both 1. We can set conditions for other values later on.
var alpha = 1
var theta = 1
var game_done = false;
//
let XSpeed = 0;
let YSpeed = 0;
let XSpeed_alt = 0;


let checkX;
let checkY;

const d = new Date();
const h = addZero(d.getHours(), 2);
const m = addZero(d.getMinutes(), 2);
const s = addZero(d.getSeconds(), 2);
const ms = addZero(d.getMilliseconds(), 3);

let t = 400
let u = 100

// these will be the values recorded on a trial by trial basis
var trial_number = 0;
var total_games = 20;
var game_time = " ";
var Self_confi = " ";
var e_velocity = " ";
var e_attitude = " ";
var success_land = 0;
var rec_sof = 0;
var number = 0;

var myGameDronex = 0;
var myGameDroney = 0;

var start_check = false;

var t_score = 0;
var p_score = 0;
var v_score = 0;
var a_score = 0;
var rmse = 0;
var tot_score = 0;
// previous trial data

var prev1_rec_trial = " ";
var prev1_rec_time = " "; 
var prev1_rec_vel = " ";
var prev1_rec_att = " ";
var prev1_rec_sof = " ";
var prev1_game = " ";
var prev1_tot_score = " ";

var prev2_rec_trial = " ";
var prev2_rec_time = " ";
var prev2_rec_vel = " ";
var prev2_rec_att = " ";
var prev2_rec_sof = " ";
var prev2_game = " ";
var prev2_tot_score = " ";


var prev3_rec_trial = " ";
var prev3_rec_time = " ";
var prev3_rec_vel = " ";
var prev3_rec_att = " ";
var prev3_rec_sof = " ";
var prev3_game = " ";
var prev3_tot_score = " ";

var prev4_rec_trial = " ";
var prev4_rec_time = " "; 
var prev4_rec_vel = " ";
var prev4_rec_att = " ";
var prev4_rec_sof = " ";
var prev4_game = " ";
var prev4_tot_score = " ";

var prev5_rec_trial = " ";
var prev5_rec_time = " "; 
var prev5_rec_vel = " ";
var prev5_rec_att = " ";
var prev5_rec_sof = " ";
var prev5_game = " ";
var prev5_tot_score = " ";

var prev6_rec_trial = " ";
var prev6_rec_time = " "; 
var prev6_rec_vel = " ";
var prev6_rec_att = " ";
var prev6_rec_sof = " ";
var prev6_game = " ";
var prev6_tot_score = " ";

var prev7_rec_trial = " ";
var prev7_rec_time = " "; 
var prev7_rec_vel = " ";
var prev7_rec_att = " ";
var prev7_rec_sof = " ";
var prev7_game = " ";
var prev7_tot_score = " ";

var prev8_rec_trial = " ";
var prev8_rec_time = " "; 
var prev8_rec_vel = " ";
var prev8_rec_att = " ";
var prev8_rec_sof = " ";
var prev8_game = " ";
var prev8_tot_score = " ";

var prev9_rec_trial = " ";
var prev9_rec_time = " "; 
var prev9_rec_vel = " ";
var prev9_rec_att = " ";
var prev9_rec_sof = " ";
var prev9_game = " ";
var prev9_tot_score = " ";

var prev10_rec_trial = " ";
var prev10_rec_time = " "; 
var prev10_rec_vel = " ";
var prev10_rec_att = " ";
var prev10_rec_sof = " ";
var prev10_game = " ";
var prev10_tot_score = " ";

var prev11_rec_trial = " ";
var prev11_rec_time = " "; 
var prev11_rec_vel = " ";
var prev11_rec_att = " ";
var prev11_rec_sof = " ";
var prev11_game = " ";
var prev11_tot_score = " ";

var prev12_rec_trial = " ";
var prev12_rec_time = " "; 
var prev12_rec_vel = " ";
var prev12_rec_att = " ";
var prev12_rec_sof = " ";
var prev12_game = " ";
var prev12_tot_score = " ";

var prev13_rec_trial = " ";
var prev13_rec_time = " "; 
var prev13_rec_vel = " ";
var prev13_rec_att = " ";
var prev13_rec_sof = " ";
var prev13_game = " ";
var prev13_tot_score = " ";

var prev14_rec_trial = " ";
var prev14_rec_time = " "; 
var prev14_rec_vel = " ";
var prev14_rec_att = " ";
var prev14_rec_sof = " ";
var prev14_game = " ";
var prev14_tot_score = " ";

var prev15_rec_trial = " ";
var prev15_rec_time = " "; 
var prev15_rec_vel = " ";
var prev15_rec_att = " ";
var prev15_rec_sof = " ";
var prev15_game = " ";
var prev15_tot_score = " ";

var prev16_rec_trial = " ";
var prev16_rec_time = " "; 
var prev16_rec_vel = " ";
var prev16_rec_att = " ";
var prev16_rec_sof = " ";
var prev16_game = " ";
var prev16_tot_score = " ";

var prev17_rec_trial = " ";
var prev17_rec_time = " "; 
var prev17_rec_vel = " ";
var prev17_rec_att = " ";
var prev17_rec_sof = " ";
var prev17_game = " ";
var prev17_tot_score = " ";

var prev18_rec_trial = " ";
var prev18_rec_time = " "; 
var prev18_rec_vel = " ";
var prev18_rec_att = " ";
var prev18_rec_sof = " ";
var prev18_game = " ";
var prev18_tot_score = " ";

var prev19_rec_trial = " ";
var prev19_rec_time = " "; 
var prev19_rec_vel = " ";
var prev19_rec_att = " ";
var prev19_rec_sof = " ";
var prev19_game = " ";
var prev19_tot_score = " ";

// var prev20_rec_trial = " ";
// var prev20_rec_time = " "; 
// var prev20_rec_vel = " ";
// var prev20_rec_att = " ";
// var prev20_rec_sof = " ";
// var prev20_game = " ";

// variable to reinitiate timer for each trial
var time_count = 0;


//
let tsh = 5; //thrust scale height
let asw = 5; //angle scale width

//coordinate of the joystick component
var x_center = 1100;
var y_center = 470;
let delta_joystickx = 0;
let delta_joysticky = 0;
let oldpositionx = 0;
let oldpositiony = 0;
let newpositionx = 0;
let newpositiony = 0;
let arrowX = 0;
let arrowY = 0;

let lastDroneAngle = 0;

// Variables for Linear dynamics 
const mass = 1;// mass of drone 
const Ixx = 3; // moment of inertia 
const g = 1; //gravitational acceleration
let delta_t = 0.03;
let theta_angle = 0;
let ux = 0;
let uy = 0;
let accy = 0; // g - uy / mass;  // y- direction
let accx = 0; // ux / mass * theta_angle; //Math.sin(phi_ang)  //x direction
let ang_vel = 0; // uy / Ixx;    //phi_ddot
let ang_vel_last = 0;


// variables for implementing automation
let first_time = 0;
let automation_input = false;
let heuristic_input = false;
let automation_val = 0.1;
let dec_iter = true;
let ux_a = 0;
let uy_a = 0;

// let iter_array = ["zero", "one", "two"]
let iter_array = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];


// let automation_val = 0.2; // value used for first 2 pilot tests

function startGame() { // This funtion calls on the method start() of the myGameArea onject
    myGameDrone = new component(50, 25, "static/images/drone.png", t, u, "image");
    // landingZone = new component(150, 25, "black", 575, 575);
    // landingZone = new component(150, 500, "black", 575, 575); // original landing zone
    landingZone = new component(200, 500, "black", 675, 569); // at 569, it is successfully land 1/3 of the time, crashing 2/3
    // textblock = new component(250, 400, "white", 15, 25); 
    // background = new circleComp(1100, 470, 100, 0, 2 * Math.PI);
    // virtJoystick = new circleComp(x_center, y_center, 35, 0, 2 * Math.PI, "red");
    
    // old location of scale
    // thrustScale = new component(5, tsh, "red", 100, 467.5);
    // angleScale = new component(asw, 5, "blue", 100, 467.5);
    
    //old colors
    // thrustScale = new component(5, tsh, "red", 100, 467.5);
    // angleScale = new component(asw, 5, "blue", 100, 467.5);
    thrustScale = new component(5, tsh, "#25ff00", 100, 467.5);
    angleScale = new component(asw, 5, "#ff66fc", 100, 467.5);
    aa_zero = new component(5, 5, "black", 100, 467.5);
    myGameArea.start();
    
    //  || trial_number == 2 || trial_number == 16 || trial_number == 17 || trial_number == 18 || trial_number == 19 || trial_number == 20){
    //     automation_input = false;
    // }else{
    //     automation_input = true;
    // }
    if (dec_iter == true){
        dec_iter = false;
        // console.log("dec trial")
    }
    else{
        dec_iter = true;
        // console.log("not dec trial")
    }
    // console.log("JS")
    // console.log(automation_input)
    // console.log("Decision trial")
    // console.log(dec_iter)
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        log = [];

        this.canvas.width = 1250;         //window.innerWidth -25 ;//600;
        this.canvas.height = 600;         //window.innerHeight -25;//700;
        // this.canvas.style.transform = 'scale(0.5,0.5)'; //removes joystick functionality, not good for this application
        
        // this.canvas.style.display = "block";
        // this.canvas.style.cursor = "none"; //this hides the original cursor
        this.context = this.canvas.getContext("2d");
        this.auto = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20); // updates 50 times a second
        this.interval1 = setInterval(updateGameAreaLess, 30); //updates 33 times a second

        myTime();
        mySystemDate();
        dronePosition();
        droneAngle();
        this.context.font = "15px Arial";
        // this.context.fillStyle = "#ff0000";
        this.context.fillStyle = "#660019";
        this.context.fillText("Input Device: Arrow Keys", 20, 40);
        this.context.fillText("Date : " + mySystemDate(), 20, 60);
        this.context.fillText("Time : " + myTime(), 20, 80);
        this.context.fillText("Position (x,y) :" + "(" + dronePosition() + ")", 20, 100);
        this.context.fillText("Speed (x,y) :" + "(" + Number(XSpeed).toFixed(2) + "," + Number(YSpeed).toFixed(2) + ")", 20, 120);
        this.context.fillText("Attitude :" + "(" + droneAngle() + ")", 20, 140);
        

        landingZone.update();
        myGameDrone.update();

        // window.addEventListener('click', function (event) {
        //     document.onkeydown = startKey;
        // })

        // console.log(arrowY);
        // console.log(arrowX);
        document.onkeydown = checkKey;
        document.onkeyup   = keyup;
        
        // if (arrowX < 0){
        //     arrowX /= 2;
        // } 
        // else if (arrowX > 0){
        //     arrowX /= 2;
        // }
        
        // if (arrowY < 0){
        //     arrowY /= 2;
        // } 
        // else if (arrowY > 0){
        //     arrowY /= 2;
        // } 
        






        // window.addEventListener('mousedown', function (e) {
        //     if (Math.sqrt(Math.pow((e.clientX - virtJoystick.x), 2) + Math.pow((e.clientY - virtJoystick.y), 2)) <= 35) { //click myst be on joystick
        //         myGameArea.x = true;
        //         myGameArea.y = true;
        //         myGameArea.x = e.clientX;
        //         myGameArea.y = e.clientY;
        //     } else {
        //         myGameArea.x = false;
        //         myGameArea.y = false;
        //     }
        // })

        // window.addEventListener('mousemove', function (e) {
        //     if (Math.sqrt(Math.pow((e.clientX - virtJoystick.x), 2) + Math.pow((e.clientY - virtJoystick.y), 2)) <= 100) { // will not register input if the mouse is beyond big joystick bounds
        //         if (myGameArea.x && myGameArea.y) {
        //             myGameArea.x = e.clientX;
        //             myGameArea.y = e.clientY;
        //         }
        //     }

        // })

        // window.addEventListener('mouseup', function (e) {
        //     myGameArea.x = false;
        //     myGameArea.y = false;
        // })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#660019";
        this.context.fillText("Input Device: Arrow Keys", 20, 40);
        this.context.fillText("Date : " + mySystemDate(), 20, 60);
        // this.context.fillText("Time : " + myTime(), 20, 80);
        this.context.fillText("Time : " + time_count / 100 , 20, 80);
        this.context.fillText("Position (x,y) :" + "(" + dronePosition() + ")", 20, 100);
        this.context.fillText("Speed (x,y) :" + "(" + Number(XSpeed).toFixed(2) + "," + Number(YSpeed).toFixed(2) + ")", 20, 120);
        this.context.fillText("Attitude :" + "(" + droneAngle() + ")", 20, 140);
        // if (arrowY != 0 || arrowX != 0){
        //     start_check == true;
        // }


        landingZone.update();
        myGameDrone.update();
    },
    stop: function () {
        clearInterval(this.interval);
        clearInterval(this.interval1);
        game_done = true;
        save_final();
    }
}
// Now that I have supposedly made the background, let's try to add a "compnent" by making a component function (will eventuallly be a drone) to it.

function component(width, height, color, x, y, type) { //We can change the parameters to add a drone image later on
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    //    this.gravity = 0.005;
    //   this.gravitySpeed = 0;
    this.angle = theta_angle;


    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(theta_angle);
            ctx.drawImage(this.image, this.width / -200, this.height / -200, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function () {
        if (XSpeed >= 20) {
            XSpeed = 20;
            theta_angle = 0.5;
        } else if (XSpeed <= -20) {
            XSpeed = -20;
            theta_angle = -0.5;
        }
        if (YSpeed >= 50) {
            YSpeed = 50;
        } else if (YSpeed <= -30) {
            YSpeed = -30;
        }

        this.x += (2 * (XSpeed * delta_t) + (accx * delta_t * delta_t))
        this.y += ((YSpeed * delta_t) + (0.5 * accy * delta_t * delta_t));
        this.hitBottom();
    }
    
    this.timesup = function() {
        if (time_count/100 > 120) {
            ctx = myGameArea.context;
            ctx.fillStyle = "#660019";
            ctx.fillText("You ran out of time!!!", 20, 550);
            myGameArea.stop();
        }
    }



    this.hitBottom = function () { //this stops falling when it hits bottom
        var rockbottom = myGameArea.canvas.height - 25// - this.height;
        var upperBound = 0;
        var leftBound = 0;
        var rightBound = myGameArea.canvas.width - 40;

        if (this.y > rockbottom) {
            this.y = rockbottom;
            ctx = myGameArea.context;
            ctx.fillStyle = "#660019";
            ctx.fillText("You have crashed the drone!!!", 20, 550);
            myGameArea.stop();
        } else if (this.y < upperBound) {
            this.y == upperBound;
            ctx = myGameArea.context;
            ctx.fillStyle = "#660019";
            ctx.fillText("You have crashed the drone!!!", 20, 550);
            myGameArea.stop();
        }
        else if (this.x < leftBound) {
            this.x == leftBound;
            ctx = myGameArea.context;
            ctx.fillStyle = "#660019";
            ctx.fillText("You have crashed the drone!!!", 20, 550);
            myGameArea.stop();
        }
        else if (this.x > rightBound) {
            this.x == rightBound;
            ctx = myGameArea.context;
            ctx.fillStyle = "#660019";
            ctx.fillText("You have crashed the drone!!!", 20, 550);
            myGameArea.stop();
        }
    }
    // this function below stops the game if the drone runs into the landingZone
    this.stopGame = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var stopGame = true;
        // this.ctx.fillText("You have crashed the drone!!!", 100, 400);

        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||     //This is where we modify the landing conditions //work on landing conditions later
            (myright < otherleft) ||
            (myleft > otherright)) {
            stopGame = false;
        }
        return stopGame;
    }

    this.crashWith = function (othercomp) {
        ctx = myGameArea.context
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = othercomp.x;
        var otherright = othercomp.x + (othercomp.width);
        var othertop = othercomp.y;
        var otherbottom = othercomp.y + (othercomp.height);
        // var crash = true
        if (mybottom >= othertop) { //condition the drone touches the landing pad
            if ((myright < otherright) && (myleft > otherleft)) { // ensure its within 
                if ((Math.abs(XSpeed) < 2) && (Math.abs(YSpeed) < 15) && Math.abs(droneAngle()) <= 5) {
                    // console.log("You have successfully landed the drone!!!");
                    var crash = false
                    ctx.fillStyle = "#660019";
                    ctx.fillText("You have successfully landed the drone!!!", 20, 550);
                    // console.log(crash, "first");
                } else {
                    crash = true
                }
            } else {
                crash = true
            };
        } else {
            crash = true
        };
        if (crash == true  && myGameDrone.x > 650 && myGameDrone.x < 850 && myGameDrone.y > landingZone.height && myGameDrone.y < landingZone.y) {
            ctx.fillStyle = "#660019";
            ctx.fillText("You have unsafely landed the drone!!!", 20, 550);
            success_land = 2;
        }
        else if (time_count/100 > 120){
            ctx.fillStyle = "#660019";
            ctx.fillText("You ran out of time!!!", 20, 550);
            success_land = 3;
        }
        else if (crash == true) {
            ctx.fillStyle = "#660019";
            ctx.fillText("You have crashed the drone!!!", 20, 550);
            success_land = 0;
        } else {
            success_land = 1;
        }
        // save_final();
        return crash;
        
    }
}



function circleComp(x, y, radius, start_angle, end_angle, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.start_angle = start_angle;
    this.end_angle = end_angle;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function () {
        ctx = myGameArea.context;
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.radius, this.start_angle, this.end_angle)
        if (color == "#25ff00") {
            ctx.fill();
        }
        //ctx.strokeStyle ='black';
        ctx.stroke();

    }

    this.newPos = function () {
        // 1100, 470, 100
      //(((this.x + this.radius) < 1200) && ((this.x - this.radius) > 1000) && ((this.y + this.radius) < 570) && ((this.y - this.radius) > 370)) {
        if (myGameArea.x && myGameArea.y) {
            //<= 1210) && ((this.x - this.radius) >= 990) && ((this.y + this.radius) <= 580) && ((this.y - this.radius) >= 350))
            if (Math.sqrt(Math.pow((this.x - 1100), 2) + Math.pow((this.y - 470), 2)) <= 120)  { // equation fr the bounds of the big circle
                this.x = myGameArea.x;
                this.y = myGameArea.y;
            } else {
                if ((this.x + this.radius) > 1210) { this.x = 1210 - this.radius }
                if ((this.x - this.radius) < 990) { (this.x) = 990 + this.radius }
                if ((this.y + this.radius) > 580) { (this.y) = 580 - this.radius }
                if ((this.y - this.radius) < 350) { (this.y) = 350 + this.radius }

               // this.x += 0;
               // this.y += 0;
            }
        } else {
            if ((this.x != 1100) || (this.y != 470)) {
                if (this.x > 1100) {
                    this.x -= 5;
                }

                if (this.y > 470) {
                    this.y -= 5;
                }

                if (this.y < 470) {
                    this.y += 5
                }

                if (this.x < 1100) {
                this.x += 5;
                }
            }
        }
    }
}

// time to update the loop. In the future this function will be modified to also update the scors and whatnot

function updateGameArea() {
    // console.log(start_check);
    if (start_check == true){
    
    
    myGameArea.clear();
    //   myGameDrone.windNow(landingZone);
    myGameDrone.speedX = 0;
    myGameDrone.speedY = 0;
    landingZone.speedX = 0;
    landingZone.speedY = 0;
    // textblock.speedX = 0;
    // textblock.speedY = 0;
    // background.speedX = 0;
    // background.speedY = 0;
    // virtJoystick.speedX = 0;
    // virtJoystick.speedY = 0;
    thrustScale.speedX = 0;
    thrustScale.speedY = 0;
    angleScale.speedX = 0;
    angleScale.speedY = 0;
    //  myGameDrone.angle = (4.5*XSpeed)*(Math.PI/180) // this will convert to radians
    myTime();
    time_count += 1;
    mySystemDate();
    dronePosition();
    myGameDrone.hitBottom();
    myGameDrone.timesup();
    newpositionx = arrowX;
    newpositiony = arrowY;


  /*  if (myGameArea.x && myGameArea.y) {
        x_center = myGameArea.x;
        y_center = myGameArea.y;
    } */

    if (myGameDrone.stopGame(landingZone)) {
        myGameArea.stop();
        myGameDrone.crashWith(landingZone);
        myGameDrone.update();
        landingZone.update();
        // textblock.update();
        aa_zero.update();
        // virtJoystick.update();
        // background.update();
        thrustScale.update();
        angleScale.update();
        dronePosition();
    } else {
        [ newpositionx, newpositiony ] = checkSpeed(newpositionx,newpositiony);
        delta_joystickx = newpositionx;
        delta_joysticky = newpositiony;
    

        ux_h = (delta_joystickx) / 3.5;
        if (delta_joysticky >= 0) {
            uy_h = (delta_joysticky) / 7.58;
        } else if (delta_joysticky < 0) {
            uy_h = delta_joysticky / 5;
        }
        // console.log("ux_h=");
        // console.log(ux_h);
        // console.log("uy_h=");
        // console.log(uy_h);
        // ux = ux_h;
        // uy = uy_h;

        // 
        // if (trial_number == 1 || trial_number == 2 || trial_number == 16 || trial_number == 17 || trial_number == 18 || trial_number == 19 || trial_number == 20){
        //     automation_input = false;
        // }else{
        //     automation_input = true;
        // }
        // console.log("JS")
        // console.log(automation_input)
        if (first_time == 0){
            ux = ux_h;
            uy = uy_h;
            first_time = 1;
        }
        else{
            ux_a = (0.2019)*(625-myGameDronex)+(0.1571)*(550-myGameDroney)+(3.3575)*droneAngle()+(1.2210)*XSpeed+(2.1436)*YSpeed+(2.0364)*ang_vel;
            uy_a = (0.4114)*(625-myGameDronex)+(-0.0020)*(550-myGameDroney)+(7.3120)*droneAngle()+(2.4292)*XSpeed+(0.0091)*YSpeed+(10.4493)*ang_vel;
            automation_val = 0.1;          
            if (!automation_input){
                ux_a = 0;
                uy_a = 0;
                automation_val = 0;
                // console.log("hello world");
            }
            if (uy_a > 10){
                uy_a = 10; //-10 is for when automation is 100%
            } else if (uy_a < -10){
                uy_a = -10;
            }
            ux = (1-automation_val)*ux_h + automation_val*ux_a;
            uy = (1-automation_val)*uy_h + automation_val*uy_a;
        }
        // console.log("variable");
        // console.log(automation_input);
        // console.log("uy=");
        // console.log(uy);
        // if (automation_input == false || first_time == 0){
        //     ux = ux_h;
        //     uy = uy_h;
        //     first_time = 1;
        // }
        // else{
        //     ux_a = (-0.0952)*ang_vel+(-0.0006)*accy+(-0.0408)*accx;
        //     uy_a = (-0)*ang_vel+(-0.1544)*accy+(-0.0003)*accx;
        //     // uy_a = (19.4465)*myGameDronex+(0)*myGameDroney+(0.0304)*XSpeed+(0.4497)*YSpeed+(-0.3356)*droneAngle()+(-0.0837)*angleSpeed;
        //     ux = (1-automation_val)*ux_h + automation_val*ux_a;
        //     uy = (1-automation_val)*uy_h + automation_val*uy_a;
        // }

        ang_vel = ux / Ixx;
        ang_acc = (ang_vel-ang_vel_last)/delta_t;
        ang_vel_last = ang_vel;
        theta_angle += ang_vel * delta_t * (Math.PI / 180);
        accy = g + (uy / mass);  // y- direction
        accx = (ux / mass) * Math.abs(theta_angle);
        XSpeed += (accx * delta_t);//Number(myGameDrone.x - sx).toFixed(2);
        YSpeed += (accy * delta_t);
        if (XSpeed >= 20) {
            XSpeed = 20;
            theta_angle = 0.5;
        } else if (XSpeed <= -20) {
            XSpeed = -20;
            theta_angle = -0.5;
        }
        if (YSpeed >= 50) {
            YSpeed = 50;
        } else if (YSpeed <= -30) {
            YSpeed = -30;
        }

        // try to comment out ux*ux for everything so x inputs do not affect y bar
        // if ((ux < 28.5) && (ux > -28.5)) {
        //     if ((uy < 13.2) && (uy >= 0)) { //going down
        //         tsh = -3.18 * (Math.sqrt((ux * ux) + (uy * uy)));
        //     } else if (uy >= 13.2) {
        //         var uyy = 13.2;
        //         tsh = -3.18 * (Math.sqrt((ux * ux) + (uyy * uyy)));
        //     } else if ((uy > -20) && (uy <= 0)) { //going up
        //         tsh = -3.18 * (Math.sqrt((ux * ux) + (uy * uy)));
        //     } else if (uy <= -20) {
        //         var uyy = -20;
        //         tsh = -3.18 * (Math.sqrt((ux * ux) + (uyy * uyy)));
        //     }
        // } 
        // else if (Math.abs(ux) >= 28.5) {
        //     var uxx = 28.5
        //     if ((uy < 13.2) && (uy >= 0)) { //going down
        //         tsh = -3.18 * (Math.sqrt((uxx * uxx) + (uy * uy)));
        //     } else if (uy >= 13.2) {
        //         var uyy = 13.2;
        //         tsh = -3.18 * (Math.sqrt((uxx * uxx) + (uyy * uyy)));
        //     } else if ((uy > -20) && (uy <= 0)) { //going up
        //         tsh = -3.18 * (Math.sqrt((uxx * uxx) + (uy * uy)));
        //     } else if (uy <= -20) {
        //         var uyy = -20;
        //         tsh = -3.18 * (Math.sqrt((uxx * uxx) + (uyy * uyy)));
        //     }
        // }
        if ((ux < 28.5) && (ux > -28.5)) {
            if ((uy < 13.2) && (uy >= 0)) { //going down
                tsh = -3.18 * (Math.sqrt((uy * uy)));
            } else if (uy >= 13.2) {
                var uyy = 13.2;
                tsh = -3.18 * (Math.sqrt((uyy * uyy)));
            } else if ((uy > -20) && (uy <= 0)) { //going up
                tsh = -3.18 * (Math.sqrt((uy * uy)));
            } else if (uy <= -20) {
                var uyy = -20;
                tsh = -3.18 * (Math.sqrt((uyy * uyy)));
            }
        } 
        else if (Math.abs(ux) >= 28.5) {
            var uxx = 28.5
            if ((uy < 13.2) && (uy >= 0)) { //going down
                tsh = -3.18 * (Math.sqrt((uy * uy)));
            } else if (uy >= 13.2) {
                var uyy = 13.2;
                tsh = -3.18 * (Math.sqrt((uyy * uyy)));
            } else if ((uy > -20) && (uy <= 0)) { //going up
                tsh = -3.18 * (Math.sqrt((uy * uy)));
            } else if (uy <= -20) {
                var uyy = -20;
                tsh = -3.18 * (Math.sqrt((uyy * uyy)));
            }
        }

        if (uy > 0) {
            thrustScale.height = -tsh;
        } else {
            thrustScale.height = tsh;
        }

        // this is for scaling asw
        if (Math.abs(theta_angle) <= 0.05) {
            asw = 5;
        } else {
            asw = Math.abs(theta_angle) * 100;
            if (theta_angle < 0){
                asw = -asw;
            }
            angleScale.width = asw;
        }



        myGameDrone.angle = (theta_angle);
        YSpeed += (accy * delta_t);
        myGameDrone.newPos();
        // virtJoystick.newPos();
        myGameDrone.update();
        landingZone.update();
        // textblock.update();
        thrustScale.update();
        angleScale.update();
        aa_zero.update();
        // virtJoystick.update();
        // background.update();
        //  myGameDrone.windNow(landingZone);
        myTime();
        mySystemDate();
        dronePosition();      

        // logging for creating assistance
        log_newpositionx = newpositionx; // user input x
        log_newpositiony = newpositiony; // user input y

        log_ang_vel = ang_vel;
        log_accy = accy;
        log_accx = accx;

        log_myGameDronex = myGameDronex; // drone x-position
        log_myGameDroney = myGameDroney; // drone y-position
        log_XSpeed = XSpeed; // drone x-velocity
        log_YSpeed = YSpeed; // drone y-velocity
        log_droneAngle = droneAngle();
        log_angleSpeed = ang_vel;
        log_ang_acc = ang_acc;
        log_ux_a = ux_a;
        log_uy_a = uy_a;
        // log += [log_newpositionx, log_newpositiony, log_myGameDronex, log_myGameDroney, log_XSpeed, log_YSpeed, log_droneAngle, log_angleSpeed, ","];
        // log += [log_newpositionx, log_newpositiony, log_ang_vel, log_accy, log_accx, ","];
        log += [log_newpositionx, log_newpositiony, log_myGameDronex, log_myGameDroney, log_droneAngle, log_XSpeed, log_YSpeed, log_ang_vel, log_accx, log_accy, log_ang_acc, log_ux_a, log_uy_a, ","];

    }
        // save_assistance(workeridval, trial_number);
    }
}

// this function will update the game area at a less frequency, that way we can calculate the speed of the drone
// This will be used to update about 33 times a second
function updateGameAreaLess() {

    myGameArea.clear();
    //  myGameDrone.window(landingZone);
    myGameDrone.speedX = 0;
    myGameDrone.speedY = 0;
    landingZone.speedX = 0;
    landingZone.speedY = 0;
    // textblock.speedX = 0;
    // textblock.speedY = 0;
    // background.speedX = 0;
    // background.speedY = 0;
    // virtJoystick.speedX = 0;
    // virtJoystick.speedY = 0;
    //  angleScale.speedX = 0;
    // angleScale.speedY = 0;
    //  XSpeed = XSpeed + (accx * delta_t)//Number(myGameDrone.x - sx).toFixed(2);
    //  YSpeed = YSpeed + (accy * delta_t);
    //   myGameDrone.angle = (attitude + (ang_vel * delta_t)) * (Math.PI / 180); // this will convert to radians
    myTime();
    mySystemDate();
    dronePosition();
    myGameDrone.hitBottom();
    myGameDrone.timesup();
    newpositionx = arrowX;
    newpositiony = arrowY;



  /*  if (myGameArea.x && myGameArea.y) {
        x_center = myGameArea.x;
        y_center = myGameArea.y;
    } */

    if (myGameDrone.stopGame(landingZone)) {
        // myGameDrone.angle = (attitude + (ang_vel * delta_t)) * (Math.PI / 180); // this will convert to radians
        myGameArea.stop();
        myGameDrone.crashWith(landingZone);
        myGameDrone.update();
        landingZone.update();
        // textblock.update();
        aa_zero.update();
        thrustScale.update();
        angleScale.update();
        dronePosition();
        // virtJoystick.update();
        // background.update();
    } else if (start_check == true) {
        [ newpositionx, newpositiony ] = checkSpeed(newpositionx,newpositiony);
        delta_joystickx = newpositionx;
        delta_joysticky = newpositiony;
        ux = (delta_joystickx)/3.5;
        uy = (delta_joysticky)/3.5;
        ang_vel = ux / Ixx;
        theta_angle += (ang_vel * delta_t * (Math.PI / 180));
        accy = g + (uy / mass);
        accx = (ux / mass) * Math.abs(theta_angle);
        XSpeed += (accx * delta_t);
        YSpeed += (accy * delta_t);
        if (XSpeed >= 20) {
            XSpeed = 20;
            theta_angle = 0.5;
        } else if (XSpeed <= -20) {
            XSpeed = -20;
            theta_angle = -0.5;
        }
        if (YSpeed >= 50) {
            YSpeed = 50;
        } else if (YSpeed <= -30) {
            YSpeed = -30;
        }

        myGameDrone.angle = (theta_angle); // this will convert to radians
        YSpeed += (accy * delta_t);
        myGameDrone.newPos();
        // virtJoystick.newPos();
        myGameDrone.update();
        landingZone.update();
        // textblock.update();
        aa_zero.update();
        thrustScale.update();
        angleScale.update();
        // virtJoystick.update();
        // background.update();
        // myGameDrone.windNow(landingZone);
        myTime();
        mySystemDate();
        dronePosition();
    }
    
}

// Now I will attempt to make the component move by dragging my mouse, I simply added the nesseceray items to the codes above. We can also do this for keys on the keyboard, but for now I will stick with mouse.


//Get system date
function mySystemDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    todayDate = mm + "/" + dd + "/" + yyyy;
    return todayDate;
}

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
function dronePosition() {
    //myGameDrone.y += this.speedY;
    myGameDronex = myGameDrone.x;
    myGameDroney = myGameDrone.y;
    return [Number(myGameDronex).toFixed(2), Number(myGameDroney).toFixed(2)];
}
function droneAngle() {
    myGameDroneAngle = -1* theta_angle * (180/ Math.PI);
    return Number(myGameDroneAngle).toFixed(2);
}

// Get system time 
function myTime() {
    var currentTime = new Date();
    var h_current = addZero(currentTime.getHours(), 2);
    var m_current = addZero(currentTime.getMinutes(), 2);
    var s_current = addZero(currentTime.getSeconds(), 2);
    var ms_current = addZero(currentTime.getMilliseconds(), 3);

    systemTime = ((h_current - h) * 3600) + ((m_current - m) * 60) + (s_current - s) + ((ms_current - ms) * 0.001);
    return systemTime;
}

function killGame() {
    game_done = false;
    myGameArea.canvas.style.display = "none"; //hide
    // document.getElementById("Trial Number").innerHTML = trial_number;
    // document.getElementById("Total Time").innerHTML = time_count / 100; //changed from myTime() to show iteration time to complete rather than total time
    // document.getElementById("Landing Velocity").innerHTML = ([XSpeed.toFixed(2), YSpeed.toFixed(2)]);
    // document.getElementById("Landing Attitude").innerHTML = droneAngle();
    // document.getElementById("Successful landing").innerHTML = success_land;
    return;
}

function restartGame(id, trial_number) {
    sendTrialStart(id, trial_number);

    myGameArea.canvas.style.display = "block";
   // this.myGameArea.clear();
    myGamePiece = null;
    myObstacle = [];

    arrowX = 0;
    arrowY = 0;
    time_count = 0;
    XSpeed = 0;
    YSpeed = 0;
    XSpeed_alt = 0;
    theta_angle = 0;
    start_check = false;

    game_num = 0;
    myGameArea.clear;
    this.startGame();
    return;
}

function sendUserId(id) {
    fetch('/process_user_id', {
        method: 'POST',
        body: JSON.stringify({ user_id: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function sendTrialStart(id, trial_number) {
    fetch('/process_trial_start', {
        method: 'POST',
        body: JSON.stringify({ user_id: id, trial: trial_number }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function sendSurveyResponses(id, trial_number, trustVal, confVal, autoAgreeVal) {
    fetch('/process_survey_responses', {
        method: 'POST',
        body: JSON.stringify({ user_id: id, trial: trial_number, trust: trustVal, conf: confVal, autoAgree: autoAgreeVal }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function save_result(id, trial_number, assistanceLevelVal, trustVal, confVal, autoAgreeVal) {
    console.log("hello world")
    $.ajax({
        type: "POST",
        url: "server.php",
        // data: { workerid: id, trial: trial_number, trialTime: rec_time, landVelocityX: XSpeed, landVelocityY: YSpeed, landAttitude: droneAngle(), landPositionX: myGameDrone.x, landPositionY: myGameDrone.y, successLand: success_land, reliance: assistanceLevelVal, trust: trustVal, conf: confVal, autoAgree: autoAgreeVal, score: tot_score, auto_on_off: automation_input}
        data: { workerid: id, trial: trial_number, trialTime: rec_time, landVelocityX: XSpeed, landVelocityY: YSpeed, landAttitude: droneAngle(), landPositionX: myGameDrone.x, landPositionY: myGameDrone.y, successLand: success_land, reliance: assistanceLevelVal, trust: trustVal, conf: confVal, autoAgree: autoAgreeVal, score: tot_score, auto_on_off: automation_input, heuristic_on_off: heuristic_input}
    })
}

function create_assistance(id, trial_number) {
    $.ajax({
        type: "POST",
        url: "create_assistance.php",
        data: { workerid: id, trial: trial_number }
    })
}

function save_assistance(id, trial_number) {
    $.ajax({
        type: "POST",
        url: "assistance.php",
        data: { workerid: id, trial: trial_number, log:log}
    })
}

// function save_assistance(id, trial_number) {
//     $.ajax({
//         type: "POST",
//         url: "assistance.php",
//         data: { workerid: id, trial: trial_number, log_newpositionx: log_newpositionx, log_newpositiony: log_newpositiony, log_myGameDronex: log_myGameDronex, log_myGameDroney: log_myGameDroney, log_XSpeed: log_XSpeed, log_YSpeed: log_YSpeed, log_droneAngle: log_droneAngle, log_angleSpeed: log_angleSpeed}          
//     })
// }

//save final values
function save_final() {
    myGameDrone.crashWith(landingZone);

    rec_trial = trial_number;
    rec_time = parseFloat((time_count / 100)).toPrecision(3);
    // rec_vel = parseFloat([XSpeed.toFixed(2), YSpeed.toFixed(2)]);
    rec_vel = Math.sqrt(XSpeed**2+YSpeed**2).toPrecision(3);
    rec_att = parseFloat(droneAngle());
    
    if (success_land == 1){
        rec_sof = "Safe"
    }
    else if (success_land == 2) {
        rec_sof = "Unsafe"
    }
    else if (success_land == 3) {
        rec_sof = "Time"
    }
    else {
        rec_sof = "Crash"
    }

    // SCORE CALCULATIONS HERE
    // rmse = compute_rmse("")
    t_score = compute_score_t(time_count/100, success_land)
    p_score = compute_score_p(myGameDronex,myGameDroney,success_land)
    v_score = compute_score_v(XSpeed, YSpeed)
    a_score = compute_score_a(droneAngle())
    tot_score = compute_score_total(t_score,p_score,v_score,a_score)
    // console.log("score")
    // console.log(tot_score)


    // rec_sof += success_land;
    current_game = trial_number;
    
    
    // console.log(trial_number);
    // console.log("success_land");
    // console.log(success_land);
    // console.log("pre");
    // console.log(rec_sof);
    // console.log(prev1_rec_sof);
    // console.log(prev2_rec_sof);
    // console.log(prev3_rec_sof);  

    document.getElementById("Trial Number").innerHTML = rec_trial;
    document.getElementById("Total Time").innerHTML = rec_time;
    document.getElementById("Landing Velocity").innerHTML = rec_vel;
    document.getElementById("Landing Attitude").innerHTML = rec_att;
    document.getElementById("Successful landing").innerHTML = rec_sof;
    document.getElementById("Score").innerHTML = tot_score;
    // document.getElementById("game_number").innerHTML = current_game;

    document.getElementById("Trial Number1").innerHTML = prev1_rec_trial;
    document.getElementById("Total Time1").innerHTML = prev1_rec_time; 
    document.getElementById("Landing Velocity1").innerHTML = prev1_rec_vel;
    document.getElementById("Landing Attitude1").innerHTML = prev1_rec_att;
    document.getElementById("Successful landing1").innerHTML = prev1_rec_sof;
    document.getElementById("Score1").innerHTML = prev1_tot_score;
    // document.getElementById("prev1_game_number").innerHTML = prev1_game;

    document.getElementById("Trial Number2").innerHTML = prev2_rec_trial;
    document.getElementById("Total Time2").innerHTML =  prev2_rec_time;
    document.getElementById("Landing Velocity2").innerHTML = prev2_rec_vel;
    document.getElementById("Landing Attitude2").innerHTML = prev2_rec_att;
    document.getElementById("Successful landing2").innerHTML = prev2_rec_sof;
    document.getElementById("Score2").innerHTML = prev2_tot_score;
    // document.getElementById("prev2_game_number").innerHTML = prev2_game;

    document.getElementById("Trial Number3").innerHTML = prev3_rec_trial;
    document.getElementById("Total Time3").innerHTML = prev3_rec_time;
    document.getElementById("Landing Velocity3").innerHTML = prev3_rec_vel;
    document.getElementById("Landing Attitude3").innerHTML = prev3_rec_att;
    document.getElementById("Successful landing3").innerHTML = prev3_rec_sof;
    document.getElementById("Score3").innerHTML = prev3_tot_score;
    // document.getElementById("prev3_game_number").innerHTML = prev3_game;

    document.getElementById("Trial Number4").innerHTML = prev4_rec_trial;
    document.getElementById("Total Time4").innerHTML = prev4_rec_time; 
    document.getElementById("Landing Velocity4").innerHTML = prev4_rec_vel;
    document.getElementById("Landing Attitude4").innerHTML = prev4_rec_att;
    document.getElementById("Successful landing4").innerHTML = prev4_rec_sof;
    document.getElementById("Score4").innerHTML = prev4_tot_score;
    // document.getElementById("prev4_game_number").innerHTML = prev4_game;

    document.getElementById("Trial Number5").innerHTML = prev5_rec_trial;
    document.getElementById("Total Time5").innerHTML = prev5_rec_time; 
    document.getElementById("Landing Velocity5").innerHTML = prev5_rec_vel;
    document.getElementById("Landing Attitude5").innerHTML = prev5_rec_att;
    document.getElementById("Successful landing5").innerHTML = prev5_rec_sof;
    document.getElementById("Score5").innerHTML = prev5_tot_score;
    // document.getElementById("prev5_game_number").innerHTML = prev5_game;

    document.getElementById("Trial Number6").innerHTML = prev6_rec_trial;
    document.getElementById("Total Time6").innerHTML = prev6_rec_time; 
    document.getElementById("Landing Velocity6").innerHTML = prev6_rec_vel;
    document.getElementById("Landing Attitude6").innerHTML = prev6_rec_att;
    document.getElementById("Successful landing6").innerHTML = prev6_rec_sof;
    document.getElementById("Score6").innerHTML = prev6_tot_score;
    // document.getElementById("prev6_game_number").innerHTML = prev6_game;

    document.getElementById("Trial Number7").innerHTML = prev7_rec_trial;
    document.getElementById("Total Time7").innerHTML = prev7_rec_time; 
    document.getElementById("Landing Velocity7").innerHTML = prev7_rec_vel;
    document.getElementById("Landing Attitude7").innerHTML = prev7_rec_att;
    document.getElementById("Successful landing7").innerHTML = prev7_rec_sof;
    document.getElementById("Score7").innerHTML = prev7_tot_score;
    // document.getElementById("prev7_game_number").innerHTML = prev7_game;

    document.getElementById("Trial Number8").innerHTML = prev8_rec_trial;
    document.getElementById("Total Time8").innerHTML = prev8_rec_time; 
    document.getElementById("Landing Velocity8").innerHTML = prev8_rec_vel;
    document.getElementById("Landing Attitude8").innerHTML = prev8_rec_att;
    document.getElementById("Successful landing8").innerHTML = prev8_rec_sof;
    document.getElementById("Score8").innerHTML = prev8_tot_score;
    // document.getElementById("prev8_game_number").innerHTML = prev8_game;

    document.getElementById("Trial Number9").innerHTML = prev9_rec_trial;
    document.getElementById("Total Time9").innerHTML = prev9_rec_time; 
    document.getElementById("Landing Velocity9").innerHTML = prev9_rec_vel;
    document.getElementById("Landing Attitude9").innerHTML = prev9_rec_att;
    document.getElementById("Successful landing9").innerHTML = prev9_rec_sof;
    document.getElementById("Score9").innerHTML = prev9_tot_score;
    // document.getElementById("prev9_game_number").innerHTML = prev9_game;

    document.getElementById("Trial Number10").innerHTML = prev10_rec_trial;
    document.getElementById("Total Time10").innerHTML = prev10_rec_time; 
    document.getElementById("Landing Velocity10").innerHTML = prev10_rec_vel;
    document.getElementById("Landing Attitude10").innerHTML = prev10_rec_att;
    document.getElementById("Successful landing10").innerHTML = prev10_rec_sof;
    document.getElementById("Score10").innerHTML = prev10_tot_score;
    // document.getElementById("prev10_game_number").innerHTML = prev10_game;

    document.getElementById("Trial Number11").innerHTML = prev11_rec_trial;
    document.getElementById("Total Time11").innerHTML = prev11_rec_time; 
    document.getElementById("Landing Velocity11").innerHTML = prev11_rec_vel;
    document.getElementById("Landing Attitude11").innerHTML = prev11_rec_att;
    document.getElementById("Successful landing11").innerHTML = prev11_rec_sof;
    document.getElementById("Score11").innerHTML = prev11_tot_score;
    // document.getElementById("prev11_game_number").innerHTML = prev11_game;

    document.getElementById("Trial Number12").innerHTML = prev12_rec_trial;
    document.getElementById("Total Time12").innerHTML = prev12_rec_time; 
    document.getElementById("Landing Velocity12").innerHTML = prev12_rec_vel;
    document.getElementById("Landing Attitude12").innerHTML = prev12_rec_att;
    document.getElementById("Successful landing12").innerHTML = prev12_rec_sof;
    document.getElementById("Score12").innerHTML = prev12_tot_score;
    // document.getElementById("prev12_game_number").innerHTML = prev12_game;

    document.getElementById("Trial Number13").innerHTML = prev13_rec_trial;
    document.getElementById("Total Time13").innerHTML = prev13_rec_time; 
    document.getElementById("Landing Velocity13").innerHTML = prev13_rec_vel;
    document.getElementById("Landing Attitude13").innerHTML = prev13_rec_att;
    document.getElementById("Successful landing13").innerHTML = prev13_rec_sof;
    document.getElementById("Score13").innerHTML = prev13_tot_score;
    // document.getElementById("prev13_game_number").innerHTML = prev13_game;

    document.getElementById("Trial Number14").innerHTML = prev14_rec_trial;
    document.getElementById("Total Time14").innerHTML = prev14_rec_time; 
    document.getElementById("Landing Velocity14").innerHTML = prev14_rec_vel;
    document.getElementById("Landing Attitude14").innerHTML = prev14_rec_att;
    document.getElementById("Successful landing14").innerHTML = prev14_rec_sof;
    document.getElementById("Score14").innerHTML = prev14_tot_score;
    // document.getElementById("prev14_game_number").innerHTML = prev14_game;

    document.getElementById("Trial Number15").innerHTML = prev15_rec_trial;
    document.getElementById("Total Time15").innerHTML = prev15_rec_time; 
    document.getElementById("Landing Velocity15").innerHTML = prev15_rec_vel;
    document.getElementById("Landing Attitude15").innerHTML = prev15_rec_att;
    document.getElementById("Successful landing15").innerHTML = prev15_rec_sof;
    document.getElementById("Score15").innerHTML = prev15_tot_score;
    // document.getElementById("prev15_game_number").innerHTML = prev15_game;

    document.getElementById("Trial Number16").innerHTML = prev16_rec_trial;
    document.getElementById("Total Time16").innerHTML = prev16_rec_time; 
    document.getElementById("Landing Velocity16").innerHTML = prev16_rec_vel;
    document.getElementById("Landing Attitude16").innerHTML = prev16_rec_att;
    document.getElementById("Successful landing16").innerHTML = prev16_rec_sof;
    document.getElementById("Score16").innerHTML = prev16_tot_score;
    // document.getElementById("prev16_game_number").innerHTML = prev16_game;

    document.getElementById("Trial Number17").innerHTML = prev17_rec_trial;
    document.getElementById("Total Time17").innerHTML = prev17_rec_time; 
    document.getElementById("Landing Velocity17").innerHTML = prev17_rec_vel;
    document.getElementById("Landing Attitude17").innerHTML = prev17_rec_att;
    document.getElementById("Successful landing17").innerHTML = prev17_rec_sof;
    document.getElementById("Score17").innerHTML = prev17_tot_score;
    // document.getElementById("prev17_game_number").innerHTML = prev17_game;

    document.getElementById("Trial Number18").innerHTML = prev18_rec_trial;
    document.getElementById("Total Time18").innerHTML = prev18_rec_time; 
    document.getElementById("Landing Velocity18").innerHTML = prev18_rec_vel;
    document.getElementById("Landing Attitude18").innerHTML = prev18_rec_att;
    document.getElementById("Successful landing18").innerHTML = prev18_rec_sof;
    document.getElementById("Score18").innerHTML = prev18_tot_score;
    // document.getElementById("prev18_game_number").innerHTML = prev18_game;

    document.getElementById("Trial Number19").innerHTML = prev19_rec_trial;
    document.getElementById("Total Time19").innerHTML = prev19_rec_time; 
    document.getElementById("Landing Velocity19").innerHTML = prev19_rec_vel;
    document.getElementById("Landing Attitude19").innerHTML = prev19_rec_att;
    document.getElementById("Successful landing19").innerHTML = prev19_rec_sof;
    document.getElementById("Score19").innerHTML = prev19_tot_score;
    // document.getElementById("prev19_game_number").innerHTML = prev19_game;

    // document.getElementById("Trial Number20").innerHTML = prev20_rec_trial;
    // document.getElementById("Total Time20").innerHTML = prev20_rec_time; 
    // document.getElementById("Landing Velocity20").innerHTML = prev20_rec_vel;
    // document.getElementById("Landing Attitude20").innerHTML = prev20_rec_att;
    // document.getElementById("Successful landing20").innerHTML = prev20_rec_sof;
    // document.getElementById("prev20_game_number").innerHTML = prev20_game;

    if(trial_number ==1){
        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;
        prev1_tot_score = tot_score;

    } else if(trial_number ==2){
        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;
        prev1_tot_score = tot_score;


    } else if(trial_number ==3){
        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;


        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;    
        prev1_tot_score = tot_score;
    
    }

    else if(trial_number ==4){
        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;


        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;     
        prev1_tot_score = tot_score;
   
    }
    else if(trial_number ==5){
        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game; 
        prev1_tot_score = tot_score;
       
    }
    else if(trial_number ==6){
        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game; 
        prev1_tot_score = tot_score;
       
    }
    else if(trial_number ==7){
        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;
        
        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game; 
        prev1_tot_score = tot_score;       
    }
    else if(trial_number ==8){
        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;   
        prev1_tot_score = tot_score;     
    }
    else if(trial_number ==9){
        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;
        
        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;   
        prev1_tot_score = tot_score;
     
    }
    else if(trial_number ==10){
        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;
        
        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==11){
        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;
        
        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==12){
        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==13){
        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==14){
        prev14_rec_trial = prev13_rec_trial;
        prev14_rec_time = prev13_rec_time;
        prev14_rec_vel = prev13_rec_vel;
        prev14_rec_att = prev13_rec_att;
        prev14_rec_sof = prev13_rec_sof;
        prev14_game = prev13_game;
        prev14_tot_score = prev13_tot_score;

        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==15){
        prev15_rec_trial = prev14_rec_trial;
        prev15_rec_time = prev14_rec_time;
        prev15_rec_vel = prev14_rec_vel;
        prev15_rec_att = prev14_rec_att;
        prev15_rec_sof = prev14_rec_sof;
        prev15_game = prev14_game;
        prev15_tot_score = prev14_tot_score;

        prev14_rec_trial = prev13_rec_trial;
        prev14_rec_time = prev13_rec_time;
        prev14_rec_vel = prev13_rec_vel;
        prev14_rec_att = prev13_rec_att;
        prev14_rec_sof = prev13_rec_sof;
        prev14_game = prev13_game;
        prev14_tot_score = prev13_tot_score;

        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==16){
        prev16_rec_trial = prev15_rec_trial;
        prev16_rec_time = prev15_rec_time;
        prev16_rec_vel = prev15_rec_vel;
        prev16_rec_att = prev15_rec_att;
        prev16_rec_sof = prev15_rec_sof;
        prev16_game = prev15_game;
        prev16_tot_score = prev15_tot_score;

        prev15_rec_trial = prev14_rec_trial;
        prev15_rec_time = prev14_rec_time;
        prev15_rec_vel = prev14_rec_vel;
        prev15_rec_att = prev14_rec_att;
        prev15_rec_sof = prev14_rec_sof;
        prev15_game = prev14_game;
        prev15_tot_score = prev14_tot_score;

        prev14_rec_trial = prev13_rec_trial;
        prev14_rec_time = prev13_rec_time;
        prev14_rec_vel = prev13_rec_vel;
        prev14_rec_att = prev13_rec_att;
        prev14_rec_sof = prev13_rec_sof;
        prev14_game = prev13_game;
        prev14_tot_score = prev13_tot_score;

        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;

    }
    else if(trial_number ==17){
        prev17_rec_trial = prev16_rec_trial;
        prev17_rec_time = prev16_rec_time;
        prev17_rec_vel = prev16_rec_vel;
        prev17_rec_att = prev16_rec_att;
        prev17_rec_sof = prev16_rec_sof;
        prev17_game = prev16_game;
        prev17_tot_score = prev16_tot_score;
        
        prev16_rec_trial = prev15_rec_trial;
        prev16_rec_time = prev15_rec_time;
        prev16_rec_vel = prev15_rec_vel;
        prev16_rec_att = prev15_rec_att;
        prev16_rec_sof = prev15_rec_sof;
        prev16_game = prev15_game;
        prev16_tot_score = prev15_tot_score;

        prev15_rec_trial = prev14_rec_trial;
        prev15_rec_time = prev14_rec_time;
        prev15_rec_vel = prev14_rec_vel;
        prev15_rec_att = prev14_rec_att;
        prev15_rec_sof = prev14_rec_sof;
        prev15_game = prev14_game;
        prev15_tot_score = prev14_tot_score;

        prev14_rec_trial = prev13_rec_trial;
        prev14_rec_time = prev13_rec_time;
        prev14_rec_vel = prev13_rec_vel;
        prev14_rec_att = prev13_rec_att;
        prev14_rec_sof = prev13_rec_sof;
        prev14_game = prev13_game;
        prev14_tot_score = prev13_tot_score;

        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;
        
        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else if(trial_number ==18){
        prev18_rec_trial = prev17_rec_trial;
        prev18_rec_time = prev17_rec_time;
        prev18_rec_vel = prev17_rec_vel;
        prev18_rec_att = prev17_rec_att;
        prev18_rec_sof = prev17_rec_sof;
        prev18_game = prev17_game;
        prev18_tot_score = prev17_tot_score;

        prev17_rec_trial = prev16_rec_trial;
        prev17_rec_time = prev16_rec_time;
        prev17_rec_vel = prev16_rec_vel;
        prev17_rec_att = prev16_rec_att;
        prev17_rec_sof = prev16_rec_sof;
        prev17_game = prev16_game;
        prev17_tot_score = prev16_tot_score;
        
        prev16_rec_trial = prev15_rec_trial;
        prev16_rec_time = prev15_rec_time;
        prev16_rec_vel = prev15_rec_vel;
        prev16_rec_att = prev15_rec_att;
        prev16_rec_sof = prev15_rec_sof;
        prev16_game = prev15_game;
        prev16_tot_score = prev15_tot_score;

        prev15_rec_trial = prev14_rec_trial;
        prev15_rec_time = prev14_rec_time;
        prev15_rec_vel = prev14_rec_vel;
        prev15_rec_att = prev14_rec_att;
        prev15_rec_sof = prev14_rec_sof;
        prev15_game = prev14_game;
        prev15_tot_score = prev14_tot_score;

        prev14_rec_trial = prev13_rec_trial;
        prev14_rec_time = prev13_rec_time;
        prev14_rec_vel = prev13_rec_vel;
        prev14_rec_att = prev13_rec_att;
        prev14_rec_sof = prev13_rec_sof;
        prev14_game = prev13_game;
        prev14_tot_score = prev13_tot_score;

        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    else {
        // prev20_rec_trial = prev19_rec_trial;
        // prev20_rec_time = prev19_rec_time;
        // prev20_rec_vel = prev19_rec_vel;
        // prev20_rec_att = prev19_rec_att;
        // prev20_rec_sof = prev19_rec_sof;
        // prev20_game = prev19_game;

        prev19_rec_trial = prev18_rec_trial;
        prev19_rec_time = prev18_rec_time;
        prev19_rec_vel = prev18_rec_vel;
        prev19_rec_att = prev18_rec_att;
        prev19_rec_sof = prev18_rec_sof;
        prev19_game = prev18_game;
        prev19_tot_score = prev18_tot_score;

        prev18_rec_trial = prev17_rec_trial;
        prev18_rec_time = prev17_rec_time;
        prev18_rec_vel = prev17_rec_vel;
        prev18_rec_att = prev17_rec_att;
        prev18_rec_sof = prev17_rec_sof;
        prev18_game = prev17_game;
        prev18_tot_score = prev17_tot_score;

        prev17_rec_trial = prev16_rec_trial;
        prev17_rec_time = prev16_rec_time;
        prev17_rec_vel = prev16_rec_vel;
        prev17_rec_att = prev16_rec_att;
        prev17_rec_sof = prev16_rec_sof;
        prev17_game = prev16_game;
        prev17_tot_score = prev16_tot_score;

        prev16_rec_trial = prev15_rec_trial;
        prev16_rec_time = prev15_rec_time;
        prev16_rec_vel = prev15_rec_vel;
        prev16_rec_att = prev15_rec_att;
        prev16_rec_sof = prev15_rec_sof;
        prev16_game = prev15_game;
        prev16_tot_score = prev15_tot_score;

        prev15_rec_trial = prev14_rec_trial;
        prev15_rec_time = prev14_rec_time;
        prev15_rec_vel = prev14_rec_vel;
        prev15_rec_att = prev14_rec_att;
        prev15_rec_sof = prev14_rec_sof;
        prev15_game = prev14_game;
        prev15_tot_score = prev14_tot_score;

        prev14_rec_trial = prev13_rec_trial;
        prev14_rec_time = prev13_rec_time;
        prev14_rec_vel = prev13_rec_vel;
        prev14_rec_att = prev13_rec_att;
        prev14_rec_sof = prev13_rec_sof;
        prev14_game = prev13_game;
        prev14_tot_score = prev13_tot_score;

        prev13_rec_trial = prev12_rec_trial;
        prev13_rec_time = prev12_rec_time;
        prev13_rec_vel = prev12_rec_vel;
        prev13_rec_att = prev12_rec_att;
        prev13_rec_sof = prev12_rec_sof;
        prev13_game = prev12_game;
        prev13_tot_score = prev12_tot_score;

        prev12_rec_trial = prev11_rec_trial;
        prev12_rec_time = prev11_rec_time;
        prev12_rec_vel = prev11_rec_vel;
        prev12_rec_att = prev11_rec_att;
        prev12_rec_sof = prev11_rec_sof;
        prev12_game = prev11_game;
        prev12_tot_score = prev11_tot_score;

        prev11_rec_trial = prev10_rec_trial;
        prev11_rec_time = prev10_rec_time;
        prev11_rec_vel = prev10_rec_vel;
        prev11_rec_att = prev10_rec_att;
        prev11_rec_sof = prev10_rec_sof;
        prev11_game = prev10_game;
        prev11_tot_score = prev10_tot_score;

        prev10_rec_trial = prev9_rec_trial;
        prev10_rec_time = prev9_rec_time;
        prev10_rec_vel = prev9_rec_vel;
        prev10_rec_att = prev9_rec_att;
        prev10_rec_sof = prev9_rec_sof;
        prev10_game = prev9_game;
        prev10_tot_score = prev9_tot_score;

        prev9_rec_trial = prev8_rec_trial;
        prev9_rec_time = prev8_rec_time;
        prev9_rec_vel = prev8_rec_vel;
        prev9_rec_att = prev8_rec_att;
        prev9_rec_sof = prev8_rec_sof;
        prev9_game = prev8_game;
        prev9_tot_score = prev8_tot_score;

        prev8_rec_trial = prev7_rec_trial;
        prev8_rec_time = prev7_rec_time;
        prev8_rec_vel = prev7_rec_vel;
        prev8_rec_att = prev7_rec_att;
        prev8_rec_sof = prev7_rec_sof;
        prev8_game = prev7_game;
        prev8_tot_score = prev7_tot_score;

        prev7_rec_trial = prev6_rec_trial;
        prev7_rec_time = prev6_rec_time;
        prev7_rec_vel = prev6_rec_vel;
        prev7_rec_att = prev6_rec_att;
        prev7_rec_sof = prev6_rec_sof;
        prev7_game = prev6_game;
        prev7_tot_score = prev6_tot_score;

        prev6_rec_trial = prev5_rec_trial;
        prev6_rec_time = prev5_rec_time;
        prev6_rec_vel = prev5_rec_vel;
        prev6_rec_att = prev5_rec_att;
        prev6_rec_sof = prev5_rec_sof;
        prev6_game = prev5_game;
        prev6_tot_score = prev5_tot_score;

        prev5_rec_trial = prev4_rec_trial;
        prev5_rec_time = prev4_rec_time;
        prev5_rec_vel = prev4_rec_vel;
        prev5_rec_att = prev4_rec_att;
        prev5_rec_sof = prev4_rec_sof;
        prev5_game = prev4_game;
        prev5_tot_score = prev4_tot_score;

        prev4_rec_trial = prev3_rec_trial;
        prev4_rec_time = prev3_rec_time;
        prev4_rec_vel = prev3_rec_vel;
        prev4_rec_att = prev3_rec_att;
        prev4_rec_sof = prev3_rec_sof;
        prev4_game = prev3_game;
        prev4_tot_score = prev3_tot_score;

        prev3_rec_trial = prev2_rec_trial;
        prev3_rec_time = prev2_rec_time;
        prev3_rec_vel = prev2_rec_vel;
        prev3_rec_att = prev2_rec_att;
        prev3_rec_sof = prev2_rec_sof;
        prev3_game = prev2_game;
        prev3_tot_score = prev2_tot_score;

        prev2_rec_trial = prev1_rec_trial;
        prev2_rec_time = prev1_rec_time;
        prev2_rec_vel = prev1_rec_vel;
        prev2_rec_att = prev1_rec_att;
        prev2_rec_sof = prev1_rec_sof;
        prev2_game = prev1_game;
        prev2_tot_score = prev1_tot_score;

        prev1_rec_trial = rec_trial;
        prev1_rec_time = rec_time; 
        prev1_rec_vel = rec_vel;
        prev1_rec_att = rec_att;
        prev1_rec_sof = rec_sof;
        prev1_game = current_game;        
        prev1_tot_score = tot_score;
    }
    
    // console.log("post");
    // console.log(rec_sof);
    // console.log(prev1_rec_sof);
    // console.log(prev2_rec_sof);
    // console.log(prev3_rec_sof);  
}

// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
function checkKey(e) {
    inc = 0.5;
    e = e || window.event;
    
    if (e.keyCode == '87' && arrowY > 0) {
        // w key
        arrowY = 0;
        arrowY -= inc;
        start_check = true;
    }
    else if (e.keyCode == '87') {
        // w key
        arrowY -= 6*inc;
        start_check = true;
    }
    else if (e.keyCode == '83' && arrowY < 0) {
        // s key
        arrowY = 0;
        arrowY += inc;
        start_check = true;
    }
    else if (e.keyCode == '83') {
        // s key
        arrowY += 3*inc;
        start_check = true;
    }
    else if (e.keyCode == '37') {
       // left arrow
       arrowX -= 30*inc;
       start_check = true;
    }
    else if (e.keyCode == '39') {
       // right arrowwwww
       arrowX += 30*inc;
       start_check = true;
    }
    // console.log(arrowY);
}

//https://stackoverflow.com/questions/5254802/javascript-when-holding-down-arrow-keys
//http://gcctech.org/csc/javascript/javascript_keycodes.htm
function keyup(e) {

    e = e || window.event;

    // if (e.keyCode == '87') {
    //     // w key
    //     arrowY = 0;
    //     // newpositiony = 0;
    //     uy = 0;
    // }
    // else if (e.keyCode == '83') {
    //     // s key
    //     arrowY = 0;
    //     // newpositiony = 0;
    //     uy = 0;
    // }
    // else
    if (e.keyCode == '37') {
       // left arrow
       arrowX = 0;
    //    newpositionx = 0;
       ux = 0;
    }
    else if (e.keyCode == '39') {
       // right arrow
       arrowX = 0;
    //    newpositionx = 0;
       ux = 0;
    }

}

function checkSpeed(newpositionx,newpositiony) {
    if (newpositionx >= 100){
        newpositionx = 100;
    }
    else if (newpositionx <= -100){
        newpositionx = -100;
    }
    if (newpositiony >= 100){
        newpositiony = 100;
    }
    else if (newpositiony <= -100){
        newpositiony = -100;
    }
    return [newpositionx,newpositiony]
}

function startKey(e){
    e = e || window.event;
    
    if (e.keyCode == '87' || e.keyCode == '83' || e.keyCode == '37' || e.keyCode == '39') {
        start_check = true;
        window.removeEventListener('click', function (event){

        });
    }
}

// function compute_rmse(trajectory){
// }

function compute_score_t(time,success_land){
    DtUL = 103.5674 // Upper Limit of deducted points for time
    Tt = 45.0 // When steeped slope occurs in time score
    wt = 15.0 // How long it takes read upper limit of points deducted
    scale = 10;
    if (success_land == 1){
        score_time = DtUL*(1-1/(1+Math.exp(-((time-5)-Tt)/wt)));
    }
    else{
        if (time < 3.5){
            score_time = 0;
        }
        else if (time >= 3.5){
            score_time = 0.5*(1-1/(1+Math.exp(-((time-5)-Tt)/wt)));
        }
    }
    return score_time
}

function compute_score_p(pos_x,pos_y, success_land){
    if (success_land == 1){
        score_position = 100;
    }
    else{
        score_position = 100 - 100*Math.sqrt((pos_x-750)**2+(pos_y-544))/Math.sqrt((750**2)+(544**2))
    }
    return score_position
}

function compute_score_v(vel_x, vel_y){
    vel = Math.sqrt((vel_x*vel_x)+(vel_y*vel_y));
    DvUL = 1; //Upper Limit of deducted points for velocity
    Tv = 20; //Velocity at with steep slope occurs for velocity score
    wv = 4; //Velocity associated with upper limit of points deducted
    score_velocity = 100*(1-(DvUL/(1+Math.exp(-(vel-Tv)/wv))));
    return score_velocity
}

function compute_score_a(att){
    DaUL = 126.3597138115727; //Upper Limit of deducted points for attitude
    Ta = 20; //Attitude at which steepest slope occurs for attitude score
    wa = 15; //Attitude associated with upper limit of points deducted
    score_attitude = DaUL*(1-1/(1+Math.exp(-(Math.abs(att)-Ta)/wa)));
    return score_attitude
}

function compute_score_total(t_score,p_score,v_score,a_score){
    w_t_score = (t_score/100)*250;
    w_p_score = (p_score/100)*250;
    w_v_score = (v_score/99.3307)*250;
    w_a_score = (a_score/99.9304)*250;
    tot_score = w_t_score+w_p_score+w_v_score+w_a_score;    
    return tot_score.toPrecision(4)
}