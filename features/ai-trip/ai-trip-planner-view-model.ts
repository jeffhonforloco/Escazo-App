import { Observable } from '@nativescript/core';
import { ApiService } from '../../core/services/api.service';
import { fadeIn, slideUp } from '../../shared/styles/animations';

export class AiTripPlannerViewModel extends Observable {
    private _destination: string = '';
    private _startDate: Date | null = null;
    private _endDate: Date | null = null;
    private _budget: string = '';
    private _preferences: string = '';
    private _plan: string | null = null;
    private _isLoading: boolean = false;
    private apiService: ApiService;

    constructor() {
        super();
        this.apiService = ApiService.getInstance();
    }

    async onGeneratePlan() {
        if (!this.validateInput()) {
            return;
        }

        this.isLoading = true;
        try {
            const response = await this.apiService.generateTripPlan({
                destination: this.destination,
                startDate: this.startDate,
                endDate: this.endDate,
                budget: parseFloat(this.budget),
                preferences: this.preferences
            });

            // Apply animation when showing the plan
            const planView = this.page.getViewById('planContainer');
            if (planView) {
                await planView.animate(slideUp);
            }
            
            this.plan = response.data.plan;
        } catch (error) {
            console.error('Error generating trip plan:', error);
            // Show error toast
        } finally {
            this.isLoading = false;
        }
    }

    private validateInput(): boolean {
        const errors = [];
        if (!this.destination) errors.push('Destination is required');
        if (!this.startDate) errors.push('Start date is required');
        if (!this.endDate) errors.push('End date is required');
        if (!this.budget) errors.push('Budget is required');

        if (errors.length > 0) {
            // Show validation errors
            return false;
        }
        return true;
    }

    // Add getters and setters for all properties
}