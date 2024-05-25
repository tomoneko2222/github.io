let intervalId = null;

document.getElementById('startButton').addEventListener('click', () => {
    const webhookUrl = document.getElementById('webhookUrl').value;
    const interval = parseFloat(document.getElementById('interval').value) * 1000; // convert to milliseconds
    const message = document.getElementById('message').value;

    intervalId = setInterval(() => {
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        })
        .then(response => console.log(`メッセージが正常に送信されました: ${response.status}`))
        .catch(error => console.log(`メッセージの送信に失敗しました: ${error}`));
    }, interval);
});

document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(intervalId);
});

