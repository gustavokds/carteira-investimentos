import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { FiPower, FiArrowRight, FiPlusCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function Investiment() {
    const [fixed, setFixed] = useState([]);
    const [variable, setVariable] = useState([]);
    const [percentVar, setPercentVar] = useState(0);
    const [percentFixed, setPercentFixed] = useState(0);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const history = useHistory();
    let carteira = 0.00;


    useEffect(() => update(), [userId]);

    function update() {
        api.get('/sum', {
            headers: {
                authorization: userId,
            },
        }).then((response) => {
            carteira = (Number(response.data.fixed) + Number(response.data.variable));
            console.log(carteira);
            if (response.data.fixed == null) {
                setPercentFixed(0);
            } else if (response.data.variable == null) {
                setPercentVar(0);
            } else {
                setPercentVar(parseFloat((response.data.variable * 100) / carteira).toFixed(2));
                setPercentFixed(parseFloat((response.data.fixed * 100) / carteira).toFixed(2));
            }
        });
        api.get('/fixed', {
            headers: {
                authorization: userId,
            },
        }).then((response) => {
            setFixed(response.data);
        });
        api.get('/variable', {
            headers: {
                authorization: userId,
            },
        }).then((response) => {
            setVariable(response.data);
        });
    };

    async function handleAdd(e) {
        e.preventDefault();
        const data = {
            type,
            value,
            date
        };
        try {
            await api.post('/incidents', data, {
                headers: {
                    authorization: userId,
                },
            });
            update();
        } catch (error) {
            alert("Erro ao cadastrar investimento.");
        };
    };

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }



    return (
        <div className="investment-container">
            <header>
                <span> Bem-vindo(a), {userName}</span>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={20} color="#10c0c6" />
                </button>
            </header>
            <h1> Carteira de Investimentos</h1>
            <form className="add-investiment" onSubmit={handleAdd}>
                Adicionar novo investimento:
                <select className="type" required="required"
                    onChange={(e) => setType(e.target.value)}>
                    <option selected="true" hidden="true" disabled="disabled">Tipo</option>
                    <option value="Renda_fixa">
                        Renda Fixa
                    </option>
                    <option value="Renda_variavel">
                        Renda Variável
                    </option>
                </select>
                <input type="number" placeholder="Valor em R$" min="30" max="100000000" required="required"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <input type="date" placeholder="Data de compra"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit" >
                    <FiPlusCircle size={18} color="#000" />
                </button>
            </form>

            <div className="income">
                <div className="fixed">
                    Renda Fixa:
                    {fixed.map((incident) => (

                    < li >
                        <FiArrowRight size="13" color="#000" />
                        [{new Date(incident.date).getDate() + 1}-{new Date(incident.date).getMonth() + 1}-{new Date(incident.date).getFullYear()}]
                        {
                            Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(incident.value)
                        }
                    </li>
                ))}
                </div>
                <div className="variable">
                    Renda Variável:
                    {variable.map((incident) => (
                    <li>
                        <FiArrowRight size="13" color="#000" />
                        [{new Date(incident.date).getDate() + 1}-{new Date(incident.date).getMonth() + 1}-{new Date(incident.date).getFullYear()}]
                        {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(incident.value)}
                    </li>
                ))}
                </div>
            </div>
            <div className="income">
                <div className="percent">
                    <li>
                        {percentFixed}% da carteira em renda fixa
                    </li>
                    <li>
                        {percentVar}% da carteira em renda variável
                    </li>
                </div>
                <div className="chart">
                    <PieChart data={[{ title: `Renda Fixa: ${percentFixed}`, value: Number(percentFixed), color: '#10c0c6' },
                    { title: `Renda Variável: ${percentVar}`, value: Number(percentVar), color: '#00FF7F' }]}
                    />
                </div>
            </div>
        </div >
    )
}