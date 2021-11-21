import React, { FC } from 'react';

export type PaginationProps = {
	countriesPerPage:number,
	totalCountries:number,
	paginate: ({})=>void,
	nextPage: ()=>void,
	prevPage: ()=>void,
	number:number
}

const Pagination:FC <PaginationProps> = ({
	countriesPerPage,
	totalCountries,
	paginate,
	nextPage,
	prevPage,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='center-align'>
			<ul className='pagination'>
				<button
					className='waves-effect waves-light btn'
					onClick={() => prevPage()}
				>{`<`}</button>
				{pageNumbers.map((number) => (
					<li key={number}>
						<button
							className='waves-effect waves-light btn'
							onClick={() => paginate(number)}
						>
							{number}
						</button>
					</li>
				))}
				<button
					className='waves-effect waves-light btn'
					onClick={() => nextPage()}
				>{`>`}</button>
			</ul>
		</div>
	);
};
export default Pagination;
