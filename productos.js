class Producto{
    productos=[];
    idProducto = 0;

    nuevoProducto(producto){
        this.productos.push({
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail,
            id:++this.idProducto
        });
        return(this.idProducto);
    }

    buscarId(id){
        if (this.productos[id]==undefined){
            return {error:"Producto no encontrado"}
        }
        return this.productos[id];
    }

    editarProducto(item){
        this.productos[item.id] = item
        return(item.id);
    }

    borrarProducto(id){
        this.productos = this.productos.filter((producto) => producto.id != id);
    }

    get listaProductos(){
        return this.productos;
    }
}

module.exports= new Producto;