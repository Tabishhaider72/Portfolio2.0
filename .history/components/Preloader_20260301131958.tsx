'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
            });

            tl.fromTo(
                '.profile-pic',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
            )
                .to('.name-text span', {
                    y: 0,
                    stagger: 0.05,
                    duration: 0.2,
                })
                .to('.preloader-item', {
                    delay: 1,
                    y: '100%',
                    duration: 0.5,
                    stagger: 0.1,
                })
                .to('.name-text span', { autoAlpha: 0 }, '<0.5')
                .to(preloaderRef.current, { autoAlpha: 0 }, '<1');
        },
        { scope: preloaderRef }
    );

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            {/* black panels */}
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="preloader-item h-full w-[10%] bg-black"></div>
            ))}

            {/* profile image + name */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="profile-pic mb-6 flex justify-center">
                    <Image
                        src="/public/profile1.png"
                        alt="Profile Picture"
                        width={165}
                        height={170}
                        className="rounded-full border-4 border-foreground object-cover"
                        priority
                    />
                </div>
                <p className="name-text flex text-[20vw] lg:text-[200px] font-anton text-center leading-none overflow-hidden">
                    {'SYED-TABISH'.split('').map((char, i) => (
                        <span key={i} className="inline-block translate-y-full">
                            {char}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default Preloader;
