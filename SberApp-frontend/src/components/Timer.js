import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { text, background, gradient } from "@sberdevices/plasma-tokens";
import { Button } from "@sberdevices/ui";
import { IconRefresh, IconHouse } from "@sberdevices/plasma-icons";
import "./Modal.css";
import { Link } from "react-router-dom";
const format = (time) => {
  // Convert seconds into minutes and take the whole part
  const minutes = Math.floor(time / 60);

  // Get the seconds left after converting minutes
  const seconds = time % 60;

  //Return combined values as string in format mm:ss
  return `${minutes}:${padTime(seconds)}`;
};
const customStyles = {
  content: {
    color: `${text}`,
    backgroundColor: `${background}`,
    backgroundImage: `${gradient}`,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1em",
    padding: "1em",
  },
};
// const DocStyles = {`
//     /* stylelint-disable-next-line selector-nested-pattern */
//     html {

//     }
// `;
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
export const Timer = ({ setIsGame, category, chooseCategory }) => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [counter, setCounter] = React.useState(14);
  React.useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    } else if (counter === 0) {
      setIsOpen(true);
      setIsGame(false);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);
  return (
    <div>
      {counter !== 0 && <span>Время: {format(counter)}</span>}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          //onRequestClose={closeModal}
          style={customStyles}
        >
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            style={{ textAlign: "center" }}
          >
            Время вышло
          </h2>
          <div style={{ textAlign: "center" }}>Вы продержались: Х секунд</div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={async () => {
                setIsOpen(false);

                await chooseCategory(category);
                setCounter(4);
              }}
            >
              <IconRefresh />
            </Button>
            <Link to="/">
              <Button>
                <IconHouse />
              </Button>
            </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const padTime = (time) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};
