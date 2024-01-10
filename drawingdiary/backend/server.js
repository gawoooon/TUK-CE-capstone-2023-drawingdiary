const express = require('express');
const app = express();

app.use(json());

app.listen(8080, (err) => {
    if (err) {
        console.log('err 발생');
    }

    console.log('정상구동');
});