import { useEffect, useMemo, useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import SpinningWheel from './components/SpinningWheel';
import Button from './components/Button';
import useWebSocket from 'react-use-websocket';
import TextInput from './components/TextInput';
import Panel from './components/Panel';

const SPIN_TIMEOUT = 5000;
const SHOW_PICTURE_TIMEOUT = 10000;

function App() {
  const {sendJsonMessage, lastMessage} = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL);

  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const isPlayerRegistered = useMemo<boolean>(() => !!players.find((player: string) => player.toLowerCase() === playerName.toLowerCase()), [players, playerName])

  const [endDegree, setEndDegree] = useState<number | undefined>(90);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showJobPanel, setShowJobPanel] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const setSpin = () => {
    const enableButtonTimeout = setTimeout(() => {
      sendJsonMessage({showImage: true});
      const hideJobPanelTimeout = setTimeout(() => {
        sendJsonMessage({showImage: false});
        clearInterval(hideJobPanelTimeout)
      }, SHOW_PICTURE_TIMEOUT);
      clearInterval(enableButtonTimeout);
    }, SPIN_TIMEOUT);
  }

  const onClick = () => {
    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = endDegree as number + randomAdditionalDegrees;
    sendJsonMessage({spinningDegree: newEndDegree});
    setSpin();
  }

  const onJoinClick = () => {
    !!playerName && sendJsonMessage({playerName: playerName});
  }

  useEffect(() => {
    if (!lastMessage || !lastMessage.data) {
      return;
    }

    const response = JSON.parse(lastMessage.data);
    if (response.players) {
      setPlayers(response.players);
    }

    if (response.spinningDegree) {
      setEndDegree(response.spinningDegree);
      setIsSpinning(true);
      const reenableButton = setTimeout(() => {
        setIsSpinning(false);
        clearTimeout(reenableButton);
      }, SPIN_TIMEOUT + SHOW_PICTURE_TIMEOUT);
    }

    if (response.showImage !== undefined) {
      setShowJobPanel(response.showImage);
      if (response.showImage === false) {
        setCount((prev) => prev+=1);
      }
    }
  }, [lastMessage]);

  return (
    <div className='container'>
      {showJobPanel && <Panel><img src={`job-${count}.webp`} /></Panel>}
    <p><b>Rules: </b> You will receive a number of images which should more or less collerate with the job name. The last one will be the job itself. You will be chosen at random to take a guess.</p>
      {!isPlayerRegistered && (
        <>
          <TextInput label='To join the game, you must set up a name' value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>
          <Button label="Join" onClick={onJoinClick}/>
        </>
      )}
      <SpinningWheel items={players} id="spinning-wheel" endDegree={endDegree} isSpinning={isSpinning}/>
      <Button label="Spin" onClick={onClick} disabled={!isPlayerRegistered || isSpinning || players.length < 2}/>
    </div>
  )
}

export default App
