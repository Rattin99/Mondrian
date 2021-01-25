const play = document.querySelector('i.play');
const save = document.querySelector('.save');
const paintings = document.querySelector('.section2');
const options = document.querySelector('.options');
const slidersPanel = document.querySelector('.section3');
const sliders = document.querySelector('.sliders');
const colors = document.querySelector('.section4');
const colorButton = document.querySelector('.fa-palette');
const radioButtons = document.querySelector('.radio-buttons');
const pickerS = document.querySelector('.picker');
const colorPickers = document.querySelectorAll('input[type="color"]');
const logo = document.querySelector('h1');
const slider1 = document.querySelector('.slider-1');
const slider2 = document.querySelector('.slider-2');
const slider3 = document.querySelector('.slider-3');
const slider4 = document.querySelector('.slider-4');
let rand = false,custom = false,origin = false;

console.log(slider4);
class Inputs{
    constructor(){
        this.sl1;
        this.sl2;
        this.sl3;
        this.sl4;
    }
}

let currentpainting;
let mycanvas;
let inputs = new Inputs();
let custom_pallete = [];

function setup(){
    mycanvas = createCanvas(1024,720);
    mycanvas.parent("container");
    noLoop();
}

function draw(){
    background(255, 255, 255);
    if(currentpainting === 'composition'){
        // composition1_A(inputs.sl1,inputs.sl2,inputs.sl3,inputs.sl4);
       if(rand){
        composition1_r((Number(inputs.sl1)),Number(inputs.sl2),Number(inputs.sl3),Number(inputs.sl4));
        frame();
       }else{
        composition1_A((Number(inputs.sl1)),Number(inputs.sl2),Number(inputs.sl3),Number(inputs.sl4),custom_pallete);
      
        frame();
       }
    }
    else if(currentpainting === 'broadway'){
      if(rand){
          boogieWoogie_r(Number(inputs.sl1)/2000,Number(inputs.sl2)/10);
          if(Number(inputs.sl3) === 0){
  
        }else{
          broadway_r(Number(inputs.sl3)/3,Number(inputs.sl4));
        }
      }else{
        boogieWoogie_s(Number(inputs.sl1)/2000,Number(inputs.sl2)/10,custom_pallete);
        if(Number(inputs.sl3) === 0){
  
        }else{
          broadway_s(Number(inputs.sl3)/3,Number(inputs.sl4),custom_pallete);
        }
         frame();
      }
    }
    else if(currentpainting === 'city'){
       if(rand){
        newYork_r((Number(inputs.sl1)/500),Number(inputs.sl2)/3,Number(inputs.sl3));
        frame();
       }else{
        newYork_custom((Number(inputs.sl1)/500),Number(inputs.sl2)/3,Number(inputs.sl3),custom_pallete);
        frame();
       }
    }else if(currentpainting === 'inColor'){
      if(rand){
        broadway_r(Number(inputs.sl1)/300,Number(inputs.sl2)*10);
        frame();
      }else{
        broadway_s(Number(inputs.sl1)/300,Number(inputs.sl2)*10,custom_pallete);
        frame();
      }
    }else if(currentpainting === 'minima'){
        algo_1();
        frame();
    }else{
        // console.log(inputs.sl1,inputs.sl2,inputs.sl3,inputs.sl4);
        composition1_A((Number(inputs.sl1)),Number(inputs.sl2),Number(inputs.sl3),Number(inputs.sl4),custom_pallete);
        frame();
    }
}
window.addEventListener('load',(e)=>{
    ideal_slider(1,10);
    ideal_slider(2,100);
    ideal_slider(3,5);
    ideal_slider(4,1);
    get_values();
    console.log(inputs.sl1,inputs.sl2,inputs.sl3,inputs.sl4);
})
play.addEventListener('click',() =>{
    redraw();
});
save.addEventListener('click', ()=>{
    let rtag = Math.floor(random(3333,7999));
    let tag = `${rtag}-composition`
    saveCanvas(tag,'png');
});

options.addEventListener('click',(e)=>{
    if(e.target.classList.contains('fa-image')){
        togglePainting();
        if(e.target.parentElement.querySelector('.toggle')){
            
        }
    }
    if(e.target.classList.contains('fa-sliders-h')){
        toggleSliders();

    }
    if(e.target.classList.contains('fa-palette')){
        toggleColors();
    }

});

