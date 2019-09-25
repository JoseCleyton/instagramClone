import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public atualizarPublicacao : boolean
  @ViewChild('publicacoes' , {static : false} ) public publicacoes : any

  constructor(private auth : Auth) { }

  ngOnInit() {}


  public sair(){
    console.log('Chegou aqui')
    this.auth.sair()
  }

  public atualizarTimelineHome(event){

    this.publicacoes.atualizarTimeLine()
    console.log('Chegamos ao upload concluído')
  }
}
