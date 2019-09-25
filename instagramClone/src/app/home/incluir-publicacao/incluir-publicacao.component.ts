import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from '../../services/bd.service'
import * as firebase from 'firebase'
import { ProgressoService } from 'src/app/services/progresso.service';
import { Observable, Subject} from 'rxjs';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
  public email : string
  public imagem : any
  public progressoPublicacao : string = 'pendente'
  public porcentagemUpload : number
  @Output() public atualizarTimeline : EventEmitter<any> = new EventEmitter<any>()

 public formularioIncluirPublicacao : FormGroup = new FormGroup({
   'titulo' : new FormControl(null)
 })
  constructor(private bdService : BdService , private progressoService : ProgressoService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( (user) => {
      console.log(user.email)
      this.email = user.email
    })    
  }


  public publicar(){
    this.bdService.publicar({
      email: this.email,
      titulo: this.formularioIncluirPublicacao.value.titulo,
      imagem : this.imagem[0]
    })
    
    let acompanhamentoUpload = interval(1500)
    let continua = new Subject()
    continua.next(true)

    acompanhamentoUpload.pipe(
      takeUntil(continua)
    )
    .subscribe( ()=>{
      
      this.progressoPublicacao = 'andamento'
      this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100)

      if(this.progressoService.status === 'concluido'){
        this.progressoPublicacao = 'concluido'
        this.atualizarTimeline.emit('uploadConcluido')
        continua.next(false)
      }
    })
    
  }

  public preparaImagemUpload (event : Event){
    this.imagem = (<HTMLInputElement>event.target).files
  }

  public publicacaoRealizadaComSucesso(){
    this.progressoPublicacao = 'pendente'
    this.porcentagemUpload = 0
  }
}
