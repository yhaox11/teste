import { VaultEntry } from '../types';

// ==========================================
// CONFIGURAÇÃO DA API
// ==========================================
// Ativado para conectar com o banco de dados PHP/MySQL
const USE_LIVE_API = true; 

// URL do seu backend PHP.
// Usamos caminho relativo ('/api/index.php') para funcionar automaticamente na Hostinger
// quando o frontend e o backend estão no mesmo domínio.
const API_BASE_URL = '/api/index.php'; 
// ==========================================

// Simulate a database delay for mock mode
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated encryption (In real app: AES-256-GCM on backend)
const mockEncrypt = (data: string) => {
  return `enc_${btoa(data).substring(0, 10)}...${Math.random().toString(36).substring(7)}`;
};

// --- MOCK IMPLEMENTATION (Simulação Local) ---
const mockApiImpl = {
  calculateShipping: async (cep: string) => {
    await delay(600);
    if (cep.startsWith('0') || cep.startsWith('1')) return 990;
    return 1990;
  },

  processCardPayment: async (cardData: { number: string; holder: string; expiry: string }, amount: number) => {
    await delay(1500);
    const isApproved = Math.random() < 0.95;

    if (!isApproved) {
      throw new Error("Transação negada pelo banco emissor.");
    }

    const vaultEntry: VaultEntry = {
      id: `vault_${Date.now()}`,
      customer_email: 'cliente@exemplo.com',
      cc_last4: cardData.number.slice(-4),
      cc_hash: mockEncrypt(cardData.number),
      brand: 'mastercard',
      created_at: new Date().toISOString()
    };

    const existingVault = JSON.parse(localStorage.getItem('market_vault') || '[]');
    localStorage.setItem('market_vault', JSON.stringify([vaultEntry, ...existingVault]));

    return {
      status: 'approved',
      orderId: `ORD-${Date.now()}`,
      txId: `tx_${Math.random().toString(36).substring(2)}`
    };
  },

  generatePix: async () => {
    await delay(400);
    return {
      code: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913MarketplaceAgil6008Brasilia62070503***6304E2CA",
      expiresAt: Date.now() + 5 * 60 * 1000,
      orderId: `ORD-${Date.now()}`
    };
  },

  getVaultData: async (): Promise<VaultEntry[]> => {
    await delay(200);
    return JSON.parse(localStorage.getItem('market_vault') || '[]');
  },

  isLive: false
};

// --- LIVE IMPLEMENTATION (PHP/MySQL) ---
const liveApiImpl = {
  calculateShipping: async (cep: string) => {
    // Shipping logic usually remains roughly same or calls API
    if (cep.startsWith('0') || cep.startsWith('1')) return 990;
    return 1990;
  },

  processCardPayment: async (cardData: { number: string; holder: string; expiry: string }, amount: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}?action=checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'CREDIT_CARD',
                amount: amount,
                card_number: cardData.number,
                card_holder: cardData.holder,
                card_expiry: cardData.expiry
            })
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Erro no pagamento');
        return { status: 'approved', orderId: data.order_id, txId: data.tx_id };
    } catch (e) {
        console.error("API Error:", e);
        throw new Error("Erro de conexão com o servidor de pagamento.");
    }
  },

  generatePix: async () => {
     try {
        const response = await fetch(`${API_BASE_URL}?action=checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'PIX', amount: 100 }) // Amount simplified
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        
        return {
            code: data.pix_code,
            expiresAt: Date.now() + 300000,
            orderId: data.order_id
        };
     } catch (e) {
         console.error(e);
         throw new Error("Erro ao gerar Pix no servidor.");
     }
  },

  getVaultData: async (): Promise<VaultEntry[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}?action=vault`);
        const data = await response.json();
        return data.data || [];
    } catch (e) {
        console.error("Vault Error:", e);
        return [];
    }
  },

  isLive: true
};

// Export based on config
export const api = USE_LIVE_API ? liveApiImpl : mockApiImpl;