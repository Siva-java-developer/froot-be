const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/UserRoute');
const outletRoutes = require('./routes/OutletRoute');
const eventRoutes = require('./routes/EventRoute');
const contactRoutes = require('./routes/ContactRoute');
const reviewRoutes = require('./routes/ReviewRoute');
const financeRoutes = require('./routes/FinanceRoute');
const prebookRoutes = require('./routes/PrebookRoute');

require('dotenv').config();
connectDB();

const app = express();

app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoutes);
app.use('/api', outletRoutes);
app.use('/api', eventRoutes);
app.use('/api', contactRoutes);
app.use('/api', reviewRoutes);
app.use('/api', financeRoutes);
app.use('/api', prebookRoutes);

app.get('/', (req, res) => {
    res.send(`
        <h1>FrootFast Backend API</h1>
        <p>API is running...</p>
        <p><a href="/api-docs">View API Documentation</a></p>
    `);
});

app.listen(process.env.PORT, () => {
    logger.info(`Server running at http://localhost:${process.env.PORT}`);
});