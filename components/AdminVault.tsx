import React, { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { VaultEntry } from '../types';
import { Shield, Eye, Lock, Download, Database, Wifi, WifiOff } from 'lucide-react';

export const AdminVault: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getVaultData().then(data => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Shield size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Cofre de Cartões</h2>
                    <div className="flex items-center gap-2 text-xs">
                        {api.isLive ? (
                            <span className="flex items-center gap-1 text-green-400"><Wifi size={12} /> Conectado (MySQL)</span>
                        ) : (
                            <span className="flex items-center gap-1 text-orange-400"><WifiOff size={12} /> Modo Simulação (Local)</span>
                        )}
                        <span className="text-gray-500">| AES-256-GCM</span>
                    </div>
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">Fechar</button>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Database size={16} /> Total Armazenado
                    </div>
                    <div className="text-2xl font-bold">{entries.length}</div>
                 </div>
                 <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Lock size={16} /> Criptografia
                    </div>
                    <div className="text-sm font-mono text-green-400">AES-256-GCM {api.isLive ? '(PHP)' : '(Mock)'}</div>
                 </div>
                 <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700 transition">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Download size={16} /> Exportar CSV
                    </div>
                    <div className="text-sm font-bold text-blue-400">Download Seguro</div>
                 </div>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Final</th>
                            <th className="p-4">Hash Criptografado (Vault)</th>
                            <th className="p-4">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Carregando vault...</td></tr>
                        ) : entries.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">
                                {api.isLive ? 'Nenhum dado encontrado no Banco de Dados.' : 'Nenhum cartão armazenado ainda. Faça uma compra!'}
                            </td></tr>
                        ) : (
                            entries.map(entry => (
                                <tr key={entry.id} className="hover:bg-gray-800/50 transition">
                                    <td className="p-4 font-mono text-xs text-gray-500">{entry.id}</td>
                                    <td className="p-4">{entry.customer_email}</td>
                                    <td className="p-4 font-bold">•••• {entry.cc_last4}</td>
                                    <td className="p-4">
                                        <div className="font-mono text-[10px] text-yellow-500 bg-yellow-500/10 p-1 rounded break-all max-w-[200px]">
                                            {entry.cc_hash}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400">{new Date(entry.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};