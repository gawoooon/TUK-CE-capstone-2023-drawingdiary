import cors from 'cors';
import express, { json } from 'express';
import axios from 'axios'; // axios 추가

const app = express();

app.use(json());
// app.use(cors());

// // Naver Sentiment Analysis API 호출을 위한 프록시 엔드포인트
// app.post('/api/sentiment', async (req, res) => {
//     const apiUrl = 'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze';
//     try {
//         const apiResponse = await axios.post(apiUrl, req.body, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-NCP-APIGW-API-KEY-ID': 'ksnv4tfdvd', // 발급받은 Client ID
//                 'X-NCP-APIGW-API-KEY': 'nJ0L2fO6t8jwOqpgcZsplPniprZo7eHiVBWdHt32', // 발급받은 Client Secret
//             },
//         });
//         // API 응답을 클라이언트로 전달
//         res.json(apiResponse.data);
//     } catch (error) {
//         console.error('API 요청 중 오류 발생:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
