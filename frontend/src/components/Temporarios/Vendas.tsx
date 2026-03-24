import Card from "../Card/Card";

const Vendas = () => (
  <Card title="Vendas de Tickets">
    <div className="h-40 flex items-end space-x-2">
      {[300, 200, 400, 350, 500].map((v, i) => (
        <div key={i} className="bg-green-500 w-6" style={{ height: v / 2 }} />
      ))}
    </div>
    <p className="mt-2 text-sm">Total Hoje: R$ 4.250,00</p>
  </Card>
);

export default Vendas;