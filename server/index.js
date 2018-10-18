const express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    cors = require("cors"),
    app = express();

const { mongoose } = require('./db')

// Setings
app.set('port', process.env.PORT || 3300);

// Middlewares
app.use(morgan('dev'))
    .use(express.json())
    .use(cors())
    .use(cors({ origin: 'http://localhost:4000' }));

// Routes
// app.use('/api/clients', require('./routes/clients.routes'));
// app.use('/api/credits', require('./routes/credit.routes'));
app.use('/api/samples', require('./routes/samples.routes'));

//Static 
// app.use(express.static(path.join(__dirname, 'public')));

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server running http://localhost:${app.get('port')}`);
});
