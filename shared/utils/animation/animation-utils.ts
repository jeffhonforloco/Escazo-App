import { View } from '@nativescript/core';

export class AnimationUtils {
    static async fadeIn(view: View, duration: number = 300): Promise<void> {
        view.opacity = 0;
        view.visibility = 'visible';
        return view.animate({
            opacity: 1,
            duration
        });
    }

    static async fadeOut(view: View, duration: number = 300): Promise<void> {
        return view.animate({
            opacity: 0,
            duration
        }).then(() => {
            view.visibility = 'collapse';
        });
    }

    static async slide(view: View, direction: 'left' | 'right' | 'up' | 'down', duration: number = 300): Promise<void> {
        const translations = {
            left: { x: -100, y: 0 },
            right: { x: 100, y: 0 },
            up: { x: 0, y: -100 },
            down: { x: 0, y: 100 }
        };

        view.translateX = translations[direction].x;
        view.translateY = translations[direction].y;
        view.opacity = 0;
        view.visibility = 'visible';

        return view.animate({
            translate: { x: 0, y: 0 },
            opacity: 1,
            duration
        });
    }

    static async scale(view: View, startScale: number, endScale: number, duration: number = 300): Promise<void> {
        view.scaleX = startScale;
        view.scaleY = startScale;
        
        return view.animate({
            scale: { x: endScale, y: endScale },
            duration
        });
    }
}