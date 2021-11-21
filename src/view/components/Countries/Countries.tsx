import React, { FC } from 'react';

export type CountriesProps = {
    countries:Array<any>,
	sortData:any
}

const Countries:FC <CountriesProps> = ({ countries,  sortData}) => {
	
	return (

			<div className='container'>
				<h3 className='center-align'>Country</h3>
				<div className='custom-responsive'>
					<table className=''>
						<thead className=''>
							<tr>
								<th className='green' onClick={() => {sortData("name")}}>
									Name
								</th>
								<th className='red' onClick={() => {sortData("area")}}>
									Area
								</th>
								<th className='blue' onClick={() => {sortData("population")}}>
									Population
								</th>
							</tr>
						</thead>
							{countries.map((country) => (
								<tr className='tr'>
									<td className='green'>
										{country.name}{' '}
										<img src={country.flag} alt='flag' style={{ width: 25 }} />
									</td>
									<td className='red'  >{country.area}</td>
									<td className='blue'  >{country.population}</td>
								</tr>
							))}
					</table>
				</div>
			</div>

	);
};
export default Countries;
