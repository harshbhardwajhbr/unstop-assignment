import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'unstop-app';

  numSeats: number = 1;

  seatMap = {
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'E': [],
    'F': [],
    'G': [],
    'H': [],
    'I': [],
    'J': [],
    'K': [],
    'L': []
  };

  seatKeys = [];
  bookedSeats = [];

  ngOnInit(): void {
    this.initSeats();
  }

  initSeats() {
    // Initialize seat map of 80 seats
    this.seatKeys = Object.keys(this.seatMap);

    this.seatKeys.forEach((key, index) => {
      if ((this.seatKeys.length - 1) === index) {
        // Last Row with 3 seats
        this.seatMap[key] = new Array(3).fill(0);
      } else {
        this.seatMap[key] = new Array(7).fill(0);
      }
    });
  }

  bookSeats(): void {
    this.bookedSeats = [];
    let seatsRemaining = this.numSeats || 0;
    let lastRowfirstSeat = -1;

    // Loop through all rows
    for (let i = 0; i < this.seatKeys.length; i++) {

      // Check if no seats remaining
      if(!seatsRemaining) {
        break;
      }

      // If First Seat booked in last row is in the first half of row or if no seat booked yet then start booking from 1st index
      if(lastRowfirstSeat < (this.seatMap[this.seatKeys[i]].length - 1)/2 || lastRowfirstSeat === -1) {
        
        // Reset the first seat booked index from last row
        lastRowfirstSeat = -1;
        
        for (let j = 0; j < this.seatMap[this.seatKeys[i]].length; j++) {
          if(!seatsRemaining) {
            break;
          }
  
          let seat = this.seatMap[this.seatKeys[i]][j];
          if(!seat) {
  
            if(lastRowfirstSeat === -1) lastRowfirstSeat = j;
  
            this.seatMap[this.seatKeys[i]][j] = 1;
            this.bookedSeats.push(this.seatKeys[i] + '-' + (j+1));
            seatsRemaining--;
          }
        }
      // If First Seat booked in last row is in the second half of row then start booking the seat in from last index
      } else {
        
        for (let j = this.seatMap[this.seatKeys[i]].length - 1; j > -1; j--) {
          if(!seatsRemaining) {
            break;
          }
  
          let seat = this.seatMap[this.seatKeys[i]][j];
          if(!seat) {
  
            if(lastRowfirstSeat === -1) lastRowfirstSeat = j;
  
            this.seatMap[this.seatKeys[i]][j] = 1;
            this.bookedSeats.push(this.seatKeys[i] + '-' + (j+1));
            seatsRemaining--;
          }
        }
      }
    }
  }
}
