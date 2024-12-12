import { GridLayout, StackLayout, Label } from '@nativescript/core';

export class AuthDivider extends GridLayout {
    constructor(text: string = 'or') {
        super();
        
        this.className = 'my-6 grid grid-cols-[1fr,auto,1fr] items-center gap-4';

        const leftLine = new StackLayout();
        leftLine.className = 'h-px bg-gray-300';
        this.addChild(leftLine);

        const label = new Label();
        label.text = text;
        label.className = 'text-sm text-gray-500';
        this.addChild(label);

        const rightLine = new StackLayout();
        rightLine.className = 'h-px bg-gray-300';
        this.addChild(rightLine);
    }
}