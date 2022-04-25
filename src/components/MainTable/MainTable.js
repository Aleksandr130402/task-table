import { Fragment, useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';

import './style.css'


const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

export default function MainTable({data, addTableCell}) {
	
	const [years] = useState([2017, 2018, 2019]);
	const [rows, setRows] = useState([]);
	const classes = useStyles();

	const getWW = useCallback((yy, zz) => {
		return yy * zz;
	},[])

	useEffect(() => {
		function createData(name, params) {
			console.log(params)
			return { name, params };
		}

		const getValuesForYears = (regionName) => {
			const values = [];

			const currentRegion = data[regionName];
		
			years.forEach(item => {
				if(Object.keys(currentRegion.G).includes(item.toString())) {
					values.push({
						year: item,
						properties: currentRegion.G[item]
					})
				} else {
					values.push({
						year: item,
						properties: {
							XX: {
								value: 0,
								dateRelease: '-'
							},
							YY: {
								value: 0,
								dateRelease: '-'
							},
							ZZ: {
								value: 0,
								dateRelease: '-'
							}
						}			
					})
				}
			})
			
			return values;
		}

		setRows([
			createData('Kyivska', getValuesForYears('Kyivska')),
			createData('Odeska', getValuesForYears('Odeska')),
			createData('Lvivska', getValuesForYears('Lvivska'))
		]);
	},[data, years]);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell rowSpan={2}>regions</TableCell>
						{years.map((year, key) => (
							<TableCell key={key} align="center" colSpan={4}>
								{year}            
							</TableCell> 
						))}                    
					</TableRow>
					<TableRow>
						{years.map(year => (
							<Fragment key={year}>
								<TableCell>xx</TableCell>
								<TableCell>yy</TableCell>
								<TableCell>zz</TableCell>
								<TableCell>ww</TableCell>
							</Fragment>
						))}
					</TableRow>       
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						return(
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								{
									row.params.map((param, key) => {
										return (
											<Fragment key={key}>
												{
												Object.keys(param.properties).map(property => (
													<TableCell key={property}>
														<Link 
															to={`/popup/${param.properties[property].value}`} 
															onClick={() => addTableCell(row.name, param.year, property)}
														>
															{param.properties[property].value}
															<Divider/>
															{param.properties[property].dateRelease}
														</Link>
													</TableCell>
												))	
												}																						
												<TableCell>
													{getWW(param.properties.YY.value, param.properties.ZZ.value)}					
												</TableCell> 
											</Fragment>
										)							
									})
								}							         
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
