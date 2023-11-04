const nodemailer = require('nodemailer');
const fs = require('fs');
const Imap = require('imap');
const { MailParser } = require('mailparser');
const path = require('path');

const PASSWORD = '';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: '2675130594@qq.com',
    pass: PASSWORD,
  },
});

async function sendMail() {
  const info = await transporter.sendMail({
    from: '"ginlon" <2675130594@qq.com>',
    to: 'ginlon5241@gmail.com',
    subject: 'Hello ginlon',
    html: fs.readFileSync('./src/mail_test.html'),
  });

  console.log('邮件发送成功', info.messageId);
}

const imap = new Imap({
  user: '2675130594@qq.com',
  password: PASSWORD,
  host: 'imap.qq.com',
  port: 993,
  tls: true,
});
async function receiveMail() {
  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err) => {
      imap.search(
        [['SEEN'], ['SINCE', new Date('2023-11-1 00:00:00').toLocaleString()]],
        (err, results) => {
          if (!err) {
            console.log('results', results);
            handleResults(results);
          } else {
            throw err;
          }
        },
      );
    });
  });

  imap.connect();
}
function handleResults(results) {
  imap
    .fetch(results, {
      markSeen: false,
      bodies: '',
      struct: true,
    })
    .on('message', (msg) => {
      const mailparser = new MailParser();

      msg.on('body', (stream) => {
        const info = {};
        stream.pipe(mailparser);

        mailparser.on('headers', (headers) => {
          info.theme = headers.get('subject');
          info.form = headers.get('from').value[0].address;
          info.mailName = headers.get('from').value[0].name;
          info.to = headers.get('to').value[0].address;
          info.date = headers.get('date').toLocaleString();
        });

        mailparser.on('data', (data) => {
          if (data.type === 'text') {
            info.html = data.html;
            info.text = data.text;

            const filePath = path.join(
              __dirname,
              'mails',
              info.theme + '.html',
            );

            fs.writeFileSync(filePath, info.html);
          }
          if (data.type === 'attachment') {
            const filePath = path.join(__dirname, 'files', data.filename);
            const ws = fs.createWriteStream(filePath);
            data.content.pipe(ws);
          }
        });
      });
    });
}

async function main() {
  // sendMail();
  await receiveMail();
}

main().catch(console.error);
