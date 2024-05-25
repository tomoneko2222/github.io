let intervalIds = [];

document.getElementById('startButton').addEventListener('click', () => {
    const webhookUrls = document.getElementById('webhookUrls').value.split('\n');
    const interval = parseFloat(document.getElementById('interval').value) * 1000; // convert to milliseconds
    const message = document.getElementById('message').value;

    webhookUrls.forEach((webhookUrl, index) => {
        const intervalId = setTimeout(() => {
            setInterval(() => {
                fetch(webhookUrl.trim(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: message })
                })
                .then(response => console.log(`メッセージが正常に送信されました: ${response.status}`))
                .catch(error => console.log(`メッセージの送信に失敗しました: ${error}`));
            }, interval * webhookUrls.length);
        }, interval * index);

        intervalIds.push(intervalId);
    });
});

document.getElementById('stopButton').addEventListener('click', () => {
    intervalIds.forEach(intervalId => {
        clearTimeout(intervalId);
    });
    intervalIds = [];
});
