import { Sequelize, DataTypes }  from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './MayShop.sqlite'
});

const Articulo = db.define('Articulo', {
    denominacion: {
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precioBruto: {
        type: DataTypes.DECIMAL
    }, 
    novedad: {
        type: DataTypes.BOOLEAN
    }
});

const Marca = db.define('Marca', {
    nombre: {
        type: DataTypes.STRING
    }
});

const Familia = db.define('Familia', {
    nombre: {
        type: DataTypes.STRING
    }
});

const Foto = db.define('Foto', {
});

const Carrito = db.define('Carrito', {
    pedidoFirme: {
        type: DataTypes.BOOLEAN
    }
});

const DetalleCarrito = db.define('DetalleCarrito', {
    cantidad: {
        type: DataTypes.NUMBER
    },
    precioBruto: {
        type: DataTypes.NUMBER
    },
    IVA: {
        type: DataTypes.NUMBER
    },
    AticuloId: {
        type: DataTypes.INTEGER,
        references: {
          model: Articulo,
          key: 'id'
        }
    },
    CarritoId: {
        type: DataTypes.INTEGER,
        references: {
          model: Carrito,
          key: 'id'
        }
    }
});

Marca.hasMany(Articulo)
Articulo.belongsTo(Marca)

Articulo.belongsToMany(Familia, {through: "ArticuloFamilia"})
Familia.belongsToMany(Articulo, {through: "ArticuloFamilia"})

Articulo.belongsToMany(Foto, {through: "ArticuloFoto"})
Foto.belongsToMany(Articulo, {through: "ArticuloFoto"})

Articulo.belongsToMany(Carrito, { through: DetalleCarrito });
Carrito.belongsToMany(Articulo, { through: DetalleCarrito });

await db.sync({ alter: true })