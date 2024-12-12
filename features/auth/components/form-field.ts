import { StackLayout, Label } from '@nativescript/core';

export class FormField extends StackLayout {
    constructor(label: string, required: boolean = false) {
        super();
        
        this.className = 'mb-4';

        const labelElement = new Label();
        labelElement.text = `${label}${required ? ' *' : ''}`;
        labelElement.className = 'text-sm font-medium text-gray-700 mb-1';
        this.addChild(labelElement);
    }

    showError(message: string) {
        const errorLabel = new Label();
        errorLabel.text = message;
        errorLabel.className = 'text-sm text-red-500 mt-1';
        this.addChild(errorLabel);
    }

    clearError() {
        const lastChild = this.getChildAt(this.getChildrenCount() - 1);
        if (lastChild instanceof Label && lastChild.className.includes('text-red-500')) {
            this.removeChild(lastChild);
        }
    }
}