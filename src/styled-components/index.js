import styled, {injectGlobal} from 'styled-components';

export const Content = styled.div`
    border: 1px solid #eaecee;
    background: whitesmoke;
    padding: 2em 4em;
    list-style: none;
    margin-left: 0;
    margin-right: 1.5rem;
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center
`

export const Main = styled.section`
    margin: 1em;
    border-top: 1em solid ${({colour}) => colour};
    border-right: 1em solid ${({colour}) => colour};
    border-radius: 15px;
`

export const Container = styled.div`
    margin: 1em;
`

export const Centraliser = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${({shrink}) => shrink ? 'max-width: 50%;' : ''};
    margin: 0;

    figure {
        width: 50vw;
    }
`

export const Meta = styled.div`
    border-radius: 1em;
    margin: 1px;
    background-color: ${({colour}) => colour};
`

export const List = styled.ul`
    
`

export const ListItem = styled.li`
    border: 3px;
    list-style-type: none;
    display: inline-block;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;

    a {
        color: ${({colour}) => colour};
    }
`

export const Title = styled.h3`
    font-size: 2em;
`

export const Subtitle = styled.h4`
    font-size: 1.5em;
    margin: 0.5em;
    padding: 0.5em;
`

export const Opener = styled.h6`
    font-size: 1.1em;
    margin: 0;
    padding: 0.5em;
`

export const Paragraph = styled.p`
    font-size: 1em;
`

export const Detail = styled.p`
    font-size: 0.75em;
`

export const NavBar = styled.nav`
    min-width: 100%;
    position: relative;
    display: flex;
    align-items: left;
    padding-left: 1em;
`

export const NavBarItem = styled.span`
    padding: 0.5px;
`

export const IconHolder = styled.img`
    height: 1rem;
    margin: 0;
`

export const HeadLetter = styled.span`
    font-family: ${({font}) => `'${font}'`};
    padding: 1px;
    background-color: ${({colour}) => colour};
`