import { Component, OnInit , EventEmitter, Output } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms'
import { Auth } from '../../auth/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel : EventEmitter <string> = new EventEmitter <string> ()

  public formularioLogin : FormGroup = new FormGroup({
    'email' : new FormControl(null),
    'senha' : new FormControl(null)
  })
  constructor(private auth : Auth ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro():void{
    this.exibirPainel.emit('cadastro')
  }

  public validarLogin(){
    this.auth.autenticar(this.formularioLogin.value.email , this.formularioLogin.value.senha)
  }
}
