<?php
require __DIR__ . '/db.php';

session_start();
if (empty($_SESSION['user_id'])) {
    jsonResponse(['success' => false, 'message' => 'unauthorized'], 401);
}

try {
    $pdo = getDbConnection();
    $stmt = $pdo->prepare('UPDATE users SET first_login = 0 WHERE id = :id');
    $stmt->execute([':id' => (int) $_SESSION['user_id']]);
    jsonResponse(['success' => true]);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => 'update_failed'], 500);
}
