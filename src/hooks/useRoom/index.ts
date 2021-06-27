import { useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import { Database } from 'services/Firebase';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export const useRoom = (roomId: string) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [usersQuestions, setUsersQuestion] = useState<QuestionType[]>([]);

  useEffect(() => {
    const roomRef = Database.ref(`/rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const parsedQuestions = Object.entries(
        (room.val().questions as FirebaseQuestions) ?? {},
      ).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
        likeCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(
          ([, like]) => like.authorId === user?.id,
        )?.[0],
      }));

      setTitle(room.val().title);
      setUsersQuestion(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id]);

  return { usersQuestions, title };
};
