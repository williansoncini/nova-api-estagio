const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();

const corsOptions = {
    origin: 'http://localhost:3006',
    optionsSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(fileUpload())

app.use('/', require('./route/user/userRoute'));
app.use('/', require('./route/user/loginRoute'));
app.use('/', require('./route/user/departamentRoute'));

app.use('/', require('./route/table/tableRoute'));
app.use('/', require('./route/table/columnRoute'));
app.use('/', require('./route/table/categoryRoute'));
app.use('/', require('./route/table/typeColumnRoute'));
app.use('/', require('./route/table/dataRoute'));

app.use('/', require('./route/file/uploadRoute'));
app.use('/', require('./route/file/importRoute'));

app.listen(3000);