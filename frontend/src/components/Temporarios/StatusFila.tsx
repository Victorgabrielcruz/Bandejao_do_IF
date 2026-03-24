import Card from "../Card/Card";

const StatusFila = () =>{
    return (
    <Card title="Status da Fila">
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-8 border-green-500 flex items-center justify-center">
                72%
            </div>
            <p className="mt-2 text-sm">Tempo Médio: 14 min</p>
        </div>
    </Card>)
}

export default StatusFila;