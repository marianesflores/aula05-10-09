import { useState } from 'react';

export default function NovoUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState(null);
    const [criado, setCriado] = useState(null);

    async function enviar(evento) {
        evento.preventDefault()
        setEnviando(true)
        setErro(null)
        setCriado(null)

        try {
            const resposta = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: nome, email: email })
            })
            if (!resposta.ok)
                throw new Error_(`Erro HTTP: ${resposta.status}`)
            const data = await resposta.json()
            setCriado(data)
            setNome('')
            setEmail('')

        } catch (error) {
            setErro(error.message)
        } finally {
            setEnviando(false);
        }
    }


    return (

        <form onSubmit={enviar}>
            <label htmlFor="nome">Nome: </label>
            <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
            />
            <label htmlFor="email">Email: </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
            />
            <button disabled={enviando}>
                Cadastrar
            </button>
            {enviando && <p>Enviando...</p>}
            {erro && <p>Erro ao enviar</p>}
            {erro && <p>Usuário criado com sucesso!</p>}
            {criado && <p>Criado com id={criado.id} e nome={criado.nome}</p>}
        </form>
    );
}

