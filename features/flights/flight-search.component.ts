import { Observable } from '@nativescript/core';
import { ApiService } from '../../shared/services/api.service';

export class FlightSearchViewModel extends Observable {
  private apiService: ApiService;

  constructor() {
    super();
    this.apiService = ApiService.getInstance();
  }

  async searchFlights(params: any) {
    try {
      const response = await this.apiService.searchFlights(params);
      this.notifyPropertyChange('searchResults', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  }
}