import copyImg from 'assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string;
};

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button
      type="button"
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>
        Sala #
        {code}
      </span>
    </button>
  );
};
