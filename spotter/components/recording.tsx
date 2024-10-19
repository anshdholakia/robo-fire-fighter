import React from "react";
import styled from "styled-components";

const Button = () => {
    return (
        <StyledWrapper>
            <button className="button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    viewBox="0 0 24 24"
                    height="24"
                    fill="none"
                    className="svg-icon"
                >
                    <g strokeWidth={2} strokeLinecap="round" stroke="#ff342b">
                        <rect y="3" x="9" width="6" rx="3" height="11" />
                        <path d="m12 18v3" />
                        <path d="m8 21h8" />
                        <path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7" />
                    </g>
                </svg>
                <span className="lable">Record</span>
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 12px;
        gap: 8px;
        height: 40px;
        width: 114px;
        border: none;
        background: #1b1b1cde;
        border-radius: 20px;
        cursor: pointer;
    }

    .lable {
        line-height: 20px;
        font-size: 17px;
        color: #ff342b;
        font-family: sans-serif;
        letter-spacing: 1px;
    }

    .button:hover {
        background: #1b1b1c;
    }

    .button:hover .svg-icon {
        animation: scale 1s linear infinite;
    }

    @keyframes scale {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.05) rotate(10deg);
        }

        100% {
            transform: scale(1);
        }
    }
`;

export default Button;
