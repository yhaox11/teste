-- Seleciona o banco de dados (Certifique-se de que ele já existe no PhpMyAdmin)
USE u596834755_lojafake;

-- Tabela para armazenar tokens de cartões criptografados (O Vault)
CREATE TABLE IF NOT EXISTS vault (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_email VARCHAR(255) NOT NULL,
    cc_last4 CHAR(4) NOT NULL,
    cc_hash TEXT NOT NULL, -- Dados criptografados
    brand VARCHAR(50) DEFAULT 'unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_uuid VARCHAR(50) NOT NULL,
    total_cents INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);