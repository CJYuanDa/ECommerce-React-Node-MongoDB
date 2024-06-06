import React from "react";
import './DescriptionBox.css';

function DescriptionBox() {
    return(
        <div className="descriptionBox">
            <div className="descriptionBox-navigator">
                <div className="descriptionBox-nav-box">Description</div>
                <div className="descriptionBox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionBox-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facilis dicta iure architecto tempore culpa minima non labore nulla quos ea laudantium neque, ratione debitis molestias? Mollitia recusandae totam nobis perferendis repudiandae, labore quod voluptatibus! Ducimus architecto ipsum, quia suscipit laudantium maxime rerum consequuntur eius vero itaque eos modi sunt!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque nam iste accusamus fuga iusto magni adipisci recusandae architecto fugiat libero?</p>
            </div>
        </div>
    );
}

export default DescriptionBox;