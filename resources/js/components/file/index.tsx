import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useRef, useState } from 'react';


interface Props {
    title:string;
    multi?:boolean;
    maxSizeMB?:number;
    onChange:(file:FileList)=>void
}

const MB = 1024**2;

const FileInput:React.FC<Props> = ({title,multi,onChange,maxSizeMB}) => {

    const [error,setError] = useState('');
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = useState<FileList|null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        if(e.target.files){

            if(maxSizeMB && e.target.files[0].size > maxSizeMB*MB){
                setError(`Max File size allowed is ${(maxSizeMB).toFixed(2)} MB`)
                return;
            }

            onChange(e.target.files);
            setError('');
            setFileSelected(e.target.files);
        }
    }

    const removeFile = () => {
        //@ts-ignore
        fileInput.current?.value = null;
        setFileSelected(null);
    }

    useEffect(()=> {
        Inertia.on('finish',() => {
            setFileSelected(null);
        });
    },[]);

    return (
        <>
            <label>{title}</label>
            <div>
                <input 
                    hidden
                    ref={fileInput}
                    type={multi ? 'file[]' : 'file'} 
                    onChange={handleChange}
                />
                {
                    fileSelected?.length ?
                        <button
                            type={'button'}
                            className="btn btn-danger text-white"
                            onClick={removeFile}
                            dangerouslySetInnerHTML={{
                                __html:`${fileSelected[0].name} (${(fileSelected[0].size/MB).toFixed(2)} MB) &#10005;` 
                            }}
                    >
                    </button>
                    :
                    <button
                        type={'button'}
                        className="btn btn-primary"
                        onClick={()=>fileInput.current?.click()}
                    >
                        Choose File
                    </button>
                }
            </div>
            {
                error && (
                    <div className="text-danger">
                        {error}
                    </div>
                )
            }
        </>
    )
}
export default FileInput;