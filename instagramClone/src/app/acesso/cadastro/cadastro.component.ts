import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../model/usuario.model'
import { Auth } from '../../auth/auth.service'
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  
})
export class CadastroComponent implements OnInit {
  public estadoModal : boolean = false

@Output() public exibirPainel : EventEmitter<string> = new EventEmitter<string>()
public formulario : FormGroup = new FormGroup({
  
  'email' : new FormControl(null),
  'nomeCompleto': new FormControl(null),
  'usuario' : new FormControl(null),
  'senha' : new FormControl(null)
})
  constructor(private auth : Auth) { }

  ngOnInit() {
  }
  public exibirPainelLogin(){
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(){
    let usuario : Usuario = new Usuario(this.formulario.value.email,this.formulario.value.nomeCompleto,this.formulario.value.usuario,this.formulario.value.senha)
    this.auth.cadastrarUsuario(usuario)
    .then(( resposta : any ) => {
      this.exibirPainelLogin()
    })
    //console.log(usuario)
  }

}
