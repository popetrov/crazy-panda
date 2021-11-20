import React, { FC } from 'react';

export type CountriesProps = {
    countries:Array<any>,
}

const Countries:FC <CountriesProps> = ({ countries}) => {
	
	return (
		<>
			{countries.map((country, i) => (
				<tr className='tr'>
					<td className='green'>
						{country.name}{' '}
						<img src={country.flag} alt='flag' style={{ width: 25 }} />
					</td>
					<td className='red'>{country.area}</td>
					<td className='blue'>{country.population}</td>
				</tr>
			))}
		</>
	);
};
export default Countries;
