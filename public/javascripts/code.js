// var mycanvas=document.getElementById('mycanvas');
 /*干扰线的随机x坐标值*/
 function lineX(){
  var ranLineX=Math.floor(Math.random()*90);
  return ranLineX;
 }
 /*干扰线的随机y坐标值*/
 function lineY(){
  var ranLineY=Math.floor(Math.random()*40);
  return ranLineY;
 }
 function clickChange(code){
var mycanvas=document.getElementById('mycanvas');
  console.log(mycanvas)
  var cxt=mycanvas.getContext('2d');
  cxt.fillStyle='#000';
  cxt.fillRect(0,0,90,40);
  /*生成干扰线20条*/
  for(var j=0;j<20;j++){
   cxt.strokeStyle='#fff';
   cxt.beginPath(); //若省略beginPath，则每点击一次验证码会累积干扰线的条数
   cxt.moveTo(lineX(),lineY());
   cxt.lineTo(lineX(),lineY());
   cxt.lineWidth=0.5;
   cxt.closePath();
   cxt.stroke();
  }
  cxt.fillStyle='red';
  cxt.font='bold 20px Arial';
  cxt.fillText(code,25,25); //把rand()生成的随机数文本填充到canvas中  
 }

