import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export const Login = (props) => {
    const client = axios.create()
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    const onClick = () => {
        client.post('https://booth.hasclassmatching.com/login',
            {
                "std_id": id,
                "password": password
            }
        )
        .then((res) => {
            console.log(res)
            if (res.data === '"비밀번호가 틀립니다. 다시 시도해주세요."') alert('비밀번호가 틀립니다. 다시 시도해주세요.')
            else {
                props.setUserData(res.data[0])
                props.setUserCapital(res.data[1])
            }
        })
    }

    return (
        <LoginContainer>
            <h2>Login</h2>
            <LoginForm onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="고유학번"
                    value={id}
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button onClick={onClick}>Login</Button>
            </LoginForm>
        </LoginContainer>
    );
};