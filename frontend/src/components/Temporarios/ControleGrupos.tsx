import Card from "../Card/Card";


const ControleGrupos = () => (
  <Card title="Controle de Grupos">
    <div className="flex items-center justify-between">
      <span className="text-5xl">10</span>
      <div className="space-x-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded">+</button>
        <button className="bg-gray-300 px-3 py-1 rounded">-</button>
      </div>
    </div>
    <p className="text-sm mt-2">Máximo: 15 | Ativos: 7</p>
  </Card>
);

export default ControleGrupos;