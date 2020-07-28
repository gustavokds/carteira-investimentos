import React, { useState } from 'react';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name
        };

        try {
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Erro ao cadastrar!');
        }
    }

    return (
        <div className="register-container">
            <section className="form">
                <form onSubmit={handleRegister}>
                    <h1>Faça seu cadastro</h1>
                    <FiUser className="icon" size={16} color="#000" />
                    <input placeholder="Seu nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                    <Link className="link" to="/">
                        <FiLogIn className="icon" size={16} color="#000" />
                        Já tenho um usuário
                    </Link>
                </form>
            </section>
        </div>
    )
}