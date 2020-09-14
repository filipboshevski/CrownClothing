import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    body {
        font-family: 'Open Sans Condensed';
        padding: 20px 50px;

        
        @media screen and (max-width: 800px) {
            padding: 10px; 
        }
    }
    
    a {
        text-decoration: none;
        color: black;
    }

`;

export default GlobalStyles;
    