import './App.css';
import '@nylas/components-mailbox';
import '@nylas/components-composer';
import { useCallback, useEffect, useRef } from 'react';

function App() {
  const composerRef = useRef(null);
  useEffect(() => {
    if (!composerRef.current) return;

    composerRef.current.close();
  }, [composerRef]);

  const openComposer = useCallback(() => {
    if (!composerRef.current) return;

    composerRef.current.open();
  }, [composerRef]);

  return (
    <div className="App">
      <button onClick={openComposer}>Compose a new message</button>
      <nylas-mailbox
        id="c70ff084-a2cf-4bef-8fb8-9f767ea0f0bd"
        show_forward={true}
      ></nylas-mailbox>
      <div
        style={{
          position: 'absolute',
          width: '60%',
          margin: 'auto',
          right: '0',
          bottom: '0',
          zIndex: 2,
        }}
      >
        <nylas-composer
          id="4aed9955-007d-4096-a63e-badae043e622"
          ref={composerRef}
        ></nylas-composer>
      </div>
    </div>
  );
}

export default App;
