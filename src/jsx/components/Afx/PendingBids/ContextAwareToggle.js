import {useContext} from "react";
import {AccordionContext, useAccordionToggle} from "react-bootstrap";

function ContextAwareToggle({ children, eventkey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventkey,
        () => callback && callback(eventkey),
    );

    const isCurrentEventKey = currentEventKey === eventkey;

    return (
        <button
            type="button"
            className={"btnSmall fs-10 fc-cool-blue"}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

export default ContextAwareToggle