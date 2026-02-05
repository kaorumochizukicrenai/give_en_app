<?php
require __DIR__ . '/db.php';

session_start();

$token = isset($_GET['token']) ? preg_replace('/[^a-zA-Z0-9]/', '', $_GET['token']) : '';

try {
    $pdo = getDbConnection();

    $user = null;
    if (!empty($_SESSION['user_id'])) {
        $user = getUserById($pdo, (int) $_SESSION['user_id']);
    }

    if ($user === null && $token !== '') {
        $stmt = $pdo->prepare('SELECT user_id FROM expo_tokens WHERE expo_token = :token');
        $stmt->execute([':token' => $token]);
        $tokenRow = $stmt->fetch();
        if ($tokenRow) {
            $_SESSION['user_id'] = (int) $tokenRow['user_id'];
            $user = getUserById($pdo, (int) $tokenRow['user_id']);
        }
    }

    if ($user && $token !== '') {
        $stmt = $pdo->prepare('INSERT INTO expo_tokens (user_id, expo_token, last_used_at) VALUES (:user_id, :token, NOW()) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), last_used_at = NOW()');
        $stmt->execute([
            ':user_id' => $user['id'],
            ':token' => $token,
        ]);
    }

    jsonResponse([
        'loggedIn' => $user !== null,
        'user' => $user,
    ]);
} catch (Throwable $e) {
    jsonResponse([
        'loggedIn' => false,
        'error' => 'bootstrap_failed',
    ], 500);
}
