import CreateBuy from "./CreateBuy"
import CreateSell from "./CreateSell"
import {Nav, Tab} from "react-bootstrap";
import React, {useState} from "react";
import StepCounter from "./StepCounter";


const BuySellTab = () =>{

    const [formStep, setFormStep] = useState(1)

    console.log(formStep)

    return(
        <>
            <div className='nav-pills row justify-content-center py-2'>
                <div className="col-12 text-center fc-cool-blue font-weight-bold mb-5">
                    Create Order
                </div>
                <Tab.Container defaultActiveKey={"buy"}>
                    <Nav as='ul' className='custom-tab-1 col-9 text-center'>
                        <Nav.Item as='li' className={"nav-buy"}>
                            <Nav.Link eventKey={"buy"}  >
                               Buy
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as='li' className={"nav-sell"}>
                            <Nav.Link eventKey={"sell"}>
                                Sell
                            </Nav.Link>
                        </Nav.Item>

                        <StepCounter step={formStep}/>
                    </Nav>


                    <Tab.Content className=' col-8 px-5 my-4'>
                        <Tab.Pane eventKey={"buy"} className="row test" >
                            <CreateBuy formStep={formStep} setFormStep={(e)=>setFormStep(e)} />
                        </Tab.Pane>

                        <Tab.Pane eventKey={"sell"} className="row">
                            <CreateBuy formStep={formStep} setFormStep={(e)=>setFormStep(e)}/>
                        </Tab.Pane>

                    </Tab.Content>


                </Tab.Container>
            </div>
        </>
    )
}

export default BuySellTab