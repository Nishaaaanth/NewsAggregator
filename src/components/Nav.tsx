import "./nav.css";

export default function Nav() {
    return (
        <div className="nav-bar">
            <div className="logo" onClick={()=> location.reload()}>
                NewsAgg
            </div>
            <h4>
                innoscripta
            </h4>
        </div>
    );
}
