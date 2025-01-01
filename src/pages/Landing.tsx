import Feeds from "../components/Feeds";
import SearchMain from "../components/SearchMain";
import "./landing.css";

export default function Landing() {
    return (
        <div className="landing">
           <SearchMain />
            <Feeds />
        </div>
    );
}
