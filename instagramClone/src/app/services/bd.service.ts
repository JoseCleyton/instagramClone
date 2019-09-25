import * as firebase from 'firebase'
import { ProgressoService } from "./progresso.service"
import { Injectable } from '@angular/core'

@Injectable()
export class BdService{
    constructor(private progressoService: ProgressoService){}

        public publicar(publicacao : any){

            
            firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo : publicacao.titulo})
            .then((reposta:any)=>{
                     let nomeImagem = reposta.key

                     // Insere uma imagem na Storage do Firebase utilizando o nome da imagem com key
                     // que foi retornada pela criacao do path com o titulo da publicacao

                     firebase.storage().ref()
                         .child(`imagens/${nomeImagem}`)
                             .put(publicacao.imagem)
                             .on(firebase.storage.TaskEvent.STATE_CHANGED,
                                 // acompanhamento do progresso do upload
                                    (snapshot : any) =>{ 
                                        this.progressoService.status = 'andamento'
                                        this.progressoService.estado = snapshot
                                    },
                                    (erro : any) =>{
                                        this.progressoService.status = 'erro'
                                    },
                                    // conclusão do upload
                                    ()=>{
                                        this.progressoService.status = 'concluido'
                                        }
                                 )

                    }) 
            

        /* firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push(
            {titulo : publicacao.titulo}
        )*/
        }

        public consultaPublicacoes(email : string): Promise<any>{
            let publicacoes : any = []
            return new Promise((resolve, reject)=>{
                // consultando todas os dados das publicacoes de acordo com o email do usuario
                firebase.database().ref(`publicacoes/${btoa(email)}`)
                //Ordenando pela key
                 .orderByKey()
                    // retorna um listens dos valores e tira um snapshot
                    .once('value')
                        .then((snapshot:any)=>{
                           
                            snapshot.forEach((childSnapshot:any)=>{

                                let publicacao = childSnapshot.val()
                                publicacao.key = childSnapshot.key

                                publicacoes.push(publicacao)
                                
                            })
                        return publicacoes.reverse()                      
                    })  
                    .then((publicacoes:any)=>{
                        // consultar a url da imagem (storage)
                        publicacoes.forEach((publicacao)=>{
                            firebase.storage().ref()
                                .child(`imagens/${publicacao.key}`)
                                    .getDownloadURL()
                                        .then((url:string)=>{   
        
                                            publicacao.url_imagem = url                                            
                                            
                                            // consultar o nome do usuario
                                            firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                            .once('value')
                                            .then((snapshot:any)=>{
                                                    publicacao.nome_usuario = snapshot.val().usuario.usuario 
                                                
                                                    
                                            })
                                        })
                        })
                        resolve(publicacoes)
                    })  
                    
                    
            })
            
        }


}