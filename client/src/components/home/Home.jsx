import Header from "../header/Header";
import "./home.scss";

export default function Home() {
    return (
        <>
        <Header />
        <div className="home">
            <div className="header">
                Welcome to KicksUp
            </div>
            <div className="subheader">
                The best place to buy your favourite sneakers
            </div>
        </div>
        </>
    );
}