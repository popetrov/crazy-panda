import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './view/components/Countries';
import Pagination from './view/components/Pagination';

function App() {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(25);

	useEffect(() => {
		const getCountries = async () => {
			setLoading(true);
			const res = await axios.get('https://restcountries.com/v2/all');
			console.log(res.data);
			setCountries(res.data);
			setLoading(false);
		};

		getCountries();
	}, []);

	const lastCountryIndex = currentPage * countriesPerPage;
	const firstCountryIndex = lastCountryIndex - countriesPerPage;
	const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex);

	const getPagination = (pageNumber) => setCurrentPage(pageNumber);
	const getNextPage = () => setCurrentPage((prev) => prev + 1);
	const getPrevPage = () => setCurrentPage((prev) => prev - 1);

	return (
		<div className='row'>
			<div className='container'>
				<h3 className='center-align'>Country</h3>
				<div className='custom-responsive'>
					<table className=''>
						<thead className=''>
							<tr>
								<th className='green'>Name</th>
								<th className='red'>Area</th>
								<th className='blue'>Population</th>
							</tr>
						</thead>
						<Countries countries={currentCountry} loading={loading} />
					</table>
				</div>
			</div>
			<Pagination
				countriesPerPage={countriesPerPage}
				totalCountries={countries.length}
				paginate={getPagination}
				nextPage={getNextPage}
				prevPage={getPrevPage}
			/>
		</div>
	);
}

export default App;
