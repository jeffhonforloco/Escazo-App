import { GridLayout, TextField, Button } from '@nativescript/core';

export class PasswordInput extends GridLayout {
    private textField: TextField;
    private toggleButton: Button;
    private isVisible: boolean = false;

    constructor() {
        super();
        
        this.className = 'relative';
        this.columns = 'auto, *';

        this.textField = new TextField();
        this.textField.secure = !this.isVisible;
        this.textField.className = 'input pr-12';
        this.addChild(this.textField);

        this.toggleButton = new Button();
        this.toggleButton.text = this.isVisible ? '👁️' : '👁️‍🗨️';
        this.toggleButton.className = 'absolute right-4 top-1/2 -translate-y-1/2';
        this.toggleButton.on('tap', this.toggleVisibility.bind(this));
        this.addChild(this.toggleButton);
    }

    private toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.textField.secure = !this.isVisible;
        this.toggleButton.text = this.isVisible ? '👁️' : '👁️‍🗨️';
    }
}