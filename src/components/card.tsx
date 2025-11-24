import type React from "react";

interface CardProps {
    className?: string;
    title?: String | React.ReactNode;
    children?: React.ReactNode;
}
function Card({
    className = "",
    title,
    children
}: CardProps) {
    return (

        <div className={`el-card ${className}`}>
            <div className="el-card-wrap">
                {
                    title ? (<div className="el-card-header mb-4">
                        {title}
                    </div>) : null
                }

                <div className="el-card-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Card;