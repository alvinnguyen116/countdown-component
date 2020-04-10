import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Card from "./card";
import './countdown.scss';

/**
 * @param seconds - the number of seconds to countdown from
 * @param className - a class to assign to the wrapper component
 * @desc A Countdown components counts down from a given
 * number of seconds. (Maximum 24 hr)
 */
function Countdown({seconds, className=''}) {

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [localSeconds, setLocalSeconds] = useState(seconds);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Subtracts the local seconds by one
     * every second, until it reaches zero.
     */
    useEffect(() => {
        let intervalId;
        if (localSeconds > 0) {
            intervalId = setTimeout(() => setLocalSeconds(localSeconds-1), 1000);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [localSeconds]);

    // UTILITY ---------------------------------------------------------------------------------------------------------

    /**
     * @param num {int}
     * @desc Pads a number with 0's and returns
     * an array of integers.
     */
    function prettify(num) {
      return num.toString(10).padStart(2, "0").split("").map(val => parseInt(val,10));
    }

    function renderBlock(title, num) {
        num = prettify(num);
        return (
            <div className="bloc-time">
                <span className="count-title">{title}</span>
                <div className={"cards"}>
                    <Card number={num[0]}/>
                    <Card number={num[1]}/>
                </div>
            </div>
        );
    }

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    const s = localSeconds % 60;
    const m = Math.floor( (localSeconds % 3600) / 60);
    const h = Math.floor((localSeconds % 86400) / 3600);

    return (
        <div className={`countdown ${className}`}>
            {renderBlock("Hours", h)}
            {renderBlock("Minutes", m)}
            {renderBlock("Seconds", s)}
        </div>
    );
}

Countdown.propTypes = {
    seconds: PropTypes.number
};

export default Countdown;