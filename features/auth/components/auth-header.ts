import { StackLayout, Label } from '@nativescript/core';

export class AuthHeader extends StackLayout {
    constructor(title: string, subtitle?: string) {
        super();
        
        this.className = 'mb-8';

        const titleLabel = new Label();
        titleLabel.text = title;
        titleLabel.className = 'text-2xl font-bold mb-1';
        this.addChild(titleLabel);

        if (subtitle) {
            const subtitleLabel = new Label();
            subtitleLabel.text = subtitle;
            subtitleLabel.className = 'text-gray-500';
            this.addChild(subtitleLabel);
        }
    }
}