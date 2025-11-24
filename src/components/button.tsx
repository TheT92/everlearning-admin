interface Props {
    className?: string;
    children: React.ReactNode;
    outlined?: boolean;
    size?: 'sm' | 'md' | 'lg';
    type?: "button" | "submit" | "reset";
    onClick?: (...args: any) => void;
    mode?: 'text' | null | '';
}

export default function Button({
    className = "",
    children,
    outlined = false,
    size= 'md',
    type = "button",
    onClick = () => {},
    mode = ''
}: Props) {
    return (
        <button type={type} onClick={onClick} className={`el-btn ${mode == 'text' ? 'el-btn-text' : ''} ${`el-btn-`+size} ${outlined ? 'el-btn-outline' : ''} ${className}`}>{children}</button>
    );
}