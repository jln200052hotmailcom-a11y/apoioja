import React, { useState } from 'react';

const ReportPage: React.FC = () => {
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const clearFields = () => {
        setCategory('');
        setLocation('');
        setDescription('');
        setMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!category || !location || !description) {
            setMessage({ text: 'Por favor, preencha todos os campos.', type: 'error' });
            return;
        }

        setMessage({ text: 'Enviando denúncia...', type: 'info' });
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log({ category, location, description });
        setMessage({ text: '✅ Denúncia registrada com sucesso! Seu relato é anônimo e protegido.', type: 'success' });
        
        // Don't call clearFields() to allow user to see their submission data
        // Reset form after a delay
        setTimeout(() => {
            clearFields();
        }, 5000);
    };

    return (
        <div className="py-10 px-4 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-3xl w-full">
                <img src="/apoioja-banner.png" alt="Banner ApoioJá" className="w-full h-40 object-cover rounded-lg mb-6"/>
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Registrar Denúncia</h2>
                <p className="text-center text-gray-500 mb-8">Seu relato é totalmente anônimo e protegido.</p>
                
                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="form-group">
                            <label htmlFor="categoria" className="block text-lg font-medium text-gray-700 mb-2">Categoria</label>
                            <input type="text" id="categoria" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ex: Assédio, Agressão, Discriminação" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="local" className="block text-lg font-medium text-gray-700 mb-2">Local do Ocorrido</label>
                            <input type="text" id="local" value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: Residência, trabalho, online..." required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                        </div>
                        <div className="form-group">
                            {/* Fix: Corrected typo in closing tag from </slabel> to </label> */}
                            <label htmlFor="descricao" className="block text-lg font-medium text-gray-700 mb-2">Descrição Detalhada</label>
                            <textarea id="descricao" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descreva o ocorrido com o máximo de detalhes possível..." required rows={6} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
                        </div>
                        <div className="actions grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-md col-span-1 sm:col-span-3">
                                📨 Enviar Denúncia
                            </button>
                            <button type="button" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition" onClick={clearFields}>
                                🧹 Limpar Campos
                            </button>
                            <button type="button" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition col-span-1 sm:col-span-2" onClick={() => setIsFormVisible(!isFormVisible)}>
                                {isFormVisible ? '🙈 Esconder Formulário' : '🙉 Mostrar Formulário'}
                            </button>
                        </div>
                    </form>
                )}
                
                {message && (
                    <p className={`text-center font-semibold mt-6 p-3 rounded-lg ${
                        message.type === 'success' ? 'bg-green-100 text-green-800' :
                        message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`} role="status">
                        {message.text}
                    </p>
                )}

                <div className="map-container bg-gray-50 rounded-lg p-6 mt-10 border border-gray-200">
                    <h3 className="text-xl font-bold text-center text-blue-600 mb-4">🗺️ Encontre Apoio Próximo</h3>
                    <p className="text-center text-gray-600 mb-4">Para emergências, ligue 190. Abaixo um mapa ilustrativo de locais de apoio.</p>
                    <img src="/mapa-mock.png" alt="Mapa Simulado de delegacias e pontos de apoio" className="w-full rounded-lg shadow-md"/>
                    <p className="text-center text-sm text-gray-500 mt-3">Mapa apenas ilustrativo. Integração com serviços de localização em desenvolvimento.</p>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;