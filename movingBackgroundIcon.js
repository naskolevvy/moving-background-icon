//create the css classes
let header = document.getElementsByTagName("HEAD")[0] ; //document header, append the css classes there

let canvasClass  = document.createElement("style");
canvasClass.id = "canvasClass" ; 
canvasClass.innerHTML = ".canvasClass {\
    position: fixed;\
    width: 100%;\
    height: 100%;\
    z-index: -2;\
    top: 0;left: 0;\
    pointer-events: none;}" ;

let backgroundIcon  = document.createElement("style");
backgroundIcon.id = "backgroundIcon" ; 
backgroundIcon.innerHTML = ".backgroundIcon {\
    position: fixed;\
    width: 100px;\
    height: 100px;\
    z-index: -1;\
    top: 0;\
    left: 0;\
    pointer-events: none;}"; // css rule

//append css classes to the document header
header.appendChild(canvasClass); 
header.appendChild(backgroundIcon);


var windowHeight = document.body.clientHeight; //set dimentions as of body
var windowWidth = document.body.clientWidth;

var backgroundIconNumber = document.getElementsByClassName('backgroundIcon');
var backgroundIconObjectArray = [];

for(let i = 0; i < backgroundIconNumber.length; i++){ //generate the objects for the icons
    var object = {
        htmlElement: backgroundIconNumber[i],
        context: '', 
        id: 'number_' +i,
        speed: 3, 
        t: 0, 
        tDiff: 0.008, 
        oldx: 0, 
        oldy: 0, 
        newx: 0, 
        newy: 0, 
        op1: {x: 0, y: 0}, 
        op2: {x: 0, y: 0}, 
        op3: {x: 0, y: 0},
        width: backgroundIconNumber[i].width,
        height: backgroundIconNumber[i].height
    }
    if(backgroundIconNumber[i].getAttribute('speed')){
        object.speed = backgroundIconNumber[i].getAttribute('speed');
    }
    if(!backgroundIconNumber[i].classList.contains('noParticles')){
        createCanvas(object);
    }
    backgroundIconObjectArray.push(object);
    moveBackgroundIcon(object);
}

function createCanvas(object){ //creating the canvases to draw the particles
    let canvasParticle = document.createElement('canvas');
    canvasParticle.className = 'canvasClass';
    canvasParticle.width = windowWidth;
    canvasParticle.height = windowHeight;
    document.body.appendChild(canvasParticle);
    object.context = canvasParticle.getContext('2d');
    object.context.canvas.width = windowWidth;
    object.context.canvas.height = windowHeight;
}

function moveBackgroundIcon(object){ //create initial points and start moving the icons
    object.op1 = {x: getRandomInt(windowWidth), y: getRandomInt(windowHeight)};
    object.op2 = {x: getRandomInt(windowWidth), y: getRandomInt(windowHeight)};
    object.op3 = {x: getRandomInt(windowWidth), y: getRandomInt(windowHeight)};
    window[object.id] = setInterval(function () {createPathBezier(backgroundIconObjectArray);},40);
}

window.addEventListener("resize", function(){ //resize the hight and width variables plus canvas variables
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
    let canvasArray = document.getElementsByClassName('canvasClass');
    for(let i = 0; i < canvasArray.length; i++){ //change canvas width
        canvasArray[i].width = windowWidth;
        canvasArray[i].height = windowHeight;
        
    }
    backgroundIconObjectArray.forEach(object => { //change context width
        object.context.canvas.width = windowWidth;
        object.context.canvas.height = windowHeight;
    });
});

function draw(x,y,object){ //draw the element 
    object.htmlElement.style.top = y + 'px';
    object.htmlElement.style.left = x + 'px';
    rotateObject(object);
}

function rotateObject(object){ //rotate the element
    let angle = Math.atan2(object.oldx-object.newx, object.oldy-object.newy) * 180 / Math.PI;
    object.htmlElement.style.transform = 'rotate('+ -angle+'deg)';
}


function modifyParticlePath(object){ //rotate the particles in line with the icon
    let angle = -Math.atan2(object.oldx-object.newx, object.oldy-object.newy) * 180 / Math.PI;
    let modifier = 0;
    if(angle > 0 && angle < 90){
        let theta = 90 - angle;
        modifier = {x: -Math.sin(angle*Math.PI/180)*object.width/2, y: Math.sin(theta*Math.PI/180)*object.height/2}
    }else if(angle > 90 && angle < 180){ 
        let theta = 180 - angle;
        modifier = {x: -Math.sin(theta*Math.PI/180)*object.width/2, y: -Math.sin((90-theta)*Math.PI/180)*object.height/2}
    }else if(angle < 0 && angle > -90){
        let theta = -angle - 90;
        modifier = {x: -Math.sin(angle*Math.PI/180)*object.width/2, y: -Math.sin(theta*Math.PI/180)*object.height/2}
    }else if(angle <-90 && angle > -180){
        modifier = {x: Math.sin((angle+180)*Math.PI/180)*object.width/2, y: Math.sin((angle+90)*Math.PI/180)*object.height/2}
    }else{
        modifier = {x: 0, y: 0};
    }
    return modifier;
}

