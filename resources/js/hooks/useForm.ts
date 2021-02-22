import { useState } from "react";

const useForm = <S>(state: S): [S, (key: keyof S, value: string) => void] => {
    const [form, setForm] = useState(state);

    const onChange = (key: keyof S, value: string) => {
        const temp = { ...form };
        //@ts-ignore
        temp[key] = value;
        setForm(temp);
    };

    return [form, onChange];
};

export default useForm;
