import React, {Fragment, useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import HomeTabChart from './Chart/HomeTabChart';


function Home(props) {

	//const {userData, setUserData}= useContext(ThemeContext);

	useEffect(() =>{
		(
			async  ()=> {
				try{
				//	const response = await axios.get('user');
				//	console.log('use effect response :'+response)
				}catch (e) {console.log('fail login');}

			}
		)()

	}, []);

	return(
		<Fragment>
			<div className="row justify-content-center">
				<div className="col-lg-10">
					<div className="card ticket-bx">
						<div className="card-body bg-main">
							<div className="d-sm-flex d-block pb-sm-3 align-items-end">
								<div className="mr-auto pr-3 mb-2 mb-sm-0">
									<span className="text-white fs-20 font-w200 d-block mb-sm-3 mb-2">Today's payments</span>
									<h2 className="fs-40 text-white mb-0">45<span className="fs-18 ml-2">requests processed</span></h2>
								</div>
								<div className="d-flex flex-wrap">
									<svg width="87" height="58" viewBox="0 0 87 58" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M18.4571 37.6458C11.9375 44.6715 4.81049 52.3964 2 55.7162H68.8125C77.6491 55.7162 84.8125 48.5528 84.8125 39.7162V2L61.531 31.9333C56.8486 37.9536 48.5677 39.832 41.746 36.4211L37.3481 34.2222C30.9901 31.0432 23.2924 32.4352 18.4571 37.6458Z" fill="url(#paint0_linear)"/>
										<path d="M2 55.7162C4.81049 52.3964 11.9375 44.6715 18.4571 37.6458C23.2924 32.4352 30.9901 31.0432 37.3481 34.2222L41.746 36.4211C48.5677 39.832 56.8486 37.9536 61.531 31.9333L84.8125 2" stroke="white"  strokeLinecap="round"/>
										<defs>
										<linearGradient id="paint0_linear" x1="43.4062" y1="8.71453" x2="46.7635" y2="55.7162" gradientUnits="userSpaceOnUse">
										<stop stopColor="white" offset="0"/>
										<stop offset="1" stopColor="white" stopOpacity="0"/>
										</linearGradient>
										</defs>
									</svg>
									<div className="ml-3">
										<p className="text-warning fs-20 mb-0">+4%</p>
										<span className="fs-12">than last day</span>
									</div>
								</div>
							</div>
							<div className="progress mt-3 mb-4" style={{height:"15px"}}>
								<div className="progress-bar-striped progress-bar-animated" style={{width: "86%", height:"15px"}} role="progressbar">
									<span className="sr-only">86% Complete</span>
								</div>
							</div>
							<p className="fs-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini</p>
							<Link to={"#"} className="text-white">View detail<i className="las la-long-arrow-alt-right scale5 ml-3"></i></Link>
						</div>
					</div>
				</div>	
				

				<div className="col-xl-10 col-xxl-10">
					<HomeTabChart />
				</div>

				
			</div>	
		</Fragment>
	)
}
export default Home;
