import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
const ThemeContextProvider = (props) => {

    // Local Storage: setting & getting data
    const storedData = JSON.parse(localStorage.getItem('userDetails'))

    const [userData, setUserData] = useState(null)


    const body = document.querySelector("body");
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);


    useEffect(() => {

        const body = document.querySelector("body");
        body.setAttribute("data-typography", "poppins");
        //body.setAttribute("data-theme-version", "light");
        body.setAttribute("data-theme-version", "dark");
        body.setAttribute("data-layout", "vertical");
        body.setAttribute("data-nav-headerbg", "color_1");
        body.setAttribute("data-headerbg", "color_1");
        body.setAttribute("data-sidebar-style", "overlay");
        body.setAttribute("data-sibebarbg", "color_1");
        body.setAttribute("data-primary", "color_1");
        body.setAttribute("data-sidebar-position", "fixed");
        body.setAttribute("data-header-position", "fixed");
        body.setAttribute("data-container", "wide");
        body.setAttribute("direction", "ltr");
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);


    let [customerId, setCustomerId] = useState(null)
    let [customerLevel, setCustomerLevel] = useState(null)
    let [customerToken, setCustomerToken] = useState(null)


    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        window.innerWidth >= 768 && window.innerWidth < 1300
            ? body.setAttribute("data-sidebar-style", "overlay")
            : window.innerWidth <= 768
                ? body.setAttribute("data-sidebar-style", "overlay")
                : body.setAttribute("data-sidebar-style", "full");
    };
    return (
        <ThemeContext.Provider
            value={{
                body,
                customerId,
                customerLevel,
                customerToken,
                windowWidth,
                windowHeight,
                userData,
                updateUserData: (e) => {
                setUserData(e)
            }
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
