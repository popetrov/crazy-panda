import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from '../Countries/Countries';
import Pagination from '../Pagination/Pagination';
import { Loading } from '../Loading/Loading';



export const TablePage = () => {

	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);
	const[sort, setSort] = useState(true)
	const [searchValue, setSearchValue] = useState("")
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage] = useState(25);
	

	useEffect(() => {
		const getCountries = async () => {
			setLoading(true);
			const res = await axios.get("https://restcountries.com/v2/all");
			setCountries(res.data);
			setLoading(false);
		};

		getCountries();
	}, []);

	const Filtration = () =>{
		return(
			<div className="row">
				<form className="col s12">
					<div className="row">
						<div className="input-field col s12">
							<textarea id="textarea1" className="materialize-textarea" placeholder="input text" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></textarea>
							<label htmlFor="textarea1"></label>
						</div>
					</div>
				</form>
			</div>
		)
	}


	const filterCountry = countries.filter(country=>{
		//@ts-ignore
		return country.name.toLowerCase().includes(searchValue)
	})


	const lastCountryIndex = currentPage * countriesPerPage;
	const firstCountryIndex = lastCountryIndex - countriesPerPage;
	const currentCountry:any = filterCountry.slice(firstCountryIndex, lastCountryIndex);

	const getPagination = (pageNumber:any) => setCurrentPage(pageNumber);
	const getNextPage = () => setCurrentPage((prev) => prev + 1);
	const getPrevPage = () => setCurrentPage((prev) => prev - 1);
	
	
	const sortData = (field:any)=> {
		const copyData = countries.concat()
		let sortData: any;
		if(sort){
			sortData = copyData.sort(
				//@ts-ignore
				(a,b)=>{return a[field]>b[field]?1:-1}
			)
		}else{
			sortData = copyData.reverse(
				//@ts-ignore
				(a,b)=>{return a[field]>b[field]?1:-1}
			)
		}

		setCountries(sortData)
		setSort(!sort)
	}

	if (loading) {
		return (
				<Loading/>
		);
	}

	return (
		<div className='row'>
			<Filtration />
			<Countries countries={currentCountry} sortData={sortData}/>
			<Pagination
				countriesPerPage={countriesPerPage}
				totalCountries={countries.length}
				paginate={getPagination}
				nextPage={getNextPage}
				prevPage={getPrevPage} 
				number={0}			
				/>
		</div>
	);
};




