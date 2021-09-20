const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('./route/userRoute'));
app.use('/', require('./route/loginRoute'));
app.use('/', require('./route/tableRoute'));
app.use('/', require('./route/columnRoute'));
app.use('/', require('./route/categoryRoute'));
app.use('/', require('./route/typeColumnRoute'));

app.listen(3000);