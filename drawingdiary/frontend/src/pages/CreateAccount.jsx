import React, { useState } from 'react';
import Button from "../components/Button";
import LongInputField from '../components/input field/LongInputField';
import ShortInputField from '../components/input field/ShortInputField';


const CreateAccount = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, email, password);
    };

    const containerStyle = {
        height: '800px',
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
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ShortInputField
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeHolder="연"
                    />

                    <ShortInputField
                        id="month"
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeHolder="월"
                    />

                    <ShortInputField
                        id="day"
                        type="number"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeHolder="일"
                    />
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
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        placeHolder="비밀번호 확인"
                    />
                </div>

            </form>
            
            <div>
                <Button text="다음"/>
            </div>
        </div>
    )
};


export default CreateAccount;

