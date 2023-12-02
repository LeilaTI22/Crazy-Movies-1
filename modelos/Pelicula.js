class Pelicula {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.titulo = data.titulo;
        this.duracion = data.duracion;
        this.productora = data.productora;
        this.foto = data.foto;
    }

    set id(id) {
        if (id != null){
            id.length > 0 ? this._id = id : this.bandera = 1;
        }
    }
    set titulo(titulo) {
        titulo.length > 0 ? this._titulo = titulo : this.bandera = 1;
    }
    set duracion(duracion) {
        duracion.length > 0 ? this._duracion = duracion : this.bandera = 1;
    }
    set productora(productora) {
        productora.length > 0 ? this._productora = productora : this.bandera = 1;
    }
    set foto(foto) {
        foto.length > 0 ? this._foto = foto : this.bandera = 1;
    }

    get id() {
        return this._id;
    }
    get titulo() {
        return this._titulo;
    }
    get duracion() {
        return this._duracion;
    }
    get productora() {
        return this._productora;
    }

    get foto() {
        return this._foto;
    }

    get obtenerPelicula() {
        if (this._id != null)
            return {
                id: this.id,
                titulo: this.titulo,
                duracion: this.duracion,
                productora: this.productora,
                foto: this.foto
            }
        else
            return {
                titulo: this.titulo,
                duracion: this.duracion,
                productora: this.productora,
                foto: this.foto
            }
    }
}
module.exports = Pelicula;