function drawParticles(x,y,object){ //for the rocket partickles
//can edit this to use colorful particles 
    let diffx = object.oldx-object.newx;
    let diffy = object.oldy-object.newy;
    let modifier = modifyParticlePath(object); //correctly possition the particles
    x = x + object.width/2 + modifier.x;
    y = y + object.height/2 + modifier.y;
    diffx*=4;
    diffy*=4;
    object.context.clearRect(0, 0, object.context.canvas.width,object.context.canvas.height);
    
    if(diffx > 0 && diffy > 0){
        for(let i = 5 ; i >= 0; i--){
            drawIndividualParticles(object,x+diffx*i,y+diffy*i,Math.round(object.width/(9+i*3)),colors[i]);
        }
    }else if(diffx < 0 && diffy < 0){
        for(let i = 5 ; i >= 0; i--){
            drawIndividualParticles(object,x-Math.abs(diffx)*i,y-Math.abs(diffy)*i,Math.round(object.width/(9+i*3)),colors[i]);
        }
    }
    else if(diffx > 0 && diffy < 0){
        for(let i = 5 ; i >= 0; i--){
            drawIndividualParticles(object,x+diffx*i,y-Math.abs(diffy)*i,Math.round(object.width/(9+i*3)),colors[i]);
        }
    }
    else if(diffx < 0 && diffy > 0){
        for(let i = 5 ; i >= 0; i--){
            drawIndividualParticles(object,x-Math.abs(diffx)*i,y+diffy*i,Math.round(object.width/(9+i*3)),colors[i]);
        }      
    } 
    
}

var colors = ["#ffff33","#ffcc99","#ff9966","#ff9933","#ff6600","#b30000"]; //used for the flame colors

function drawIndividualParticles(object,x,y,r,color){ //draw each part of the flame
    object.context.beginPath();
    object.context.fillStyle = color;
    object.context.arc(x,y,r,0, Math.PI*2);
    object.context.fill();
    object.context.closePath(); 
}

function drawPath(x,y){ //this can be used for the spider web 1111111111111111111111111111111111
    
    ctx.beginPath();
    ctx.lineTo(oldx, oldy);
    ctx.strokeStyle = 'red';
    ctx.lineTo(x, y);
    ctx.stroke();
}


function createPathBezier(objects){ //generate the path for the element
    objects.forEach(object => { //for each object individually
        object.oldx = object.newx;
        object.oldy = object.newy;
        let p = bezier3(object.t,object.op1,object.op2,object.op3); //t is a parameter that changes between 0-1
        object.newx = p.x;
        object.newy = p.y;
        if(object.t > 1){ //when the current path is finished create a new one
            object.t = 0;
            object.op1 = {x: object.op3.x, y: object.op3.y};
            object.op2 = getRandomPoint(object.oldx,object.oldy,object.newx,object.newy);
            object.op3 = {x: getRandomInt(windowWidth), y: getRandomInt(windowHeight)};
            object.t+=object.tDiff;
            clearInterval(window[object.id]) //uses variable variable name to clear the timer
            setTimeout(function() {changePath(object)},200); //creates the path
            if(object.context != ''){
                drawParticles(p.x,p.y,object);
            }
            
        }else{
            //conditions that change the object.tDiff depending on the stage of the path
            if(object.t >= 0 && object.t < 0.09){
                object.tDiff = (1-object.t)/1500*object.speed;
            }else if( object.t >= 0.09 && object.t < 0.5){
                object.tDiff = object.t/90*object.speed;
            }else if( object.t >= 0.5 && object.t < 0.99){
                object.tDiff = (1-object.t)/90*object.speed;
            }else{
                object.tDiff = 0.0001*object.speed;
            }
            object.t+=object.tDiff;
            draw(p.x,p.y,object);
            if(object.context != ''){
                drawParticles(p.x,p.y,object);
            }
        }
    });
}

function changePath(object){ // this function prevents sudden change caused by different paths
    object.htmlElement.style.transition = 'all 0.2s ease'
    object.oldx = object.newx;
    object.oldy = object.newy;
    let p = bezier3(object.t,object.op1,object.op2,object.op3); //t is a parameter that changes between 0-1
    object.newx = p.x;
    object.newy = p.y;
    let angle = Math.atan2(object.oldx-object.newx, object.oldy-object.newy) * 180 / Math.PI;
    object.htmlElement.style.transform = 'rotate('+ -angle+'deg)';
    setTimeout(function(){ //clear the smooth transition and start the new timer
        object.htmlElement.style.transition = '';
        window[object.id] = setInterval(function () {createPathBezier(backgroundIconObjectArray);},40);
    },200);
}


function bezier3(t,p1,p2,p3){
    let x = Math.pow(1-t,2)*p1.x + 2*(1-t)*t*p2.x + Math.pow(t,2)*p3.x; 
    let y = Math.pow(1-t,2)*p1.y + 2*(1-t)*t*p2.y + Math.pow(t,2)*p3.y;
    return {x: x, y: y}
}


function getRandomPoint(ox,oy,nx,ny) { //for more controlled random points
    let dx = ox-nx;
    let dy = oy-ny;
    let x = 0;
    let y = 0;
    if(dx > 0 && dy > 0){
        x = getRandomInt(nx);
        y = getRandomInt(ny);
    }else if(dx < 0 && dy < 0){
        x = Math.random() * (windowWidth - ox) + ox;
        y = Math.random() * (windowHeight - oy) + oy;
    }
    else if(dx > 0 && dy < 0){
        x = getRandomInt(nx);
        y = Math.random() * (windowHeight - oy) + oy;
    }
    else if(dx < 0 && dy > 0){
        x = Math.random() * (windowWidth - ox) + ox;
        y = getRandomInt(ny);
    }
    return{x: x, y: y};
}
function getRandomInt(max) { //get random number in that ratio
    return Math.floor(Math.random() * Math.floor(max));
}
