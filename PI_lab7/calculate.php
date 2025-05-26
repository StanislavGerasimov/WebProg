<?php
session_start();

// Initialize session variables if not set
if (!isset($_SESSION['max_value'])) {
    $_SESSION['max_value'] = 10;
}
if (!isset($_SESSION['sign'])) {
    $_SESSION['sign'] = '+';
}

// Handle range selection
if (isset($_POST['range'])) {
    $range = $_POST['range'];
    if ($range == '0-10') $_SESSION['max_value'] = 10;
    elseif ($range == '0-20') $_SESSION['max_value'] = 20;
    elseif ($range == '0-100') $_SESSION['max_value'] = 100;
    elseif ($range == '0-26') $_SESSION['max_value'] = 26;
}

// Handle operation selection
if (isset($_POST['operation'])) {
    $_SESSION['sign'] = $_POST['operation'];
}

// Generate new problem
if (isset($_POST['new_problem'])) {
    generateProblem();
}

// Check user's answer
if (isset($_POST['user_result']) && is_numeric($_POST['user_result'])) {
    checkAnswer();
}

// Redirect back to the form
header('Location: index.html');
exit();

// Helper functions
function generateProblem() {
    $_SESSION['operand1'] = rand(0, $_SESSION['max_value']);
    
    switch ($_SESSION['sign']) {
        case '+':
            $_SESSION['operand2'] = rand(0, $_SESSION['max_value'] - $_SESSION['operand1']);
            break;
        case '-':
            $_SESSION['operand2'] = rand(0, $_SESSION['operand1']);
            break;
        case '*':
            $_SESSION['operand2'] = rand(0, $_SESSION['max_value']);
            break;
    }
    
    $_SESSION['result_message'] = '???';
}

function checkAnswer() {
    $userAnswer = (int)$_POST['user_result'];
    $correctAnswer = 0;
    
    switch ($_SESSION['sign']) {
        case '+':
            $correctAnswer = $_SESSION['operand1'] + $_SESSION['operand2'];
            break;
        case '-':
            $correctAnswer = $_SESSION['operand1'] - $_SESSION['operand2'];
            break;
        case '*':
            $correctAnswer = $_SESSION['operand1'] * $_SESSION['operand2'];
            break;
    }
    
    $_SESSION['result_message'] = ($userAnswer == $correctAnswer) ? 'Вірно!' : 'Спробуй ще!';
    
    // Generate new problem after answer
    generateProblem();
}
?>