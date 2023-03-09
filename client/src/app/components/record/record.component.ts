import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game/game';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-games-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  gamesRecord: Game[] = [];
  errorMessage = '';

  constructor(private recordService:RecordService){}

  ngOnInit(): void {
    this.recordService.getRecord().subscribe({
      next: data => {
        console.log('data', data);
        data.forEach((game: any) => { 
          this.gamesRecord.push(new Game(game.id, game.map_name,game.map_img, game.score, game.datetime, game.users));
        });
      console.log(this.gamesRecord);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }

}
