import React, { useState } from 'react';
import Button from "../components/button/Button";
import LongInputField from '../components/input field/LongInputField';
import ShortInputField from '../components/input field/ShortInputField';

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [certification, setCheckCertification] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(name, email, password);
    };

    const containerStyle = {
        height: '700px',
        width: '550px',
        position: 'fixed',
        left: '50%', 
        top: '50%', 
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #000000',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const selectMonthStyle = {
        height: '45px',
        width: '125px',
        margin: '0px 15px 30px 15px',
        paddingLeft: '5px',
        border: '1px solid #909090', 
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const selectGenderStyle = {
        height: '45px',
        width: '435px',
        margin: '0px 15px 30px 15px',
        paddingLeft: '5px',
        border: '1px solid #909090', 
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };


    return (
        <div className='create-account-containers' style={containerStyle}>
            <h3>계정 만들기</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <LongInputField
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeHolder="이름"
                    />
                </div>

                <div style={{
                    display: 'flex',
                }}>
                    <div>
                        <ShortInputField
                            id="year"
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeHolder="연"
                        />
                    </div>

                    <div>
                        <select 
                            name='month'
                            id='month'
                            onChange={ (e) => setMonth(e.target.value)}
                            style={selectMonthStyle}>

                            <option value="" disabled select style={{ color: 'grey'}}>월</option>
                            <option value="1">1월</option>
                            <option value="2">2월</option>
                            <option value="3">3월</option>
                            <option value="4">4월</option>
                            <option value="5">5월</option>
                            <option value="6">6월</option>
                            <option value="7">7월</option>
                            <option value="8">8월</option>
                            <option value="9">9월</option>
                            <option value="10">10월</option>
                            <option value="11">11월</option>
                            <option value="12">12월</option>
                        </select>
                    </div>

                    <div>
                        <ShortInputField
                            id="day"
                            type="text"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            placeHolder="일"
                        />
                    </div>
                </div>

                <div>
                    <select
                        name='gender'
                        id='gender'
                        onChange={ (e) => setGender(e.target.value)}
                        style={selectGenderStyle}>
                            <option value="" disabled select style={{ color: 'grey'}}>성별</option>
                            <option value="female">여자</option>
                            <option value="male">남자</option>
                            <option value="secret">공개안함</option>
                        </select>
                </div>

                <div>
                    <LongInputField
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeHolder="이메일"
                    />
                </div>

                <div>
                    <LongInputField
                        id="certification"
                        type="email"
                        value={certification}
                        onChange={(e) => setCheckCertification(e.target.value)}
                        placeHolder="인증번호 입력"
                    />
                </div>

                <div>
                    <LongInputField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeHolder="비밀번호"
                    />
                </div>

                <div>
                    <LongInputField
                        id="checkPassword"
                        type="checkPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeHolder="비밀번호 확인"
                    />
                </div>

                <Button text="다음" onClick={handleSubmit}/>

            </form>
        </div>
    )
};


export default CreateAccount;

