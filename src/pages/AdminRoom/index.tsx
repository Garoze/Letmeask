import { Link, useHistory, useParams } from 'react-router-dom';

import logoImg from 'assets/images/logo.svg';
import deleteImg from 'assets/images/delete.svg';
import checkImg from 'assets/images/check.svg';
import answerImg from 'assets/images/answer.svg';

import { Button } from 'components/Button';
import { Question } from 'components/Question';
import { RoomCode } from 'components/RoomCode';

import { useRoom } from 'hooks/useRoom';
import { Database } from 'services/Firebase';

import './styles.scss';

type RoomParams = {
  id: string;
};

export const AdminRoom = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const { title, usersQuestions } = useRoom(params.id);

  const handleEndRoom = async () => {
    // eslint-disable-next-line
    if (window.confirm('Tem certeza que deseja encerrar essa sala?')) {
      await Database.ref(`/rooms/${params.id}`).update({
        endedAt: new Date(),
      });

      history.push('/');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    // eslint-disable-next-line
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await Database.ref(
        `/rooms/${params.id}/questions/${questionId}`,
      ).remove();
    }
  };

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await Database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await Database.ref(`/rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  return (
    <div className="page-room">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask logo" />
          </Link>
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>
            Sala
            {title}
          </h1>
          {usersQuestions.length > 0 && (
            <span>
              {usersQuestions.length}
              &nbsp;pergunta(s)
            </span>
          )}
        </div>

        <div className="question-list">
          {usersQuestions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque a pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};
