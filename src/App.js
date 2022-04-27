import './App.css';
import '@nylas/components-mailbox';
import '@nylas/components-composer';
import { useCallback, useEffect, useRef } from 'react';

const formatForwardBody = (body) =>
  `<div><br/><div>---------- Forwarded message ---------</div><br/>${body}</div>`;

function App() {
  const composerRef = useRef(null);
  useEffect(() => {
    if (!composerRef.current) return;

    composerRef.current.close();
  }, [composerRef]);

  const openComposer = useCallback(
    (event) => {
      if (!composerRef.current) return;

      if (event) {
        const message = event?.detail?.message;
        switch (event?.type) {
          case `forwardClicked`:
            composerRef.current.value = {
              body: formatForwardBody(message.body),
              files: message.files,
              subject: `Fwd: ${message.subject}`,
              thread_id: message.thread_id, // Required to ensure fwds/threads are associated to a thread
            };
            break;
          default:
            break;
        }
      }
      composerRef.current.open();
    },
    [composerRef]
  );

  const mailboxRef = useRef(null);
  useEffect(() => {
    const mailbox = mailboxRef.current;
    if (!mailbox) return;

    mailbox.addEventListener(`forwardClicked`, openComposer);

    return () => {
      mailbox.removeEventListener(`forwardClicked`, openComposer);
    };
  }, [mailboxRef, openComposer]);

  return (
    <div className="App">
      <button onClick={openComposer}>Compose a new message</button>
      <nylas-mailbox
        id="c70ff084-a2cf-4bef-8fb8-9f767ea0f0bd"
        ref={mailboxRef}
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
