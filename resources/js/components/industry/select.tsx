import React from 'react';

const industries = [
    'Hospitality',
    'Engineering',
    'Others'
];

interface Props {
    value: string;
    required?:boolean;
    onChange:(value:string)=>void
}

const IndustrySelect:React.FC<Props> = props => {

    return (
        <select 
            value={props.value}
            className="form-control" 
            {...props.required ? 'required' : ''} 
            onChange={e=>props.onChange(e.target.value)}
            >
            <option value="" {...props.required ? 'disabled' : ''}>
                Select Industry
            </option>
            {
                industries.map(industry => (

                    <option 
                        value={industry}
                        key={industry}
                    >
                        {industry}
                    </option>
                ))
            }
        </select>
    )
}
export default IndustrySelect;