import { useEffect, useState } from "react";

import listarUsuarios from "./components/listarUsuarios";
import novoUsuario from "./components/novoUsuario";
import atualizarUsuario from "./components/atualizarUsuario";
import excluirUsuario from "./components/excluirUsuario";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // GET - LISTAR
  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await listarUsuarios();
        setUsuarios(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  // DELETE - EXCLUIR
  async function excluir(id) {
    try {
      setErro("");

      await excluirUsuario(id);

      setUsuarios((lista) =>
        lista.filter((usuario) => usuario.id !== id)
      );

      console.log(`Usuário ${id} excluído`);
    } catch (err) {
      setErro(err.message);
    }
  }

  // PUT - EDITAR
  async function editar(usuario) {
    try {
      setErro("");

      const novosDados = {
        name: usuario.name + " Editado",
        email: usuario.email,
      };

      const atualizado = await atualizarUsuario(
        usuario.id,
        novosDados
      );

      setUsuarios((lista) =>
        lista.map((item) =>
          item.id === usuario.id ? atualizado : item
        )
      );
    } catch (err) {
      setErro(err.message);
    }
  }

  // POST - NOVO
  async function adicionar() {
    try {
      setErro("");

      const dados = {
        name: "Novo Usuário",
        email: "novo@email.com",
      };

      const novo = await novoUsuario(dados);

      setUsuarios((lista) => [...lista, novo]);
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div>
      <h1>Usuários</h1>

      {erro && <p>Erro: {erro}</p>}

      <button onClick={adicionar}>
        Novo usuário
      </button>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.name} - {usuario.email}

              <button onClick={() => editar(usuario)}>
                Editar
              </button>

              <button onClick={() => excluir(usuario.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;