import { Observable } from '@nativescript/core';
import { ApiService } from '../../core/services/api.service';

export class BudgetTrackerViewModel extends Observable {
    private _totalBudget: number = 0;
    private _remainingBudget: number = 0;
    private _expenses: any[] = [];
    private apiService: ApiService;

    constructor() {
        super();
        this.apiService = ApiService.getInstance();
        this.loadBudgetData();
    }

    async loadBudgetData() {
        try {
            const response = await this.apiService.getBudgetData();
            this.totalBudget = response.totalBudget;
            this.remainingBudget = response.remainingBudget;
            this.expenses = response.expenses;
        } catch (error) {
            console.error('Error loading budget data:', error);
        }
    }

    async addExpense(expense: any) {
        try {
            await this.apiService.addExpense(expense);
            this.loadBudgetData(); // Refresh data
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    }

    // Getters and setters
    get totalBudget(): number {
        return this._totalBudget;
    }

    set totalBudget(value: number) {
        if (this._totalBudget !== value) {
            this._totalBudget = value;
            this.notifyPropertyChange('totalBudget', value);
        }
    }

    get remainingBudget(): number {
        return this._remainingBudget;
    }

    set remainingBudget(value: number) {
        if (this._remainingBudget !== value) {
            this._remainingBudget = value;
            this.notifyPropertyChange('remainingBudget', value);
        }
    }

    get expenses(): any[] {
        return this._expenses;
    }

    set expenses(value: any[]) {
        if (this._expenses !== value) {
            this._expenses = value;
            this.notifyPropertyChange('expenses', value);
        }
    }
}