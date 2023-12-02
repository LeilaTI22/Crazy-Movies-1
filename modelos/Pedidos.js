class Pedidos {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.peliculaId = data.peliculaId;
        this.peliculaTitulo = data.peliculaTitulo;
    }

    set id(id) {
        if (id != null){
            id.length > 0 ? this._id = id : this.bandera = 1;
        }
    }
    set peliculaId(peliculaId) {
        peliculaId.length > 0 ? this._peliculaId = peliculaId : this.bandera = 1;
    }
    set peliculaTitulo(peliculaTitulo) {
            peliculaTitulo.length > 0 ? this._peliculaTitulo = peliculaTitulo : this.bandera = 1;
        }
    get id() {
        return this._id;
    }
    get peliculaId() {
        return this._peliculaId;
    }
    get peliculaTitulo() {
            return this._peliculaTitulo;
        }
    get obtenerPedido() {
        if (this._id != null)
            return {
                id: this.id,
                peliculaId: this.peliculaId,
                peliculaTitulo: this.peliculaTitulo,
            }
        else
            return {
                peliculaId: this.peliculaId,
                peliculaTitulo: this.peliculaTitulo,
            }
    }
}

module.exports = Pedidos;