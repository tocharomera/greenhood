// Creamos un modelo USUARIO

export class UsuarioModel {
  private nombre: string;
  private apellido: string;
  private email: string;
  private pass: string;
  private pais: string;
  private ciudad: string;
  private calle: string;
  private numero: number;
  private piso: number;
  private letra: string;
  private cp: number;
  private productor: boolean;
  private comprador: boolean;
  private id: number;

  constructor( nombre?: string, apellido?: string, email?: string, pass?: string,
                pais?: string, ciudad?: string, calle?: string, numero?: number, piso?: number,
                letra?: string, cp?: number, productor?: boolean, comprador?: boolean, id?: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.pass = pass;
    this.pais = pais;
    this.ciudad = ciudad;
    this.calle = calle;
    this.numero = numero;
    this.letra = letra;
    this.cp = cp;
    this.productor = productor;
    this.comprador = comprador;
                }

  public get $nombre(): string {
    return this.nombre;
  }

  public set $nombre(value: string) {
    this.nombre = value;
  }

  public get $apellido(): string {
    return this.apellido;
  }

  public set $apellido(value: string) {
    this.apellido = value;
  }

  public get $email(): string {
    return this.email;
  }

  public set $email(value: string) {
    this.email = value;
  }

  public get $pass(): string {
    return this.pass;
  }

  public set $pass(value: string) {
    this.pass = value;
  }

  public get $pais(): string {
    return this.pais;
  }

  public set $pais(value: string) {
    this.pais = value;
  }

  public get $ciudad(): string {
    return this.ciudad;
  }

  public set $ciudad(value: string) {
    this.ciudad = value;
  }

  public get $calle(): string {
    return this.calle;
  }

  public set $calle(value: string) {
    this.calle = value;
  }

  public get $numero(): number {
    return this.numero;
  }

  public set $numero(value: number) {
    this.numero = value;
  }

  public get $piso(): number {
    return this.piso;
  }

  public set $piso(value: number) {
    this.piso = value;
  }


  public get $letra(): string {
    return this.letra;
  }

  public set $letra(value: string) {
    this.letra = value;
  }

  public get $cp(): number {
    return this.cp;
  }

  public set $cp(value: number) {
    this.cp = value;
  }

  public get $productor(): boolean {
    return this.productor;
  }

  public set $productor(value: boolean) {
    this.productor = value;
  }

  public get $comprador(): boolean {
    return this.comprador;
  }

  public set $comprador(value: boolean) {
    this.comprador = value;
  }

  public get $id(): number {
    return this.id;
  }

  public set $id(value: number) {
    this.id = value;
  }


}
