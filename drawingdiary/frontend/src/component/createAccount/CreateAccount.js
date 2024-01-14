import React, { useState } from 'react';
import Button from "../button/Button";


const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, email, password);
    };

    const containerStyle = {
        height: '850px',
        width: '600px',
        position: 'fixed',
        left: '50%', 
        top: '50%', 
        transform: 'translate(-50%, -50%)', 
        marginTop: '30px',
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
                    <label htmlFor='name'>이름</label>
                    <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='email'>이메일</label>
                    <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='password'>비밀번호</label>
                    <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

