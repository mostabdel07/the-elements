import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Developer } from 'src/app/models/developer/developer';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  developers!: Developer[];
  newDeveloper!:Developer;
  description!:string;
  showDiv:boolean = false;
  showAddDiv:boolean = false;
  selected_id!:any;
  name!:string;
  new_description!:string
  image!:string;

  webDevelopers!:Developer[];

  updateForm = new FormGroup({
    description: new FormControl('')
  })

  addForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
    new_description: new FormControl('',[
      Validators.required
    ]),
    image: new FormControl('',[
      Validators.required
    ]),
    type: new FormControl('')
  })
  



  constructor(private developerService:DeveloperService) {

  }

  ngOnInit(): void {
    this.developers = [];
    this.webDevelopers = [];
    this.name = '',
    this.new_description = '';
    this.image = '';
    
   this.developerService.getDeveloperBoard().subscribe({
      next: (data:any) =>{
        this.developers = data;             
        this.webDevelopers =this.developers.filter(dev => dev.type == 'web')
        console.log(this.webDevelopers);      
      }
    });
  }
  /**
   * Function to update a web developer description
   * @param id 
   */
  updateDescription(dev:any){
    this.description = this.updateForm.value.description!;// lo que se ha puesto en el input   
    this.developerService.updateDescription(dev.id, this.description).subscribe({
      next: data => {
        dev.description = this.description;
        this.showDiv = false;
      }, error: err =>{
        this.description = 'No se ha podido actualizar la descripción';
        console.log(err);
      }
    });
  
  }

  /**
   * Function to show update form
   * @param id 
   */
  displayForm(id:any){
    this.showAddDiv = false
    this.selected_id = id;
    if (this.selected_id !== 0) {
      this.showDiv = true
    } else {
      this.showDiv = false
    }
  }

  /**
   * Function to show add form
   * @param id 
   */
  displayAddForm(id:any){
    this.showDiv = false
    this.selected_id = id;
    if (this.selected_id !== 0) {
      this.showAddDiv = true
    } else {
      this.showAddDiv = false
    }
  }

  closeForm(){
    this.selected_id = 0;
  }

  /**
   * Function to add a new web developer
   */
  addWebDeveloper(){
    console.log(this.developers.length);//7
    let id = this.developers.length + 1;
    this.newDeveloper = new Developer(
      id,
      this.addForm.value.name!,
      this.addForm.value.new_description!,
      `/images/devs/${this.addForm.value.image}.jpg`,
    )
    console.log(this.newDeveloper);
    this.developerService.addDeveloper(this.newDeveloper).subscribe({
      next: data => {
        this.webDevelopers.push(this.newDeveloper)
        this.showAddDiv = false
      }, error: err => {
        console.log('no se ha añadido correctamente');
      }
    })
  }

  deleteDeveloper(id:any){
    console.log(id);
    this.developerService.deleteDeveloper(id).subscribe({
      next: data =>{
      
        const aux_developers = this.webDevelopers.filter(dev =>{
          return dev.id !== id;
        })

        this.webDevelopers = aux_developers;
      },
      error: err =>{
        console.log('no se ha podido eliminar');
      }
    })
  }
  

}
