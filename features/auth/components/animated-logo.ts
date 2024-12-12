import { Image, Animation } from '@nativescript/core';

export class AnimatedLogo extends Image {
    constructor() {
        super();
        this.src = '~/assets/images/logo.png';
        this.className = 'w-32 h-32 mb-8';
    }

    async playIntroAnimation() {
        const scaleAnimation = new Animation([{
            target: this,
            scale: { x: 1.2, y: 1.2 },
            duration: 500,
            curve: 'spring'
        }]);

        const rotateAnimation = new Animation([{
            target: this,
            rotate: 360,
            duration: 1000,
            curve: 'easeInOut'
        }]);

        await scaleAnimation.play();
        await rotateAnimation.play();
    }
}