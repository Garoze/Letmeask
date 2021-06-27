import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import logoImg from 'assets/images/logo.svg';
import illustrationImg from 'assets/images/illustration.svg';

import { Button } from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { Database } from 'services/Firebase';

import './styles.scss';

export const CreateRoom = () => {
  const { user } = useAuth();
  const [createRoom, setCreateRoom] = useState('');

  const history = useHistory();

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line
    if (createRoom.trim() === '') return;

    const roomRef = Database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: createRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  };

  return (
    <div className="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(e) => setCreateRoom(e.target.value)}
              value={createRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?&nbsp;
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
