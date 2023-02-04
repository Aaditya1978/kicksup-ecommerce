import Header from "../header/Header";
import "./team.scss";
import member1 from "../../assets/zidane.jpg";
import member2 from "../../assets/tonikroos.jpg";
import member3 from "../../assets/ikercasillas.jpg";
import member4 from "../../assets/james.jpg";
import member5 from "../../assets/christiano.jpg";
import facebookIcon from "../../assets/facebook.png";
import mediumIcon from "../../assets/medium.png";
import linkedinIcon from "../../assets/linkedin.png";

export default function Team() {
    return (
        <>
        <Header />
        <div className="team">
            <div className="heading">
                Without bonding and coordination, every project is failure. Look at who makes KICKSUP great. ;)
            </div>
            <div className="team-members">
                <div className="member">
                    <img className="member-image" src={member1} alt="member" />
                    <div className="member-info">
                        <div className="member-name">Zidane</div>
                        <div className="member-position">Leadership & Management</div>
                        <div className="member-social">
                            <img className="social-icon" src={linkedinIcon} alt="linkedin" />
                            <img className="social-icon" src={mediumIcon} alt="medium" />
                            <img className="social-icon" src={facebookIcon} alt="facebook" />
                        </div>
                    </div>
                </div>
                <div className="member">
                    <img className="member-image" src={member2} alt="member" />
                    <div className="member-info">
                        <div className="member-name">Toni Kroos</div>
                        <div className="member-position">Product Developer</div>
                        <div className="member-social">
                            <img className="social-icon" src={linkedinIcon} alt="linkedin" />
                            <img className="social-icon" src={mediumIcon} alt="medium" />
                        </div>
                    </div>
                </div>
                <div className="member">
                    <img className="member-image" src={member3} alt="member" />
                    <div className="member-info">
                        <div className="member-name">Iker Casillas</div>
                        <div className="member-position">Marketing Strategy</div>
                        <div className="member-social">
                            <img className="social-icon" src={mediumIcon} alt="medium" />
                        </div>
                    </div>
                </div>
                <div className="member">
                    <img className="member-image" src={member4} alt="member" />
                    <div className="member-info">
                        <div className="member-name">James</div>
                        <div className="member-position">Product designer</div>
                        <div className="member-social">
                            <img className="social-icon" src={mediumIcon} alt="medium" />
                            <img className="social-icon" src={facebookIcon} alt="facebook" />
                        </div>
                    </div>
                </div>
                <div className="member">
                    <img className="member-image" src={member5} alt="member" />
                    <div className="member-info">
                        <div className="member-name">Cristiano</div>
                        <div className="member-position">Financial operations</div>
                        <div className="member-social">
                            <img className="social-icon" src={linkedinIcon} alt="linkedin" />
                            <img className="social-icon" src={facebookIcon} alt="facebook" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="heading">
                and You! ;)
            </div>
        </div>
        </>
    );
}