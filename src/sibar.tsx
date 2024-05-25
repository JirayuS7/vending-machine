
import React from 'react'
import { Tag } from 'antd';
import SibarPayment from './components/SibarPayment';

export default function SibarCart() {
    return (
        <> 
        {/*  check out page  */}
        <div className='p-2'>


            <div>
                <h2 className='text-white'>Check Out

                    <span className='ms-2 fs-6 text-warning'> ( 2 ) </span>
                </h2>
            </div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Beer Name</div>
                        <div className='d-flex justify-content-between '>
                            <span> x 2</span>

                            <div>
                                <span className='text-warning'>$ 100</span>
                            </div>
                        </div>
                    </div>
                    <span className="badge text-bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Subheading</div>
                        Content for list item
                    </div>
                    <span className="badge text-bg-primary rounded-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Subheading</div>
                        Content for list item
                    </div>
                    <span className="badge text-bg-primary rounded-pill">14</span>
                </li>
            </ol>


            <div className='d-flex px-2  justify-content-between py-2'>
                <div className='text-white fs-5'>Total
                    <span className='fs-6 ms-1  opacity-50 '>
                        x  10
                    </span>
                </div>
                <div className='text-warning fs-4'> $ 100</div>
            </div>

          

        </div>


        {/*   Payment  */}


            <div className='p-2'>
                    <SibarPayment/>
            </div>  


            <div  className='p-2'>
                <button className='btn btn-warning w-100 mt-2 fw-bolder'>Check Out</button>
            </div>
        </>
    )
}
