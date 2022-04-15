import { useEffect, useRef, useState } from 'react';


export default function Popup({close}) {

	const inputDateRef = useRef(null);
	const inputUserRef = useRef(null);

	const [tableData, setTableData] = useState([{
		num: 1,
		date: '20.02.2022',
		user: 'Anna',
		comment: 'comment'
	}])

	const [userData, setUserData] = useState({
		num: 0,
		comment: ''
	})

	const checkFields = () => {
		if (userData.num === 0) {
			return false;
		}
		if (userData.comment === '') {
			return false;
		}
		if (inputDateRef.current.value === '') {
			return false;
		}
		return true;
	}

	const handleInputChange = (e) => {
		
		const {name, value} = e.target;
    setUserData(prevState => ({...prevState, [name]: value}));
	}

	const addData = (e) => {
		e.preventDefault();

		if(checkFields()) {
			const newItem = {
				num: userData.num,
				date: inputDateRef.current.value,
				user: inputUserRef.current.value,
				comment: userData.comment
			}

			setTableData([...tableData, newItem])
		}
	}

	useEffect(() => {
		if(inputDateRef.current) {
			inputDateRef.current.valueAsDate = new Date();
		}
	},[])

	return (
		<form>
			<table>
			<thead>
				<tr>
					<th>value</th>
					<th>date</th>
					<th>user</th>
					<th>comment</th>
				</tr>
			</thead>
			<tbody>	
				{	
				tableData.map( item => (
					<tr>
						<td>{item.num}</td>
						<td>{item.date}</td>
						<td>{item.user}</td>
						<td>{item.comment}</td>
					</tr>
				))		
				}
				<tr>
					<td>
					<input id="input-number" name="num" type="number" required placeholder="input for numbers" onChange={handleInputChange}/>
					</td>
					<td>
					<input id="input-date" ref={inputDateRef} name="date" type="date" required/>
					</td>
					<td>
					<select id="input-user" ref={inputUserRef} name="user">
						<option>Petro</option>
						<option>Roman</option>
						<option>Anna</option>
					</select>
					</td>
					<td>
					<input id="input-text" name="comment" type="text" required placeholder="input for text" onChange={handleInputChange}/>
					</td>
				</tr>
			</tbody>
			</table>
			<button id="add-button" onClick={addData}>Add</button>
			<button id="close-button" onClick={close}>Close</button>
		</form>
	)
}
