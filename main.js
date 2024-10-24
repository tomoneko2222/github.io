let intervalIds = [];

function logToConsole(message, isError = false) {
    const consoleOutput = document.getElementById('consoleOutput');
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logEntry.className = isError ? 'error' : 'success';
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

document.getElementById('startButton').addEventListener('click', () => {
    const webhookUrls = document.getElementById('webhookUrls').value.split('\n');
    const interval = parseFloat(document.getElementById('interval').value) * 1000;
    const message = document.getElementById('message').value;
    const embedMessage = document.getElementById('embedMessage').checked;

    webhookUrls.forEach(webhookUrl => {
        const intervalId = setInterval(() => {
            let data;

            if (embedMessage) {
                data = {
                    "embeds": [{
                        "title": " ",
                        "description": message,
                        "color": 7506394
                    }]
                };
            } else {
                data = {
                    "content": message
                };
            }

            fetch(webhookUrl.trim(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    logToConsole(`メッセージが正常に送信されました: ${response.status}`);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .catch(error => {
                logToConsole(`メッセージの送信に失敗しました: ${error}`, true);
            });
        }, interval);

        intervalIds.push(intervalId);
    });
    logToConsole("メッセージの送信を開始しました。");
});

document.getElementById('stopButton').addEventListener('click', () => {
    intervalIds.forEach(intervalId => {
        clearInterval(intervalId);
    });
    intervalIds = [];
    logToConsole("メッセージの送信を停止しました。");
});
