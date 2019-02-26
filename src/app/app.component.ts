import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  listOfData: any = [];
  private cx: CanvasRenderingContext2D;


  ngAfterViewInit(): void {
    this.getDataAndDraw();
  }

  getDataAndDraw(): void {

	  this.listOfData.push({color: 0, value: 500, description: 'description 1'});
	  this.listOfData.push({color: 16777215, value: 480, description: 'description 2'});
	  this.listOfData.push({color: 4227072, value: 460, description: 'description 3'});
	  this.listOfData.push({color: 65280, value: 440, description: 'description 4'});
	  this.listOfData.push({color: 32896, value: 420, description: 'description 5'});
	  this.listOfData.push({color: 128, value: 400, description: 'description 6'});
	  this.listOfData.push({color: 33023, value: 380, description: 'description 7'});
	  this.listOfData.push({color: 65535, value: 360, description: 'description 8'});
	  this.listOfData.push({color: 16711935, value: 340, description: 'description 9'});
	  this.listOfData.push({color: 0, value: 320, description: 'description 10'});
	  this.listOfData.push({color: 16777215, value: 300, description: 'description 11'});
	  this.listOfData.push({color: 4227072, value: 280, description: 'description 12'});
	  this.listOfData.push({color: 65280, value: 260, description: 'description 13'});
	  this.listOfData.push({color: 32896, value: 240, description: 'description 14'});
	  this.listOfData.push({color: 128, value: 220, description: 'description 15'});
	  this.listOfData.push({color: 33023, value: 200, description: 'description 16'});
	  this.listOfData.push({color: 65535, value: 180, description: 'description 17'});
	  this.listOfData.push({color: 16711935, value: 160, description: 'description 18'});

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement; // declare canvas
    canvasEl.width = canvasEl.parentElement.clientWidth * 0.9; // getting 90% of the parent div, this value is up to you
    canvasEl.height = (this.listOfData.length * 25); // Height of the canvas, giving 25px for each bar
    this.cx = canvasEl.getContext('2d'); // get canvas context for two-dimensional rendering

    let startWidth = canvasEl.width * 0.70; // drawing the funnel in 70% of the canvas and saving 30% for details.
    let sizeToSub = startWidth / this.listOfData.length; // total size to subtract from the bar
    let sideSize = sizeToSub / 2; // size to sub each side
    let startAt = 0; // x to start drawing
    let cutted = 0; // value cutted in the previus interation
    let finishAt = startWidth; // finished value of last interation, starting with the full width
    let startYAt = 0; // Y value to start drawing
    let beginTriangle = startWidth + 20; // startpoint of triangle to the details

    
    for (let i = 0; i < this.listOfData.length; i++) { // foreach element of the list we draw a new line

      this.cx.beginPath(); // start the drawing

      this.cx.fillStyle = this.calculateOLEColorToRGB(this.listOfData[i].color); // pick the color, fillStype used RGB, however I needed to use OLE colors

      // primeiro movimento, do ponto xm -> xm + tamanho
      let barSize = (startWidth - (i * sideSize));
      let twoPerc = (barSize * 0.98); // 2% of the total size to do the cutting, this value is up to you.
      let sub = barSize - twoPerc; // subtracted value to get the remain of barSize - towPerc
      let x1 = finishAt; // x1 will be the finish point of our bar      																																												
      let x2 = x1 - sub; // x2 will be the x1 - the cutting for our drawing
      let y2 = startYAt + 25; // I'm giving a height of 25px for each bar
      let x3 = (startAt + sub); // x3 is where we stop drawing our bar, from the starting point we need to sum the same amount we subtracted from the last 

      this.cx.moveTo(startAt, startYAt); // mark the start point.
      this.cx.lineTo(x1, startYAt); // draw the first line
      this.cx.lineTo(x2, y2); // do the diagonal like /
      this.cx.lineTo(x3, y2); // move from the right to the left
      this.cx.fill(); // connect to the last point making \ and fill

      let yCenter = (startYAt + y2) / 2; // center of Y to create a triangle for the details

      this.cx.moveTo(beginTriangle, yCenter); // mark the start point to draw the triangle with the same color of the bar
      this.cx.lineTo(beginTriangle + 10, yCenter - 10); // go from the middle to the top right doing something like /
      this.cx.lineTo(beginTriangle + 10, yCenter + 10); // go from top to down making something like |
      this.cx.fill(); // connect to the last point making \ and fill

      this.cx.fillStyle = '#000000'; // black color for text
      this.cx.font = '16px Arial'; // font for the text
      this.cx.fillText(this.listOfData[i].value, beginTriangle + 20, yCenter + 5); // random data, replace with your own
      this.cx.fillText(this.listOfData[i].description, beginTriangle + 80, yCenter + 5); // random data, replace with your own

      // update variables for next drawing
      cutted = sub;
      startAt = x3;
      finishAt = x2;
      startYAt = y2;
    }
  }

  // http://pneity.org/rgb-ole.html
  // credits to Tim
  calculateOLEColorToRGB(cor: string): string { 

    if (cor == null) {
      return '#ffffff';
    } else {
      let ole = +cor;

      let blu: any = Math.floor((ole / 65536) % 256);
      let grn: any = Math.floor((ole / 256) % 256);
      let red: any = Math.floor(ole % 256);

      blu = blu.toString(16);
      if (blu.length < 2) { blu = '0' + blu; }
      grn = grn.toString(16);
      if (grn.length < 2) { grn = '0' + grn; }
      red = red.toString(16);
      if (red.length < 2) { red = '0' + red; }

      var rgb = red.toString() + grn.toString() + blu.toString();

      return '#' + rgb;

    }
  }

}
