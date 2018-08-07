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
    border: 1px solid green;
    margin: 1px;
    padding: 1em;
`

export const Meta = styled.div`
    border: 1px solid blue;
    margin: 1px;
`

export const List = styled.ul`
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

export const ListItem = styled.li`
    border: 3px;
    display: list-item block;
`

export const Title = styled.h3`
    font-size: 2em;
`

export const Subtitle = styled.h4`
    font-size: 1.5em;
`

export const Opener = styled.p`
    font-size: 1.2em;
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
`

export const NavBarItem = styled.span`
    padding: 2px;
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