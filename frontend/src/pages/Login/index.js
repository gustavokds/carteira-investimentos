import React, { useState } from 'react';
import { FiKey, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);

            history.push('/investment');
        } catch (error) {
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <FiKey className="icon" size={16} color="#000" />
                    <input placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="link" to="/register">
                        <FiLogIn className="icon" size={16} color="#000" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

        </div>
    )
}