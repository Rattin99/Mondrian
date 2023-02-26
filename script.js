class Box{
    constructor(x,y,l,h){
        this.x = x;
        this.y = y;
        this.l = l;
        this.h = h;
    }
    intersect(other){
        if( (this.x + this.l < other.x) || (other.x +other.l < this.x) ){
            return false;
        }
        if( (this.y + this.l < other.y) || (other.y + other.h)<this.y){
            return false;
        }

        return true;
    }
}
class points{
    constructor(x,y){
        this.x = x;
        this.y =y;
    }
}
let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC', '#DFE0EC'];


function createPiet(){
    let xr = random(0,width);
    let yr = random(0,height);
    let lr = random(10,100);
    let hr = random(10,100);
  

    return new Box(xr,yr,lr,hr);
}

function ifIntersect(box1,box2){
    if( (box1.x + box1.l <box2.x) || 
    (box2.x + box2.l < box1.x) || 
    (box1.y+box1.h < box2.y) || 
    (box2.y+box2.h<box1.y) ){
        return false;
    }else{
        return true;
    }

   
}

function algo_1(){
    let planB = 0;
    let piets = [];
    while(piets.length < 150 && planB <100000000){
        let overlapping = false;
        let piet = createPiet();

        for(let i =0;i<piets.length;i++){
            if(piet.intersect(piets[i])){
                overlapping = true;
                break;
            }
        }
        if(!overlapping){
            piets.push(piet);
        }
        planB++;
    }

    for(let i=0;i<piets.length;i++){
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        fill(R,G,B);
        noStroke();
        rect(piets[i].x,piets[i].y,piets[i].l,piets[i].h);
    }

    console.log(piets.length);
}

function algo_2(){
    background('yellow');
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC', '#DFE0EC'];
    let planB = 0;
    let piets = [];
    while(piets.length < 100 && planB <100000000){
        let overlapping = false;
        let piet = createPiet();

        for(let i =0;i<piets.length;i++){

            if(ifIntersect(piet,piets[i])){
                overlapping = true;
                break;
            }
        }

        if(!overlapping){
            piets.push(piet);
        }
        planB++;
    }

    for(let i=0;i<piets.length;i++){
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        let color = modnrion_color[Math.floor(random(modnrion_color.length))];
        fill(R,G,B);
        noStroke();
        rect(piets[i].x,piets[i].y,piets[i].l,piets[i].h);
    }

    console.log(piets.length);
}
function broadway_scatter(){
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC', '#DFE0EC'];
    let broadway_color = ['#FF191C','#000182','#A22D28' ];
    let planB = 0;
    let piets = [];
    while(piets.length < 30 && planB <100000000){
        let overlapping = false;
        let piet = createPiet();

        for(let i =0;i<piets.length;i++){

            if(ifIntersect(piet,piets[i])){
                overlapping = true;
                break;
            }
        }

        if(!overlapping){
            piets.push(piet);
        }
        planB++;
    }

    for(let i=0;i<piets.length;i++){
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        let color = broadway_color[Math.floor(random(broadway_color.length))];
        fill(color);
        noStroke();
        rect(piets[i].x,piets[i].y,piets[i].l,piets[i].h);
    }
}



