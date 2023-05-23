import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation, Position } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  Map!: GoogleMap;

  constructor() {}
  ionViewWillEnter(){ // serve para criar o mapa toda vez que a pagina é regarregada
    this.createMap();
  }
//metodo de criação do mapa
  async createMap() {
    this.Map = await GoogleMap.create({ 
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey, // alterar o codigo para chamar a key colocado no environment
      config: {
        center: { // usado para configurar a posição inicial do mapa
          lat: -22.48888029419693,
          lng: -48.551984281338605,
          

        },
        zoom: 25,
      },
    });
    this.buscarPosicao(); 
  }
  
  async buscarPosicao(){
    const coordinates = await Geolocation.getCurrentPosition(); //getCurrent serve para pegar a posição atual
    this.forcarMapa(coordinates);
    console.log('Current position:', coordinates);
  }

  forcarMapa(coordinates: Position){
    this.Map.setCamera({  // serve para setar onde e como será a inicialização do mapa, cordenadas pegas pelo getCurrent
      coordinate:{
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
      zoom: 18,
      animate: true,
    });
    this.adiconarMarcador(coordinates);
  }
  async adiconarMarcador(coordinates: Position){ // adiciona um marcador nas cordenadas obtidas pelo GET
    const markerId = await this.Map.addMarker({
      coordinate:{
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      }
    });
  }
}
