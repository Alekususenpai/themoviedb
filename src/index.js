const app = require('./app');

require('dotenv').config();
const { PORT } = process.env;


app.listen(PORT, (e) => {
          if (e) {
                    console.error(e);
                    return;
          }
          console.log(`Listening on port ${PORT}`)
})