function composition1_algo(width,height){

   let box_num = 10;
   let min_size = 100;
   let canvas_border = 0;
   let space = 0;
   let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC'];

   let adjustment = [.5, 1, 1.5];

   let boxes = [];
   class points{
       constructor(x,y){
           this.x = x;
           this.y =y;
       }
   }
   class Pbox{
       constructor(A,B,C,D){
           this.a = A;
           this.b = B;
           this.c = C;
           this.d = D;
       }
   }
   let initial_box = new Pbox(new points(canvas_border,canvas_border), new points(width - canvas_border,canvas_border),new points(width-canvas_border,height-canvas_border),new points(canvas_border,height-canvas_border));
   boxes.push(initial_box);

   for(let i=0;i<box_num; i++){
      let box_index = Math.floor(random(boxes.length));
      let box = boxes[box_index];
      let b_lx = box.a.x;
      let b_rx = box.b.x;
      let b_ty = box.a.y;
      let b_by = box.d.y;

      let s = adjustment[Math.floor(random(adjustment.length))];
      if(random(1) < 0.5){
          if(b_rx - b_lx > min_size){
              let x_div = (b_rx - b_lx)/2 *s +b_lx;

              boxes.splice(box_index,1);
              boxes.push(new Pbox(new points(b_lx,b_ty),new points(x_div-space,b_ty),new points(x_div-space,b_by),new points(b_lx,b_by)));
              boxes.push(new Pbox(new points(x_div+space,b_ty),new points(b_rx,b_ty),new points(b_rx,b_by),new points(x_div+space,b_by)));

          }
      }else{
          if(b_by - b_ty > min_size){
              let y_div = (b_by - b_ty)/2 *s + b_ty;
              boxes.splice(box_index,1);
              boxes.push(new Pbox(new points(b_lx,b_ty),new points(b_rx,b_ty),new points(b_rx,y_div- space),new points(b_lx,y_div-space)));
              boxes.push(new Pbox(new points(b_lx,y_div+space),new points(b_rx,y_div+space),new points(b_rx,b_by),new points(b_lx,b_by)));
          }
      }
   }

   for(let i = 0; i<boxes.length;i++){
       let box = boxes[i];
       let x = box.a.x;
       let y = box.b.y;
       let l = box.b.x - box.a.x;
       let h = box.c.y - box.b.y;
       let R = random(0,255);
       let G = random(0,255);
       let B = random(0,255);
       let color = modnrion_color[Math.floor(random(modnrion_color.length))];
       fill(color);
    //    noStroke();
       stroke(0);
       strokeWeight(6);
       rect(x,y,l,h);

   }
   
}

// function setup(){
//     let mycanvas = createCanvas(1024,720);
//     mycanvas.parent("container");
//     // boogieWoogie();
//     // broadway_scatter();
//     composition1_algo(width,height);

// }

function newYork() {
       let num_hl = Math.floor(random(5,10));
       let num_vl = Math.floor(random(5,15));
       let newyork_color = ['#FFFF00','#FF191C','#000182'];
    //    let newyork_color = ['#26477C','#F0D95C','#A22D28'];
       
       for(let i =0; i<100;i++){
           let rx = random(width);
           let ry = random(height);

           if(random() < 0.5 ){
                if(num_hl>0){
                 stroke(newyork_color[Math.floor(random(newyork_color.length))]);
                 strokeWeight(18);
                 line(rx,0,rx,height);
                 num_hl--;
                }
           }else{
               if(num_vl>0){
                stroke(newyork_color[Math.floor(random(newyork_color.length))]);
                strokeWeight(18);
                line(0,ry,width,ry);
                num_vl--;
               }
           }
       }
}
function newYork_custom(numberv,numberh,wt,palette) {
    let custom_pallete;
    let numv = numberv;
    let numh = numberh
    let weight = wt;
    let num_hl = Math.floor(random(1+numv,4+numv));
    let num_vl = Math.floor(random(1+numh,4+numh));
    let newyork_color = ['#FFFF00','#FF191C','#000182'];
    if(palette != 0){
        custom_pallete = palette;
    }else{
        custom_pallete = newyork_color;
    }
    
    for(let i =0; i<200;i++){
        let rx = random(width);
        let ry = random(height);

        if(random() < 0.5 ){
             if(num_hl>0){
              stroke(custom_pallete[Math.floor(random(custom_pallete.length))]);
              strokeWeight(weight);
              line(rx,0,rx,height);
              num_hl--;
             }
        }else{
            if(num_vl>0){
             stroke(custom_pallete[Math.floor(random(custom_pallete.length))]);
             strokeWeight(weight);
             line(0,ry,width,ry);
             num_vl--;
            }
        }
    }
}

