import React, { useEffect } from 'react';

export default function ThirdContainer() {
    useEffect(() => {
        function reveal() {
            var reveals = document.querySelectorAll('.reveal');
            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var revealtop = reveals[i].getBoundingClientRect().top;
                if (revealtop <= windowHeight - 140) {
                    reveals[i].classList.add('actif');
                } else {
                    reveals[i].classList.remove('actif');
                }
            }
        }

        window.addEventListener('scroll', reveal);

        return () => {
            window.removeEventListener('scroll', reveal);
        };
    }, []); 
    return (
        <div className="thirdContainer reveal">
            <h1>Featured reads</h1>
            <div className="container">
                <div className="block">
                    <img src="images/face11.webp" alt="" />
                    <div>
                        <h2>Face recognition in healthcare: key use cases</h2>
                        <a href="">
                            learn more
                            <span className="material-symbols-outlined">
                                arrow_right_alt
                            </span>
                        </a>
                    </div>
                </div>
                <div className="block">
                    <img src="images/face12.webp" className="face12" alt="" />
                    <div>
                        <h2>Engineered Arts: Social robots that are impossible to ignore</h2>
                        <a href="">
                            learn more
                            <span className="material-symbols-outlined">
                                arrow_right_alt
                            </span>
                        </a>
                    </div>
                </div>
                <div className="block">
                    <img src="images/face11.webp" alt="" />
                    <div>
                        <h2>Engineered Arts: Social robots that are impossible to ignore</h2>
                        <a href="">
                            learn more
                            <span className="material-symbols-outlined">
                                arrow_right_alt
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


