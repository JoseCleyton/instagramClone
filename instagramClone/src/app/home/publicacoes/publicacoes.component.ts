import { Component, OnInit, Input } from '@angular/core';
import { BdService }  from '../../services/bd.service'
import * as firebase from 'firebase'
@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  public email : string
  public publicacoes : any = []
 @Input() public atualizarPublicacao : boolean

  constructor(private bdService : BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
      this.atualizarTimeLine()
    })
  }

  public atualizarTimeLine(){
   this.bdService.consultaPublicacoes(this.email)
   .then((publicacoes : any[])=>{
     this.publicacoes = publicacoes
   })
  }
}
