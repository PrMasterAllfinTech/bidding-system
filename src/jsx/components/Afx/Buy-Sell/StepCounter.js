import "./index.css"

const StepCounter = ({step}) => {

    const stepNumber = {
        '1': ['finish', 'wait', 'wait'],
        '2': ['finish', 'process', 'wait'],
        '3': ['finish', 'finish', 'process'],
        '4': ['finish', 'finish', 'finish']
    }

    const stepBars = {
        '1': ['process', 'wait', 'wait'],
        '2': ['process', 'process', 'wait'],
        '3': ['process', 'process', 'process'],
        '4': ['process', 'process', 'process']
    }
    const currentBar= stepBars[step] || 'error x.x'

    const currentNumber= stepNumber[step] || 'error x,x'

    return (
        <div className="css-enhan1 w-100 px-5 mt-5">
            <div className="bn-steps-step css-1pqhwvz" data-status={currentNumber[0]}>
                <div className="css-yyvsvt">
                    <div data-bn-type="text" className="css-vdqias">Tipo y Precio</div>
                    <div className="step_marker_row css-vurnku" data-class="step_marker_row">
                        <span data-bn-type="text"
                              data-class="step_marker_number"
                              className="css-1p4nx4e">1</span>
                    </div>
                </div>
            </div>
            <div data-status-line={currentBar[0]} className="css-13dco2g"></div>
            <div className="bn-steps-step css-1pqhwvz" data-status={currentNumber[1]}>
                <div className="css-yyvsvt">
                    <div data-bn-type="text" className="css-vdqias">Metodo de Pago</div>
                    <div className="step_marker_row css-vurnku" data-class="step_marker_row">
                        <span data-bn-type="text"
                              data-class="step_marker_number"
                              className="css-1p4nx4e">2</span>
                    </div>
                </div>
            </div>
            <div data-status-line={currentBar[1]}   className="css-13dco2g"></div>
            <div className="bn-steps-step css-1pqhwvz" data-status={currentNumber[2]}>
                <div className="css-yyvsvt">
                    <div data-bn-type="text" className="css-vdqias">Datos de Orden</div>
                    <div className="step_marker_row css-vurnku" data-class="step_marker_row">
                        <span data-bn-type="text"
                              data-class="step_marker_number"
                              className="css-1p4nx4e">3</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepCounter;