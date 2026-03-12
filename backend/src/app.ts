import express  from "express"; 
import cors from "cors";
//app Express
const app = express();

//Configurações do CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

//Configurações para receber JSON
app.use(express.json());


//Endopoint raiz
app.get("/", (req, res) => {
    res.send("Ta rodando Porra !");
});
//rotas
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint não encontrado" });
});

export default app;