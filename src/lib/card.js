import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Quart, TweenMax } from "gsap";
import './card.scss';

/**
 * @param number - the number to display in a card animation
 * @desc A card component displays the previous number and
 * animates to the desired number.
 */
function Card({number}) {

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [topValue, setTopValue] = useState((number+1)%10);
    const [botValue, setBotValue] = useState((number+1)%10);

    // REFERENCES ------------------------------------------------------------------------------------------------------

    const top = useRef(null);
    const topBack = useRef(null);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Whenever the number prop changes,
     * animate card to simulate flipping, and
     * update with the next number.
     */
    useEffect(() => {
        TweenMax.to(top.current, .8, {
            rotationX           : '-180deg',
            transformPerspective: 300,
            ease                : Quart.easeOut(1),
            onComplete          : function() {
                setTopValue(number);
                setBotValue(number);
                TweenMax.set(top.current, { rotationX: 0 });
            }
        });

        TweenMax.to(topBack.current, .8, {
            rotationX           : 0,
            transformPerspective: 300,
            ease                : Quart.easeOut(1),
            clearProps          : 'all'
        });
    }, [number]);

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    return (
        <div className={"figure"}>
            <span className="top" ref={top}>{topValue}</span>
            <span className="top-back" ref={topBack}>
              <span>{number}</span>
            </span>
            <span className="bottom">{botValue}</span>
            <span className="bottom-back">
              <span>{number}</span>
            </span>
        </div>
    );
}

Card.propTypes = {
  number: PropTypes.number
};

export default Card;
