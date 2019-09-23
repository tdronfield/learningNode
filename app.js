const express = require('express');
const path = require('path'); 

// heroku assigns a port when it deploys via the process (environment variables - coming soon)
// locally this will run at port 3000; remotely it'll run wherever heroku tells it to run
const port = process.env.PORT || 3000; // a double pipe || means "or"

const app = express();

app.use(express.static('public'));

// a forward slash is the home route (i.e index.html)
app.get('/', (req, res) => {
  //res.send('Hello World!');
  res.sendFile(path.join(__dirname + '/views/index.html'));
  // this builds localhost:3000/views/index.html
})

app.get('/contact', (req, res) => {
  //res.send('on the contact page!');
  res.sendFile(path.join(__dirname + '/views/contact.html'));
})

app.listen(port,() => {
  console.log(`Server running at ${port}`);
})
