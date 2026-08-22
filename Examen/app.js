const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const Arreglolibros = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        anioPublicacion: 1967,
        estado: "disponible"
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        anioPublicacion: 1949,
        estado: "daniado"
    },
    {
        id: 3,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        anioPublicacion: 1943,
        estado: "Reservado"
    },
    {
        id: 4,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        anioPublicacion: 1605,
        estado: "Prestado"
    },
    {
        id: 5,
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J. K. Rowling",
        anioPublicacion: 1997,
        estado: "disponible"
    }
];

app.get("/api/libros", (req, res) => {
    res.status(200).json({ status: 200, message: "Lista de libros", data: Arreglolibros});
});

app.post("/api/libros", (req, res) => {
    const { titulo, autor, anioPublicacion, estado } = req.body;

    if (!titulo || !autor || !anioPublicacion || !estado) {
        return res.status(400).json({ status: 400, message: "Favor llene los datos", });
    }

    const estadosValidos = ["disponible", "prestado", "reservado", "dañado"];

    //AGRUEGUE VALIDACION DE LOS ESTADOS
    if(!estadosValidos.includes(estado.toLowerCase())){
        return res.status(400).json({status: 400, message: "Error, los estados permitidos son: disponible, prestado, reservado, dañado"})
    }

    const nuevoId = Arreglolibros.length > 0 ? Arreglolibros[Arreglolibros.length - 1].id + 1 : 1;
    const nuevoLibro = { id: nuevoId, titulo, autor, anioPublicacion, estado: estado.toLowerCase() };

    //CORREGI EL  200 X 201
    Arreglolibros.push(nuevoLibro);
    res.status(201).json({ status: 201, message: "Exito, libro agregado", data: nuevoLibro });
})

app.put("/api/libros/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const datos = req.body;

    const libro = Arreglolibros.find(libro => libro.id === idBuscado);

    if (!libro) {
        return res.status(404).json({ status: 404, message: "Error libro no encontrado" })
    };

    if (datos.titulo) { libro.titulo = datos.titulo };
    if (datos.autor) { libro.autor = datos.autor };
    if (datos.anioPublicacion) { libro.anioPublicacion = datos.anioPublicacion };
    if (datos.estado) { libro.estado = datos.estado };

    res.status(200).json({ status: 200, message: "Exito", data: libro })
})


app.listen(PORT, () => {
    console.log(`Servidor en puerto http://localhost:${PORT}`);
});