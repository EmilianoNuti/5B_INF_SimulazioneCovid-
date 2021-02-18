let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

class Ball 
{
    constructor(x, y, radius) 
    {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = 5;
  
      this.changeAngle(0);
      this.movement = 0;
  
    }

    changeAngle(angle) 
    {
        if (angle == 0) angle = 1; // angle cannot be equal to 0;
        this.angle = angle;
        this.radians = (this.angle / (180 * Math.PI)) * 10;
        this.xunits = Math.cos(this.radians) * this.speed;
        this.yunits = Math.sin(this.radians) * this.speed;
    }

    angleTo(x, y) 
    {
        this.changeAngle(Math.atan2(y - this.y, x - this.x));
    }

    render() 
    {
        this.x += this.xunits;
        this.y += this.yunits;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "green";
        this.movement += this.speed;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.restore();
    }


}

function adjust_for_dpi(canvas_ele) 
{
    canvas_ele.style.width = "100%";
    canvas_ele.style.height = "100%";
    

}
function start()
{

}