function boogieWoogie() {
    // let broadway_color = ['#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FF191C','#000182'];
    let secondary_color = ['#FF191C','#000182'];
    let nums_vl = random(5,7);
    let nums_hl = random(5,7);
    let hls = []
    let vls = [];
    let intersection = [];

    for(let i=0;i<1000; i++){
        if(nums_hl > 0){
            let hobe = true;
            let ry = random(height);
            for(let h = 0;h<hls.length;h++){
                if( (ry+15 >= hls[h] && !(ry >=hls[h]+30)) || ( (hls[h]+15 <= ry) && !(hls[h]+30 <=ry) )  || (ry+15 >= height)|| ((Math.abs(ry - hls[h]) <30))){
                    hobe = false;
                    break;
                }
            }
           if(hobe){
               hls.push(ry);
            for(let j=0;j<=width;j+=15){
                noStroke();
                fill(broadway_color[Math.floor(random(broadway_color.length))]);
                rect(j,ry,15,15);
            }
            nums_hl--;
           }
        }
        if(nums_vl>0){
            let hobe = true;
            let rx = random(width);
            for(let h = 0;h<vls.length;h++){
                if((rx+30 >=vls[h] && !(rx>=vls[h]+30) ) || ( (vls[h]+30< rx) && !(vls[h]+45< rx)) || (Math.abs((rx - width))<30 ) || (rx<15)  ){
                    hobe = false;
                    break;
                }
            }

            if(hobe){
                vls.push(rx);
                for(let j=0;j<=height;j+=15){
                    noStroke();
                    fill(broadway_color[Math.floor(random(broadway_color.length))]);
                    rect(rx,j,15,15);
                }
                nums_vl--;
            }
        }
    }
    if(vls.length > hls.length){
        for(let i=0;i<hls.length;i++){
           for(let j=0;j<hls.length;j++){
            intersection.push(new points(vls[i],hls[j]));
           }
        }
    }else{
        for(let i=0;i<vls.length;i++){
           for(let j=0;j<vls.length;j++){
            intersection.push(new points(vls[i],hls[j]));
           }
        }
    }

    for(let i = 0;i<intersection.length;i++){
        fill(secondary_color[Math.floor(random(secondary_color.length))]);
        rect(intersection[i].x,intersection[i].y,15,15);
    }

}
function frame(){
    stroke(5);
    strokeWeight(8);
    line(0,0,0,height);
    line(0,0,width,0);
    line(width,0,width,height);
    line(0,height,width,height);



}

