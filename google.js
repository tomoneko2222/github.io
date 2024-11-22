document.addEventListener('DOMContentLoaded', function() {
  fetch('https://v4.ident.me/')
    .then(response => response.text())
    .then(ip => {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwl9gLIuN8uuUp79gukig5pe77ZDzjOTHhHGXKuLLiYYNvBUEgaUTy2QAbpYxSn02bZ/exec'; // デプロイしたウェブアプリのURLに置き換えてください

      fetch(`${scriptUrl}?ip=${ip}`, {
        method: 'GET',
      })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('エラーが発生しました:', error));
    })
    .catch(error => console.error('エラーが発生しました:', error));
});