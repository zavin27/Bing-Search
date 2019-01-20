import * as React from 'react'

interface Props {
    name: string;
    url: string;
    snippet: string
}

export const WebPageItem: React.FunctionComponent<Props> = (props) => (
    <div>
        <a href={props.url}>
            <h5>{props.name}</h5>
        </a>
        <a href={props.url} style={{color: 'rgb(82, 133, 80)', fontSize: 13}}>{props.url}</a>
        <p style={{fontSize: 13}}>{props.snippet}</p>
    </div>
);