function composition1_A(s1,s2,s3,s4,palette){
    let custom_pallete;
    let box_num = s1;
    let min_size = s2;
    let canvas_border = 0;
    let space = s4;
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC'];
 
    let adjustment = [.5, 1, 1.5];
 
    let boxes = [];
    if(palette.length != 0){
        custom_pallete = palette;
    }else{
        custom_pallete = modnrion_color;
    }
    class points{
        constructor(x,y){
            this.x = x;
            this.y =y;
        }
    }
    class Pbox{
        constructor(A,B,C,D){
            this.a = A;
            this.b = B;
            this.c = C;
            this.d = D;
        }
    }
    let initial_box = new Pbox(new points(canvas_border,canvas_border), new points(width - canvas_border,canvas_border),new points(width-canvas_border,height-canvas_border),new points(canvas_border,height-canvas_border));
    boxes.push(initial_box);
 
    for(let i=0;i<box_num; i++){
       let box_index = Math.floor(random(boxes.length));
       let box = boxes[box_index];
       let b_lx = box.a.x;
       let b_rx = box.b.x;
       let b_ty = box.a.y;
       let b_by = box.d.y;
 
       let s = adjustment[Math.floor(random(adjustment.length))];
       if(random(1) < 0.5){
           if(b_rx - b_lx > min_size){
               let x_div = (b_rx - b_lx)/2 *s +b_lx;
 
               boxes.splice(box_index,1);
               boxes.push(new Pbox(new points(b_lx,b_ty),new points(x_div-space,b_ty),new points(x_div-space,b_by),new points(b_lx,b_by)));
               boxes.push(new Pbox(new points(x_div+space,b_ty),new points(b_rx,b_ty),new points(b_rx,b_by),new points(x_div+space,b_by)));
 
           }
       }else{
           if(b_by - b_ty > min_size){
               let y_div = (b_by - b_ty)/2 *s + b_ty;
               boxes.splice(box_index,1);
               boxes.push(new Pbox(new points(b_lx,b_ty),new points(b_rx,b_ty),new points(b_rx,y_div- space),new points(b_lx,y_div-space)));
               boxes.push(new Pbox(new points(b_lx,y_div+space),new points(b_rx,y_div+space),new points(b_rx,b_by),new points(b_lx,b_by)));
           }
       }
    }
 
    for(let i = 0; i<boxes.length;i++){
        let box = boxes[i];
        let x = box.a.x;
        let y = box.b.y;
        let l = box.b.x - box.a.x;
        let h = box.c.y - box.b.y;
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        let color = custom_pallete[Math.floor(random(custom_pallete.length))];
        fill(color);
     //    noStroke();
        stroke(0);
        strokeWeight(s3);
        rect(x,y,l,h);
 
    }
    
 }

 function boogieWoogie_s(sl1,sl2,palette) {
     let color_palette;
    let num = sl2;
    let b_size = sl1;
    let broadway_color = ['#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#F5D400','#FADD05','#020F59','#A61103','#BB2100'];
    // let broadway_color = ['#26477C','#F0D95C','#A22D28'];
    let secondary_color = ['#020F59','#BB2100'];
    let nums_vl = random(1+num,3+num);
    let nums_hl = random(1+num,3+num);
    let hls = []
    let vls = [];
    let intersection = [];

    if(palette.length != 0){
        color_palette = palette;
        secondary_color = color_palette;
    }else{
        color_palette = broadway_color;
    }

    for(let i=0;i<1000; i++){
        if(nums_hl > 0){
            let hobe = true;
            let ry = random(height);
            for(let h = 0;h<hls.length;h++){
                if( (ry+15 >= hls[h] && !(ry >=hls[h]+30)) || ( (hls[h]+15 <= ry) && !(hls[h]+30 <=ry) )  || (ry+15 >= height)|| ((Math.abs(ry - hls[h]) <30))){
                    hobe = false;
                    break;
                }
            }
           if(hobe){
               hls.push(ry);
            for(let j=0;j<=width;j+=15){
                noStroke();
                fill(color_palette[Math.floor(random(color_palette.length))]);
                rect(j,ry,b_size,b_size);
            }
            nums_hl--;
           }
        }
        if(nums_vl>0){
            let hobe = true;
            let rx = random(width);
            for(let h = 0;h<vls.length;h++){
                if((rx+30 >=vls[h] && !(rx>=vls[h]+30) ) || ( (vls[h]+30< rx) && !(vls[h]+45< rx)) || (Math.abs((rx - width))<30 ) || (rx<15)  ){
                    hobe = false;
                    break;
                }
            }

            if(hobe){
                vls.push(rx);
                for(let j=0;j<=height;j+=15){
                    noStroke();
                    fill(color_palette[Math.floor(random(color_palette.length))]);
                    rect(rx,j,b_size,b_size);
                }
                nums_vl--;
            }
        }
    }
    if(vls.length > hls.length){
        for(let i=0;i<hls.length;i++){
           for(let j=0;j<hls.length;j++){
            intersection.push(new points(vls[i],hls[j]));
           }
        }
    }else{
        for(let i=0;i<vls.length;i++){
           for(let j=0;j<vls.length;j++){
            intersection.push(new points(vls[i],hls[j]));
           }
        }
    }

    for(let i = 0;i<intersection.length;i++){
        fill(secondary_color[Math.floor(random(secondary_color.length))]);
        rect(intersection[i].x,intersection[i].y,b_size,b_size);
    }

}

