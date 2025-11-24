import { useEffect } from "react";
import Input from "../components/input";

import '../styles/index.scss';

export default function Index() {
    useEffect(() => {
        document.title = "EverLearning-Courses";
        // fetchData();
    }, []);
    return (
        <div className="page-container courses-page">
            <h2>Recommendations for you</h2>
            <h2>HOT</h2>
            <h2>Latest</h2>
        </div>
    );
}