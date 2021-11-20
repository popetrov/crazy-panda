import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from '../Countries/Countries';
import Pagination from '../Pagination/Pagination';



export const TablePage = () => {
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(25);

	useEffect(() => {
		const getCountries = async () => {
			setLoading(true);
			const res = await axios.get('https://restcountries.com/v2/all');
			setCountries(res.data);
			setLoading(false);
		};

		getCountries();
	}, []);

	const lastCountryIndex = currentPage * countriesPerPage;
	const firstCountryIndex = lastCountryIndex - countriesPerPage;
	const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex);

	const getPagination = (pageNumber:any) => setCurrentPage(pageNumber);
	const getNextPage = () => setCurrentPage((prev) => prev + 1);
	const getPrevPage = () => setCurrentPage((prev) => prev - 1);

	if (loading) {
		return (
				<div className='center'>
					<h2>Loading...</h2>
					<div className='preloader-wrapper big active'>
						<div className='spinner-layer spinner-blue'>
							<div className='circle-clipper left'>
								<div className='circle'></div>
							</div>
							<div className='gap-patch'>
								<div className='circle'></div>
							</div>
							<div className='circle-clipper right'>
								<div className='circle'></div>
							</div>
						</div>
					</div>
				</div>
		);
	}

	return (
		<div className='row'>
			<div className='container'>
				<h3 className='center-align'>Country</h3>
				<div className='custom-responsive'>
					<table className=''>
						<thead className=''>
							<tr>
								<th className='green' onClick={() => {}}>
									Name
								</th>
								<th className='red' onClick={() => {}}>
									Area
								</th>
								<th className='blue' onClick={() => {}}>
									Population
								</th>
							</tr>
						</thead>
						<Countries countries={currentCountry} />
					</table>
				</div>
			</div>
			<Pagination
				countriesPerPage={countriesPerPage}
				totalCountries={countries.length}
				paginate={getPagination}
				nextPage={getNextPage}
				prevPage={getPrevPage} number={0}			
				/>
		</div>
	);
};
