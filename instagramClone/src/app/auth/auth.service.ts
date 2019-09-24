import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router' 
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';

@Injectable()
export class Auth{

    public token_id : string

    constructor(private router : Router){}

    public cadastrarUsuario(usuario : Usuario):Promise<any>{

       return firebase.auth().createUserWithEmailAndPassword(usuario.email,usuario.senha)
        .then(( resposta ) => {

            // remover o atributo senha
            delete usuario.senha

            // registrando dados do usuario criptografando para base64 com o metodo btoa() retirando os dados com caracteres especiais
            // usar o metodo atb() para descriptografar e colocar de volta os caracteres especiais
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set({
                    usuario
                })
           
        })
        .catch(( erro ) => console.log('Erro na criação de usuário ' + erro))

    }
    public autenticar(email : string , senha : string){
        console.log('Email: ' +email + 'Senha: ' +senha)
        firebase.auth().signInWithEmailAndPassword(email , senha)
        .then( (resposta : any )=> {
            firebase.auth().currentUser.getIdToken()
            .then( (idToken : string ) =>{
                this.token_id = idToken;
                localStorage.setItem('idToken', idToken)
                this.router.navigate(['home'])
            })
        })
        .catch( (erro :any ) => console.log (erro))
    }

    public autenticado(): boolean{
        if(this.token_id === undefined && localStorage.getItem('idToken') === null){
            this.router.navigate([''])
            return false
        }else{
            return true      
        }
    }

    public sair(){
        firebase.auth().signOut()
        .then(()=>{
            console.log(localStorage.getItem('idToken'))
            localStorage.removeItem('idToken')
            this.token_id = undefined
            this.router.navigate([''])
        })
    }
}