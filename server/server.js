const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(fileUpload(/*{
    // useTempFiles:true,
    // tempFileDir: './server/upload'
}*/))
app.use('/', require('./route/userRoute'));
app.use('/', require('./route/loginRoute'));
app.use('/', require('./route/tableRoute'));
app.use('/', require('./route/columnRoute'));
app.use('/', require('./route/categoryRoute'));
app.use('/', require('./route/typeColumnRoute'));
app.use('/', require('./route/departamentRoute'));
app.use('/', require('./route/uploadRoute'));

app.listen(3000);