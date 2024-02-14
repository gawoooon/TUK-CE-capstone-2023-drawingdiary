import cors from 'cors';
import express, { json } from 'express';
const app = express();

app.use(json());

// 특정 출처의 요청만 허용
// app.use(cors({
//     origin: '*' // 클라이언트 애플리케이션 주소
// }));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
