

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
        <p className="text-gray-500">Bem-vindo ao sistema de gestão do restaurante.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Exemplo de Cards de Estatística */}
        <div className="h-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
            <span className="text-gray-500 text-sm">Fila Atual</span>
            <span className="text-3xl font-bold text-if-green">42 pessoas</span>
        </div>
        <div className="h-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
            <span className="text-gray-500 text-sm">Refeições Hoje</span>
            <span className="text-3xl font-bold text-gray-800">156</span>
        </div>
        {/* Adicione mais conforme necessário */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Gráfico de Fluxo</h3>
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Espaço para Gráfico de Relatórios]
          </div>
        </div>
        <div className="h-96 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Cardápio do Dia</h3>
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Lista de Itens do Cardápio]
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;