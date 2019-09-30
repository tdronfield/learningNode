const express = require('express');
const path = require('path'); 
const hbs = require('hbs');

const sql = require('./utils/sql');

// heroku assigns a port when it deploys via the process (environment variables - coming soon)
// locally this will run at port 3000; remotely it'll run wherever heroku tells it to run
const port = process.env.PORT || 3000; // a double pipe || means "or"

const app = express();

app.use(express.static('public'));

// tell express to use the handlebars engine to render data
app.set('view engine', 'hbs');

// tell express to se the views folder to find its templates
app.set('views', __dirname + '/views');


// a forward slash is the home route (i.e index.html)
app.get('/', (req, res) => {
  //res.send('Hello World!');
  //res.sendFile(path.join(__dirname + '/views/index.html'));
  
  res.render('home', { message: "hi there!"});
  // this builds localhost:3000/views/index.html
})

app.get('/contact', (req, res) => {
  //res.send('on the contact page!');
  //res.sendFile(path.join(__dirname + '/views/contact.html'));

  res.render('contact', { message: "Contact Page Render!"});
})

app.get('/user', (req, res) => {
  sql.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    let query = `SELECT * FROM tbl_card`;

    sql.query(query, (err, rows) => {
      connection.release();

      if (err) {return console.log(err.message); }

      //console.log(rows);
      
      res.render('user', rows[0]);
    })
  })
})

app.listen(port,() => {
  console.log(`Server running at ${port}`);
})
