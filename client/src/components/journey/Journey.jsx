import Header from "../header/Header";
import "./journey.scss";
import grassPic from "../../assets/grasspic.jpg";

export default function Journey() {
    return (
        <>
        <Header />
        <div className="journey">
            <div className="image">
                <img src={grassPic} alt="grass pic" />
                <div className="title">The Journey</div>
            </div>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="marker"></div>
                    <div className="timeline-item-heading">The Roots</div>
                    <div className="timeline-item-subheading">
                        Our entire life when we shop, we are limited by choices that are there in a store.
                        We are often on the side where we buy our favourite coloured shoes made by someone 
                        else but what if we designed ? What if we could involve in the making of a shoe 
                        we want to buy? This little thought sprouted to become what we aretoday, KICKSUP ;)
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="marker"></div>
                    <div className="timeline-item-heading">Chapter I</div>
                    <div className="timeline-item-subheading">
                        Understanding the trends in the industry and what the users think when they
                        buy were our top priorities before we moved further in the building.
                        After weeks ofbutul research, we stepped into the user's shoes and look at what we plan 
                        to do. It's a great joy for the users if they are involved in the making. 
                        We're heading into an era of technology and people prefer online shopping to shopping in 
                        an outer.
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="marker"></div>
                    <div className="timeline-item-heading">Chapter II</div>
                    <div className="timeline-item-subheading">
                        Every milestone begins with a single step and before KICKSUP sprouted, the team manufactured 
                        in small scale with two users a month. This experience was crucial to our brand as this is 
                        our first practical experience. Interacting with the users was the best thing ever. 
                        The positive reviews and support from people motivated us to push our limits further.
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="marker"></div>
                    <div className="timeline-item-heading">KICKSUP</div>
                    <div className="timeline-item-subheading">
                        Here we are, made a perfect platform for you to involve in the making of a shoe you want 
                        to buy! We have evolved ever since we started out. We wish to help you more and make KICKSUP
                        a bigger team. Design your shoe and be a part of our journey!
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}