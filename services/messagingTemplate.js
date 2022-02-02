module.exports = (message) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>${message.title}</h3>
          <p>From AmalyApp user:</p>
          <p>${message.body}</p>
        </div>
      </body>
    </html>
  `;
};
