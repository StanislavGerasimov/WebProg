<?php
// Перевірка, чи форма була відправлена
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ініціалізація масиву для зберігання даних
    $userData = array();
    $errors = array();
    
    // Отримання та очищення даних з форми
    $userData['користувач'] = trim($_POST['username'] ?? '');
    $userData['ім\'я'] = trim($_POST['first_name'] ?? '');
    $userData['прізвище'] = trim($_POST['last_name'] ?? '');
    $userData['пошта'] = trim($_POST['email'] ?? '');
    $userData['пароль'] = trim($_POST['password'] ?? '');
    $userData['адреса'] = trim($_POST['address'] ?? '');
    $userData['телефон'] = trim($_POST['phone'] ?? '');
    
    // Перевірка обов'язкових полів
    if (empty($userData['користувач'])) {
        $errors[] = "Ім'я користувача обов'язкове";
    }
    
    if (empty($userData['ім\'я'])) {
        $errors[] = "Ім'я обов'язкове";
    }
    
    if (empty($userData['прізвище'])) {
        $errors[] = "Прізвище обов'язкове";
    }
    
    if (empty($userData['пошта'])) {
        $errors[] = "E-mail обов'язковий";
    } elseif (!filter_var($userData['пошта'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Невірний формат e-mail";
    }
    
    if (empty($userData['пароль'])) {
        $errors[] = "Пароль обов'язковий";
    }
    
    // Якщо є помилки, виводимо їх
    if (!empty($errors)) {
        echo "<h2>Виникли помилки:</h2>";
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
        echo '<p><a href="registration.html">Повернутися до форми</a></p>';
    } else {
        // Якщо помилок немає, виводимо масив з даними
        echo "<h2>Дані реєстрації:</h2>";
        echo "<pre>";
        print_r($userData);
        echo "</pre>";
        
        // Тут зазвичай буде збереження даних у базу даних
        // або інші дії з отриманими даними
    }
} else {
    // Якщо спроба прямого доступу до process.php без відправки форми
    header("Location: registration.html");
    exit();
}
?>