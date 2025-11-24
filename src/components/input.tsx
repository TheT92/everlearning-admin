interface Props {
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number'; // 限制类型选项
    className?: string;
    name?: string;
}

export default function Input({ 
    type = "text", 
    placeholder = "请输入...",
    className = "",
    name=""
}: Props) {
    const HandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed. Current input value:', (event.target as HTMLInputElement).value);
            // 在这里可以添加按下回车键后的逻辑处理
        }
    };
    return (
        <input name={name} type={type} className={`el-input ${className}`} onKeyDown={HandleKeyDown} placeholder={placeholder} />
    );
}