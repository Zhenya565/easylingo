<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json');

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name  = htmlspecialchars( $_POST['your-name'] ?? '', ENT_QUOTES, 'UTF-8' );
    $phone = htmlspecialchars( $_POST['your-tel'] ?? '', ENT_QUOTES, 'UTF-8' );

    if (empty($name) || empty($phone)) {
        $response = [
            'result' => 'error',
            'info'   => 'Пожалуйста, заполните все обязательные поля.',
        ];
        echo json_encode($response);
        exit;
    }

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->CharSet   = "UTF-8";
    $mail->SMTPAuth  = true;
    $mail->Host      = 'smtp.yandex.ru';
    $mail->Username  = 'w2188@yandex.ru';
    $mail->Password  = 'mzluhblwwznhytmn';
    $mail->SMTPSecure = 'ssl';
    $mail->Port      = 465;
    $mail->setFrom( 'w2188@yandex.ru', 'EasyLingo' );
    $mail->addAddress( 'evgeny_shadrintsev@mail.ru' );
    $mail->addAddress( '' );

    $mail->isHTML(true);
    $mail->Subject = "Заявка с сайта";
    $mail->Body    = "
        <b>Имя:</b> $name<br>
        <b>Телефон:</b> $phone
    ";

    if ( $mail->send() ) {
        $response = [
            'result' => 'success',
            'info'   => 'Заявка успешно отправлена!',
        ];
    } else {
        $response = [
            'result' => 'error',
            'info'   => 'Ошибка при отправке письма.',
            'desc'   => $mail->ErrorInfo,
        ];
    }
} else {
    $response = [
        'result' => 'error',
        'info'   => 'Неверный метод запроса',
    ];
}

echo json_encode($response);
