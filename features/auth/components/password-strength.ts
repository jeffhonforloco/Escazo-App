import { GridLayout, StackLayout, Label } from '@nativescript/core';
import { ValidationUtils } from '../../../core/utils/validation.utils';

export class PasswordStrength extends GridLayout {
    private strengthBar: StackLayout;
    private strengthLabel: Label;

    constructor() {
        super();
        this.initializeUI();
    }

    updateStrength(password: string) {
        const strength = ValidationUtils.getPasswordStrength(password);
        this.updateUI(strength);
    }

    private initializeUI() {
        this.className = 'mt-2';
        
        this.strengthBar = new StackLayout();
        this.strengthBar.className = 'h-1 bg-gray-200 rounded-full overflow-hidden';
        
        this.strengthLabel = new Label();
        this.strengthLabel.className = 'text-xs text-gray-500 mt-1';
        
        this.addChild(this.strengthBar);
        this.addChild(this.strengthLabel);
    }

    private updateUI(strength: 'weak' | 'medium' | 'strong') {
        const colors = {
            weak: 'bg-red-500',
            medium: 'bg-yellow-500',
            strong: 'bg-green-500'
        };

        this.strengthBar.className = `h-1 ${colors[strength]} rounded-full`;
        this.strengthLabel.text = `Password strength: ${strength}`;
    }
}