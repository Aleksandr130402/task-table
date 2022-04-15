import {createPortal} from "react-dom";
import { useEffect } from 'react';

export default function NewWindow ({ children, close }) {
	
	const newWindow = window.open(
			"about:blank",
			"newWin",
			"width=800,height=600"
		)

	newWindow.onbeforeunload = () => {
		close();
	};

	const popupHead = newWindow.document.head;
	const styles = document.createElement('style');
	styles.textContent = `
		table {
			border-collapse: collapse;
		}

		th,
		td {
			padding: 3px;
			border: 1px solid;
		}

		input,
		select {
			max-width: 115px;
			margin: 15px;
		}

		button {
			margin-left: 15px;
		}

		form {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	`
	popupHead.appendChild(styles);


  useEffect(() => {
	 	return () => newWindow.close()
	});

  return createPortal(children, newWindow.document.body);
};