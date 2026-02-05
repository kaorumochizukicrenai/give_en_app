<?php
require __DIR__ . '/db.php';

session_start();

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    jsonResponse(['success' => false, 'message' => 'invalid_payload'], 400);
}

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$token = isset($data['expoToken']) ? preg_replace('/[^a-zA-Z0-9]/', '', $data['expoToken']) : '';

if ($email === '' || $password === '') {
    jsonResponse(['success' => false, 'message' => 'missing_credentials'], 400);
}

try {
    $pdo = getDbConnection();
    $stmt = $pdo->prepare('SELECT id, email, password_hash, role, name, first_login FROM users WHERE email = :email');
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        jsonResponse(['success' => false, 'message' => 'invalid_credentials'], 401);
    }

    $_SESSION['user_id'] = (int) $user['id'];

    if ($token !== '') {
        $stmt = $pdo->prepare('INSERT INTO expo_tokens (user_id, expo_token, last_used_at) VALUES (:user_id, :token, NOW()) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), last_used_at = NOW()');
        $stmt->execute([
            ':user_id' => $user['id'],
            ':token' => $token,
        ]);
    }

    jsonResponse([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'role' => $user['role'],
            'name' => $user['name'],
            'first_login' => (int) $user['first_login'],
        ],
    ]);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => 'login_failed'], 500);
}
