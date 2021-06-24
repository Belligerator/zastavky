import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { STOPS } from '../json/stops';
import { IStop } from '../models/stop.interface';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { IResultListItem } from '../models/resultListItem.interface';
import { API_URL } from '../constants';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public stop: IStop;
    public distance: number;
    public resultList: Array<IResultListItem> = [];
    private earthRadius: number = 6371;

    constructor(private geolocation: Geolocation,
                private http: HttpClient) {
    }

    public getCurrentPosition(): void {
        console.log('clicked', moment().format());
        this.geolocation.getCurrentPosition().then((resp) => {
            this.findNearesStop(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public findNearesStop(lat: number, lng: number): void {
        let min: number = Number.MAX_VALUE;
        let nearestStop: IStop;

        STOPS.forEach((stop: IStop) => {
            const dist = this.calcCrow(stop.stop_lat, stop.stop_lon, lat, lng);
            if (dist < min) {
                min = dist;
                nearestStop = stop;
            }
        });
        console.log(nearestStop, min);
        this.stop = nearestStop;
        this.distance = Math.round(min * 1000);
        this.testApi(this.stop.stop_id);
        // this.testApi('U664Z1');

    }

    public async testApi(stopId: string): Promise<void> {
        console.log('call api', stopId);
        const httpOptions: any = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const time: number = moment().valueOf();
        console.log('time is ' + time);
        try {
            this.http.get(`${API_URL}/by-stop-id/${stopId}?t=${time}`, httpOptions)
                .toPromise()
                .then((data: any) => {
                    console.log(data);
                    this.resultList = data;
                });

        } catch (e) {
            console.log('Oooops!');
            console.log('Error: ' + e);
        }
    }

    private calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return this.earthRadius * c;
    }

    // Converts numeric degrees to radians
    private toRad(value: number): number {
        return value * Math.PI / 180;
    }
}
