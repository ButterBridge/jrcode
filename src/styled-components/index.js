import styled from 'styled-components';
import { withBullet } from './with/withBullet';
import { withLink } from './with/withLink';

export const Bullet = styled.span`
    border-radius: 50%;
    padding: 0.5em;
    display: inline;
    color: ${({colour}) => colour};
    background: ${({colour}) => colour};
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

export const Container = styled.div`
    margin: 1em;
`

export const Content = styled.div`
    border-left: 1em solid ${({colour}) => colour};
    border-bottom: 1em solid ${({colour}) => colour};
    border-radius: 15px;
    padding: 1.5em;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center
`

export const Detail = styled.p`
    font-size: 0.8em;
    margin: 1em;
    color: white;
`

export const HeadLetter = styled.span`
    font-family: ${({font}) => `'${font}'`};
    font-size: 1.5em;
    width: 100%;
    background-color: ${({colour}) => colour};
    text-align: center;
    grid-column :  ${({gridCols : {from, to}}) => `${from} / ${to}`}
`

export const IconHolder = styled.img`
    height: 1rem;
    margin: 0;
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
export const LinkedListItem = withLink(ListItem);


export const Main = styled.section`
    margin: 1em;
    border-top: 1em solid ${({colour}) => colour};
    border-right: 1em solid ${({colour}) => colour};
    border-radius: 15px;
`

export const Meta = styled.div`
    border-radius: 1em;
    margin: 1px;
    background-color: ${({colour}) => colour};
`
export const LinkedMeta = withLink(Meta);

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

export const Opener = styled.h6`
    font-size: 1.1em;
    margin: 0;
    margin-bottom: 1em;
    padding: 0.5em;
`

export const Option = styled.h6`
    font-size: 1.1em;
    margin: 0.2em;
    padding: 0.2em;
`
export const BulletedOption = withBullet(Option);

export const Paragraph = styled.p`
    font-size: 1em;
    margin: 0;
`

export const Subtitle = styled.h4`
    font-size: 1.5em;
    margin: 0.5em;
    padding: 0.5em;
`

export const Title = styled.h3`
    font-size: 2em;
    margin: 0.1em;
    display: inline-block;
`
export const BulletedTitle = withBullet(Title);
export const LinkedBulletedTitle = withLink(BulletedTitle);











