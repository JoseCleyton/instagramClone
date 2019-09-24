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


}