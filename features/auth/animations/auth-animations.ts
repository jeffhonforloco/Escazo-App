import { Animation } from '@nativescript/core';

export const loginAnimation = {
    createEnterAnimation(view: any) {
        return new Animation([{
            target: view,
            translate: { x: 0, y: 100 },
            opacity: 0,
            duration: 300,
            curve: 'easeOut'
        }], true);
    },

    createExitAnimation(view: any) {
        return new Animation([{
            target: view,
            translate: { x: 0, y: -100 },
            opacity: 0,
            duration: 300,
            curve: 'easeIn'
        }]);
    }
};

export const formFieldAnimation = {
    createShakeAnimation(view: any) {
        return new Animation([{
            target: view,
            translate: { x: -10, y: 0 },
            duration: 50,
            iterations: 3,
            curve: 'easeInOut'
        }]);
    }
};