paintings.addEventListener('click',(e)=>{
    if(e.target.parentElement.classList.contains('composition')){
        currentpainting = 'composition';
        slider1.value = 10;
        slider2.value = 100;
        slider3.value = 5;
        slider4.value = 1;
        inputs.sl1 = 10;
        inputs.sl2 = 100;
        inputs.sl3 = 5;
        inputs.sl4 = 1;
        redraw();
    }
    else if(e.target.parentElement.classList.contains('broadway')){
        currentpainting = 'broadway';
        slider1.value = 30000;
        slider2.value = 18;
        slider3.value = 55;
        slider4.value = 75;
        inputs.sl1 = 30000;
        inputs.sl2 = 18;
        inputs.sl3 = 55;
        inputs.sl4 = 75;
        redraw();
    }
    else if(e.target.parentElement.classList.contains('city')){
        currentpainting = 'city';
        slider1.value = 9230;
        slider2.value = 18;
        slider3.value = 13;
        slider4.value = 1;
        inputs.sl1 = 9230;
        inputs.sl2 = 18;
        inputs.sl3 = 13;
        inputs.sl4 = 1;
        redraw();
    }
    else if(e.target.parentElement.classList.contains('inColor')){
        currentpainting = 'inColor';
        slider1.value = 17000;
        slider2.value = 18;
        slider3.value = 13;
        slider4.value = 1;
        inputs.sl1 = 17000;
        inputs.sl2 = 18;
        inputs.sl3 = 13;
        inputs.sl4 = 1;
        redraw();
    }
    else if(e.target.parentElement.classList.contains('minima')){
        currentpainting = 'minima';
        redraw();
    }
});
sliders.addEventListener('change',(e) =>{
    const slider = e.target;
    if(slider.classList.contains('slider-1')){
        inputs.sl1 = slider.value;
        console.log(inputs.sl1);
    }
    if(slider.classList.contains('slider-2')){
        inputs.sl2 = slider.value;
        console.log(inputs.sl2);
    }
    if(slider.classList.contains('slider-3')){
        inputs.sl3 = slider.value;
        console.log(inputs.sl3);
    }
    if(slider.classList.contains('slider-4')){
        inputs.sl4 = slider.value;
        console.log(inputs.sl4);
    }
    console.log(inputs.sl1,inputs.sl2,inputs.sl3,inputs.sl4);
});
radioButtons.addEventListener('click',(e)=>{
    if(e.target.classList.contains('randomize')){
        rand=true;
        custom = false;
        origin = false;
        if(!pickerS.classList.contains('toggle')){
            pickerS.classList.toggle('toggle');
        }
        clear_palette();
    }
    else if(e.target.classList.contains('custom')){
        getcolorP();
        rand=false;
        custom =true;
        origin = false;
        if(pickerS.classList.contains('toggle')){
            pickerS.classList.toggle('toggle');
        }
    }
    else if(e.target.classList.contains('original')){
        rand=false;
        custom = false;
        origin = true;
        if(!pickerS.classList.contains('toggle')){
            pickerS.classList.toggle('toggle');
        }
        clear_palette();
        
    }
});
colorPickers.forEach((picker,index)=>{
    picker.addEventListener('change',(e)=>{
        custom_pallete[index] = picker.value;
    })
 });

 window.addEventListener('click',(e)=>{
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC'];
    let logo_color = Math.floor(random(0,3));
     logo.style.color = modnrion_color[logo_color];
 });



 function getcolorP(){
     colorPickers.forEach((picker,index)=>{
         custom_pallete[index] =picker.value;
     })
}
function togglePainting(){
    if(!slidersPanel.classList.contains('toggle')){
        slidersPanel.classList.toggle('toggle');
    }
    if(!colors.classList.contains('toggle')){
        colors.classList.toggle('toggle');
    }
    paintings.classList.toggle('toggle');
}

function toggleSliders(){
    if(!paintings.classList.contains('toggle')){
        paintings.classList.toggle('toggle');
    }
    if(!colors.classList.contains('toggle')){
        colors.classList.toggle('toggle');
    }
    slidersPanel.classList.toggle('toggle');

}
function toggleColors(){
    if(!paintings.classList.contains('toggle')){
        paintings.classList.toggle('toggle');
    }
    if(!slidersPanel.classList.contains('toggle')){
        slidersPanel.classList.toggle('toggle');
    }
    colors.classList.toggle('toggle');
}
function ideal_slider(sn,v){
    sliders.querySelector(`.slider-${sn}`).value = v;
}
function get_values(){
    inputs.sl1 = sliders.querySelector('.slider-1').value;
    inputs.sl2 = sliders.querySelector('.slider-2').value;
    inputs.sl3 = sliders.querySelector('.slider-3').value;
    inputs.sl4 = sliders.querySelector('.slider-4').value;
}
function clear_palette(){
    if(custom_pallete.length != 0){
        custom_pallete = [];
    }
}