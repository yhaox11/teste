<?php
// Configuração do CORS (Permitir acesso do React rodando em outra porta ou domínio)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==========================================
// CONFIGURAÇÃO DO BANCO DE DADOS
// ==========================================
$host = 'localhost'; // Na Hostinger, geralmente é 'localhost'
$db   = 'u596834755_lojafake';
$user = 'u596834755_lojafake';
$pass = 'Jg@12101980';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Retorna erro JSON se falhar a conexão
    echo json_encode(['success' => false, 'message' => 'Erro de conexão com BD: ' . $e->getMessage()]);
    exit();
}

// Roteamento Simples
$action = $_GET['action'] ?? '';

// Função de Criptografia Simulada
// Em produção, utilize bibliotecas reais de criptografia do PHP (openssl)
function encryptData($data) {
    return "enc_aes256_" . base64_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'checkout') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $type = $input['type'] ?? 'CREDIT_CARD';
    $amount = $input['amount'] ?? 0;
    
    if ($type === 'CREDIT_CARD') {
        $cardNumber = $input['card_number'];
        $cardHolder = $input['card_holder'];
        
        // 1. Simular processamento gateway (Sempre aprova para teste)
        $approved = true; 
        
        if ($approved) {
            // 2. Salvar no Vault (Criptografado)
            $last4 = substr($cardNumber, -4);
            $hash = encryptData($cardNumber); // Criptografa o cartão
            
            // Usamos prepared statements para segurança contra SQL Injection
            $stmt = $pdo->prepare("INSERT INTO vault (customer_email, cc_last4, cc_hash, brand) VALUES (?, ?, ?, ?)");
            $stmt->execute(['cliente@exemplo.com', $last4, $hash, 'mastercard']);
            
            // 3. Criar Pedido
            $orderId = 'ORD-' . time();
            $stmtOrder = $pdo->prepare("INSERT INTO orders (order_uuid, total_cents, payment_method, status) VALUES (?, ?, ?, ?)");
            $stmtOrder->execute([$orderId, $amount * 100, 'CREDIT_CARD', 'approved']);
            
            echo json_encode([
                'success' => true, 
                'order_id' => $orderId,
                'tx_id' => uniqid('tx_')
            ]);
        }
    } elseif ($type === 'PIX') {
        // Gera Pix Simulado
        $orderId = 'ORD-PIX-' . time();
        $stmtOrder = $pdo->prepare("INSERT INTO orders (order_uuid, total_cents, payment_method, status) VALUES (?, ?, ?, ?)");
        $stmtOrder->execute([$orderId, 10000, 'PIX', 'pending']);

        echo json_encode([
            'success' => true,
            'pix_code' => '00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913MarketplaceAgil6008Brasilia62070503***6304E2CA',
            'order_id' => $orderId
        ]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'vault') {
    // Retorna dados do cofre para o Admin
    $stmt = $pdo->query("SELECT * FROM vault ORDER BY created_at DESC");
    $data = $stmt->fetchAll();
    
    echo json_encode(['success' => true, 'data' => $data]);

} else {
    echo json_encode(['success' => false, 'message' => 'Endpoint desconhecido']);
}
?>