function broadway_s(sl3,sl4,palette){
    let color_palette;
    let numb = sl3;
    let size = sl4;
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC', '#DFE0EC'];
    let broadway_color = ['#FF191C','#000182','#A22D28' ];
    let planB = 0;
    let piets = [];
    if(palette.length === 0){
        color_palette = broadway_color;
    }else{
        color_palette = palette;
    }
    while(piets.length < numb && planB <100000000){
        let overlapping = false;
        let piet = createPiet2(size);

        for(let i =0;i<piets.length;i++){

            if(ifIntersect(piet,piets[i])){
                overlapping = true;
                break;
            }
        }

        if(!overlapping){
            piets.push(piet);
        }
        planB++;
    }

    for(let i=0;i<piets.length;i++){
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        let color = color_palette[Math.floor(random(color_palette.length))];
        fill(color);
        noStroke();
        rect(piets[i].x,piets[i].y,piets[i].l,piets[i].h);
    }
}
function broadway_r(sl3,sl4){
    let numb = sl3;
    let size = sl4;
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC', '#DFE0EC'];
    let broadway_color = ['#FF191C','#000182','#A22D28' ];
    let planB = 0;
    let piets = [];
    while(piets.length < numb && planB <100000000){
        let overlapping = false;
        let piet = createPiet2(size);

        for(let i =0;i<piets.length;i++){

            if(ifIntersect(piet,piets[i])){
                overlapping = true;
                break;
            }
        }

        if(!overlapping){
            piets.push(piet);
        }
        planB++;
    }

    for(let i=0;i<piets.length;i++){
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        fill(R,G,B);
        noStroke();
        rect(piets[i].x,piets[i].y,piets[i].l,piets[i].h);
    }
}



function createPiet2(num){
    let s = 100;
    let min = 10;
    let xr = random(0,width);
    let yr = random(0,height);
    let hr = random(min,10+num);
    let lr = random(min,10+num);
   
  

    return new Box(xr,yr,lr,hr);
}
function boogieWoogie_r(sl1,sl2) {
   let num = sl2;
   let b_size = sl1;
   // let broadway_color = ['#26477C','#F0D95C','#A22D28'];
   let secondary_color;
   let nums_vl = random(1+num,3+num);
   let nums_hl = random(1+num,3+num);
   let hls = []
   let vls = [];
   let intersection = [];
   for(let i=0;i<1000; i++){
   
       if(nums_hl > 0){
           let hobe = true;
           let ry = random(height);
           for(let h = 0;h<hls.length;h++){
               if( (ry+15 >= hls[h] && !(ry >=hls[h]+30)) || ( (hls[h]+15 <= ry) && !(hls[h]+30 <=ry) )  || (ry+15 >= height)|| ((Math.abs(ry - hls[h]) <30))){
                   hobe = false;
                   break;
               }
           }
          if(hobe){
              hls.push(ry);
           for(let j=0;j<=width;j+=15){
            let R = random(0,255);
            let G = random(0,255);
            let B = random(0,255);
               noStroke();
               fill(R,G,B);
               rect(j,ry,b_size,b_size);
           }
           nums_hl--;
          }
       }
       if(nums_vl>0){
           let hobe = true;
           let rx = random(width);
           for(let h = 0;h<vls.length;h++){
               if((rx+30 >=vls[h] && !(rx>=vls[h]+30) ) || ( (vls[h]+30< rx) && !(vls[h]+45< rx)) || (Math.abs((rx - width))<30 ) || (rx<15)  ){
                   hobe = false;
                   break;
               }
           }

           if(hobe){
               vls.push(rx);
               for(let j=0;j<=height;j+=15){
                let R = random(0,255);
                let G = random(0,255);
                let B = random(0,255);
                   noStroke();
                   fill(R,G,B);
                   rect(rx,j,b_size,b_size);
               }
               nums_vl--;
           }
       }
   }
   if(vls.length > hls.length){
       for(let i=0;i<hls.length;i++){
          for(let j=0;j<hls.length;j++){
           intersection.push(new points(vls[i],hls[j]));
          }
       }
   }else{
       for(let i=0;i<vls.length;i++){
          for(let j=0;j<vls.length;j++){
           intersection.push(new points(vls[i],hls[j]));
          }
       }
   }

   for(let i = 0;i<intersection.length;i++){
       let R = random(0,255);
       let G = random(0,255);
       let B = random(0,255);
       fill(R,G,B);
       rect(intersection[i].x,intersection[i].y,b_size,b_size);
   }
}

