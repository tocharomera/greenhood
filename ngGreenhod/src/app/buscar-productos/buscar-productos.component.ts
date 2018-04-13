import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Map, Marker, circleMarker } from 'leaflet';
import { AlmacenDAOService } from '../almacen/almacen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {
  mapready: boolean;
  search: any;
  productos: any;
  f = false;
  v = false;
  loc: any;
  req = '';
  prods: any;
  markers: any;
  map: Map;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    zoom: 14,
    center: latLng(40.4113, -3.6954)
  };
  constructor(
    private mapsrv: MapService,
    public srv: AlmacenDAOService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  vbool() {
    this.v = !this.v;
  }
  fbool() {
    this.f = !this.f;
  }
  navigate(producto) {
    this.router.navigate(['/perfilproductor', producto.idProductor]);
  }
  categoria(categ) {
    if (this.v === true && this.f === false && !categ) {
      this.req = '?Categoria=verduras';
    } else if (this.f === true && this.v === false && !categ) {
      this.req = '?Categoria=frutas';
    } else if (this.f === true && this.v === true) {
      this.req = '?_search=';
    } else if (this.v === false && this.f === false && !categ) {
      this.productos = null;
      this.req = null;
    } else if (this.v === true && this.f === false && categ) {
      this.req = '?Categoria=verduras&_search=' + categ;
    } else if (this.v === false && this.f === true && categ) {
      this.req = '?Categoria=frutas&_search=' + categ;
    } else if (this.v === false && this.f === false && categ) {
      this.req = '?_search=' + categ;
    }

    if (this.req !== null) {
      this.srv.get(this.req).subscribe(res => {
        this.productos = res;
      });
    }
  }
  onSubmit(f) {
    this.categoria(f.value.busqueda);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.map.setView(
          [position.coords.latitude, position.coords.longitude],
          14
        );
        this.loc = circleMarker(
          [position.coords.latitude, position.coords.longitude],
          {
            opacity: 0.5,
            fill: true,
            fillOpacity: 0.7,
            weight: 12,
            radius: 7
          }
        );
        this.loc.bindPopup('Estas aquí!').addTo(this.map);
      });
    }
  }
  getproductores() {
    this.mapsrv.getProds();
    this.mapsrv.currentMarker$.subscribe(marker => {
      this.markers = marker;
      if (this.markers && this.markers.array) {
        this.markers.array.forEach(markers => {
          this.map.addLayer(markers);
        });
      } else {
        this.map.addLayer(marker);
      }
    });
  }

  onMapReady(map: Map) {
    tileLayer(
      'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
      {
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 18,
        ext: 'png'
      }
    ).addTo(map);
    tileLayer(
      'https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png',
      {
        maxZoom: 18
      }
    ).addTo(map);
    this.mapready = true;
    this.map = map;
    this.getproductores();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.search = params['id']; // (+) converts string 'id' to a number
        this.categoria(this.search);
      }
      // In a real app: dispatch action to load the details here.
    });
  }
}
