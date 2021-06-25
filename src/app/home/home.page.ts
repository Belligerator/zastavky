import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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

    public stop: string;
    public distance: number;
    public resultList: Array<IResultListItem> = [];

    constructor(private geolocation: Geolocation,
                private http: HttpClient) {
    }

    public getCurrentPosition(): void {
        console.log('clicked', moment().format());
        this.geolocation.getCurrentPosition().then((resp) => {
            this.findStopTimes(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    public async findStopTimes(lat: number, lon: number): Promise<void> {
        try {
            this.http.post(`${API_URL}/by-coordinates`,
                {
                    lat: lat,
                    lon: lon,
                    date: moment().format(),
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .toPromise()
                .then((data: { station: string, distance: number, stoptimes: IResultListItem[] }) => {
                    console.log(data);
                    this.resultList = data.stoptimes;
                    this.distance = Math.round(data.distance);
                    this.stop = data.station;
                });

        } catch (e) {
            console.log('Oooops!');
            console.log('Error: ' + e);
        }
    }

}
