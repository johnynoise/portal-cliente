import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ou useSearchParams se token estiver na query
import axios from 'axios';

export default function RedefinirSenha() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/redefinir-senha', {
        token,
        novaSenha
      });

      setSucesso('Senha redefinida com sucesso. Você será redirecionado para o login.');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || 'Erro ao redefinir senha.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Redefinir Senha</h2>

        {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
        {sucesso && <div className="text-green-600 text-sm mb-2">{sucesso}</div>}

        <input
          type="password"
          placeholder="Nova senha"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar nova senha"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Redefinir Senha
        </button>
      </form>
    </div>
  );
}
