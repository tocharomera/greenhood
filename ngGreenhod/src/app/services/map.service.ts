import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Control, LatLng, icon, Marker } from 'leaflet';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AlmacenDAOService } from '../almacen/almacen.service';
@Injectable()
export class MapService {
  protected baseUrl = environment.WSURL + 'usuariosGreen';
  protected options = { withCredentials: true };
  usuarios: any;
  markers: any;
  prods: any;
  constructor(private http: HttpClient, private prodserv: AlmacenDAOService) {}
  sombrero = icon({
    iconUrl: 'assets/img/Straw_Hat.png',
    iconSize: [45, 45], // size of the icon
    iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -6] // point from which the popup should open relative to the iconAnchor
  });
  private _currentmarkers = new ReplaySubject<any>();

  setMarker(marker: any) {
    this._currentmarkers.next(marker);
  }

  get currentMarker$() {
    return this._currentmarkers.asObservable();
  }
  get(id: number | string) {
    return this.http.get(this.baseUrl + '/' + id, this.options);
  }
  getLocation(term: string): Promise<any> {
    return this.http
      .get(
        'http://dev.virtualearth.net/REST/v1/Locations?query=' +
          encodeURI(term) +
          '&key=AqaAevBNYDzufHWGAFmRZ1HFAVyCtFPVz0YpVwdyCU6QdKjwsaL-EvPFmGonEBR4'
      )
      .toPromise()
      .then(response => {
        // Promise.resolve(response);
        return response;
      })
      .catch(error => Promise.resolve(error));
  }

  markertomap(latlng, usuario) {
    if (usuario.productor === true) {
      let productos;
      const marker = new Marker(latlng, {
        icon: this.sombrero,
        draggable: false, // Make the icon dragable
        title: usuario.nombre, // Add a title
        opacity: 1
      });
      this.prodserv.query().subscribe(res => {
        this.prods = res;
        productos = this.prods.filter(prod =>
          prod.idProductor.toUpperCase().startsWith(usuario.email.toUpperCase())
        );

        let popup;
        const productosName = productos.map(producto => producto.Producto);
        if (productosName.length > 0) {
          popup =
            '</a><br>Productos:<ul style=" list-style-type: none;" id="markertemplate">' +
            '<li >' +
            productosName +
            ' </li>' +
            '</ul>';
        } else {
          popup = '';
        }

        marker.bindPopup(
          'Productor: ' +
            '<a href="http://localhost:4200/perfilproductor/' +

            usuario.email +
            '">' +
            usuario.nombre +
            '</a>' +
            popup
        );
        this.setMarker(marker);
      });
    }
  }
  getProds() {
    this.get('').subscribe(res => {
      this.usuarios = res;

      this.usuarios.forEach(usuario => {
        const address =
          'Calle ' +
          usuario.calle +
          ' ' +
          usuario.numero +
          ',' +
          usuario.ciudad +
          ' ' +
          usuario.cp +
          ', Spain';
        let latlng;
        this.getLocation(address)
          .then(response => {
            latlng = new LatLng(
              response.resourceSets[0].resources[0].geocodePoints[0].coordinates[0],
              response.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
            );
            this.markertomap(latlng, usuario);
          })
          .catch(error => console.error(error));
        // return this.markertomap(latlng, usuario);
        // markertomap(latitude, longitude, usuario);
      });
    });
  }
}
