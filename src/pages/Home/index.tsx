import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from 'assets/images/logo.svg';
import googleIconImg from 'assets/images/google-icon.svg';
import illustrationImg from 'assets/images/illustration.svg';

import { Button } from 'components/Button';
import { useAuth } from 'hooks/useAuth';

import { Database } from 'services/Firebase';

import './styles.scss';

export const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/create');
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line
    if (roomCode.trim() === '') return;

    const roomRef = await Database.ref(`/rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      // eslint-disable-next-line
      return alert('This room does not exists.');
    }

    if (roomRef.val().endedAt) {
      // eslint-disable-next-line
      return alert('Room already closed.');
    }

    history.push(`/rooms/${roomCode}`);
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
          <button
            type="button"
            onClick={handleCreateRoom}
            className="create-room"
          >
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