function newYork_r(numberv,numberh,wt) {

    let numv = numberv;
    let numh = numberh
    let weight = wt;
    let num_hl = Math.floor(random(1+numv,4+numv));
    let num_vl = Math.floor(random(1+numh,4+numh));
    let newyork_color = ['#FFFF00','#FF191C','#000182'];
    
    for(let i =0; i<200;i++){
        let rx = random(width);
        let ry = random(height);
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);

        if(random() < 0.5 ){
             if(num_hl>0){
              stroke(R,G,B);
              strokeWeight(weight);
              line(rx,0,rx,height);
              num_hl--;
             }
        }else{
            if(num_vl>0){
             stroke(R,G,B);
             strokeWeight(weight);
             line(0,ry,width,ry);
             num_vl--;
            }
        }
    }
}
function composition1_r(s1,s2,s3,s4){
    let custom_pallete;
    let box_num = s1;
    let min_size = s2;
    let canvas_border = 0;
    let space = s4;
    let modnrion_color = ['#26477C','#F0D95C','#A22D28', '#DFE0EC'];
 
    let adjustment = [.5, 1, 1.5];
 
    let boxes = [];
    class points{
        constructor(x,y){
            this.x = x;
            this.y =y;
        }
    }
    class Pbox{
        constructor(A,B,C,D){
            this.a = A;
            this.b = B;
            this.c = C;
            this.d = D;
        }
    }
    let initial_box = new Pbox(new points(canvas_border,canvas_border), new points(width - canvas_border,canvas_border),new points(width-canvas_border,height-canvas_border),new points(canvas_border,height-canvas_border));
    boxes.push(initial_box);
 
    for(let i=0;i<box_num; i++){
       let box_index = Math.floor(random(boxes.length));
       let box = boxes[box_index];
       let b_lx = box.a.x;
       let b_rx = box.b.x;
       let b_ty = box.a.y;
       let b_by = box.d.y;
 
       let s = adjustment[Math.floor(random(adjustment.length))];
       if(random(1) < 0.5){
           if(b_rx - b_lx > min_size){
               let x_div = (b_rx - b_lx)/2 *s +b_lx;
 
               boxes.splice(box_index,1);
               boxes.push(new Pbox(new points(b_lx,b_ty),new points(x_div-space,b_ty),new points(x_div-space,b_by),new points(b_lx,b_by)));
               boxes.push(new Pbox(new points(x_div+space,b_ty),new points(b_rx,b_ty),new points(b_rx,b_by),new points(x_div+space,b_by)));
 
           }
       }else{
           if(b_by - b_ty > min_size){
               let y_div = (b_by - b_ty)/2 *s + b_ty;
               boxes.splice(box_index,1);
               boxes.push(new Pbox(new points(b_lx,b_ty),new points(b_rx,b_ty),new points(b_rx,y_div- space),new points(b_lx,y_div-space)));
               boxes.push(new Pbox(new points(b_lx,y_div+space),new points(b_rx,y_div+space),new points(b_rx,b_by),new points(b_lx,b_by)));
           }
       }
    }
 
    for(let i = 0; i<boxes.length;i++){
        let box = boxes[i];
        let x = box.a.x;
        let y = box.b.y;
        let l = box.b.x - box.a.x;
        let h = box.c.y - box.b.y;
        let R = random(0,255);
        let G = random(0,255);
        let B = random(0,255);
        fill(R,G,B);
     //    noStroke();
        stroke(0);
        strokeWeight(s3);
        rect(x,y,l,h);
 
    }
    
 }


//jblblbl
