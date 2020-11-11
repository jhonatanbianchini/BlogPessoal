  
import { environment } from './../../environments/environment.prod'
import { Router } from '@angular/router'
import { AlertasService } from './../service/alertas.service'
import { TemaService } from './../service/tema.service'
import { PostagemService } from './../service/postagem.service'
import { Postagem } from './../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]
  titulo: string

  tema: Tema = new Tema() 
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alerta: AlertasService,
    private router: Router
  ) { }

  ngOnInit(){

    

    window.scroll(0, 0)

    this.findAllPostagens()
    this.findAllTemas()
    
    
    
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    if(this.postagem.titulo == null || this.postagem.texto == null || this.postagem.tema == null)
    {
    alert('Preencha todos os campos antes de publicar!')
  } else {
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.postagem = new Postagem()
      alert('Postagem realizada com sucesso!')
      this.findAllPostagens()
    })
  }
  }
  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })

  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp;
    })

  }

}


