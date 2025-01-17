import Button from '../../../../admin-x-ds/global/Button';
import React, {ReactNode, useState} from 'react';

export interface APIKeyFieldProps {
    label: string;
    text?: string;
    hint?: ReactNode;
    onRegenerate?: () => void;
}

const APIKeyField: React.FC<APIKeyFieldProps> = ({label, text = '', hint, onRegenerate}) => {
    const [copied, setCopied] = useState(false);

    const copyText = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return <>
        <div className='p-0 py-1 pr-4 text-grey-600'>{label}</div>
        <div className='group relative overflow-hidden rounded p-1 hover:bg-grey-100'>
            {text}
            {hint}
            <div className='invisible absolute right-0 top-[50%] flex translate-y-[-50%] gap-1 group-hover:visible'>
                {onRegenerate && <Button color='grey' label='Regenerate' size='sm' onClick={onRegenerate} />}
                <Button color='black' label={copied ? 'Copied' : 'Copy'} size='sm' onClick={copyText} />
            </div>
        </div>
    </>;
};

const APIKeys: React.FC<{keys: APIKeyFieldProps[]}> = ({keys}) => {
    return (
        <div className='grid grid-cols-[max-content_1fr]'>
            {keys.map(key => <APIKeyField key={key.label} {...key} />)}
        </div>
    );
};

export default APIKeys;
