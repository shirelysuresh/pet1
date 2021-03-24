//Create variables here
var foodS
function preload() {
  dogImage= loadImage("images/dogImg.png");

  dogImage1=loadImage("images/dogImg1.png")
}


function setup() {
	createCanvas(1500,1200);

  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  foodStock.set(20);
  
  dog = createSprite(750,800,10,20);
  dog.addImage(dogImage);
  
}


function draw() {  

  background("green")
 if(foodS!==undefined){
   textSize(20)
   fill("white")
   text("note press UP_ARROW to feed your dog",150,170)
   text("food remaining;"+foodS,150,150)
 }
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImage1)
  }
  if(keyDown(DOWN_ARROW)){
    
    dog.addImage(dogImage)
  }
  if (foodS === 0){
    foodS = 20
  }
  dog.display();
  drawSprites();
  //add styles here

}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}
function readStock(data){
  foodS=data.val();
}


