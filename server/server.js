const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('./route/userRoute'));
app.use('/', require('./route/loginRoute'));

app.listen(3000);