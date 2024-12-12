import { GridLayout, Label } from '@nativescript/core';

export class BudgetChart extends GridLayout {
    private categories: { name: string; amount: number; color: string }[] = [];
    private total: number = 0;

    constructor() {
        super();
        this.className = 'h-40 relative';
    }

    updateData(data: { name: string; amount: number; color: string }[]) {
        this.categories = data;
        this.total = data.reduce((sum, cat) => sum + cat.amount, 0);
        this.drawChart();
    }

    private drawChart() {
        this.removeChildren();
        
        let startAngle = 0;
        this.categories.forEach(category => {
            const percentage = (category.amount / this.total) * 100;
            const endAngle = startAngle + (percentage * 3.6);
            
            // Create pie slice
            const slice = new GridLayout();
            slice.className = `absolute inset-0 bg-${category.color}`;
            slice.style.transform = `rotate(${startAngle}deg)`;
            
            // Add label
            const label = new Label();
            label.text = `${category.name}\n${percentage.toFixed(1)}%`;
            label.className = 'text-xs text-center text-white';
            
            this.addChild(slice);
            this.addChild(label);
            
            startAngle = endAngle;
        });
    }
}