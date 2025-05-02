import { effect, inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, firstValueFrom, of, take } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UsageStat } from '../types/usage-stat.type';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsageStatsService {

    STATS_DOMAIN = 'https://4tng5yf0o6.execute-api.us-east-1.amazonaws.com';

    private readonly http = inject(HttpClient);
    private router = inject(Router);
    #routerEvents$ = this.router.events;
    #navigationEndEvents$ = this.#routerEvents$.pipe(
      filter(navEvent => navEvent instanceof NavigationEnd ),
    );
    private navigationEndEvents = toSignal(this.#navigationEndEvents$);

    constructor() {
        /**
         * Automatically logs all routing
         */
        // effect(() => {
        //     const event = this.navigationEndEvents();
        //     if(event) {
        //         this.addUsageStatistic(event.urlAfterRedirects);
        //     }
        // });
    }


    async addUsageStatistic(action: string, other: any = {}) {

        let usageStat: UsageStat = {
            application: 'POETRY-DB',
            action: action,
            tymestampIso: (new Date()).toISOString(),
            user: '',
            other: other
        };

        if( isDevMode()) {
            console.log('usageStat', usageStat);
            return;
        } else {
            return firstValueFrom(this.http.post(`${this.STATS_DOMAIN}/usage-statistics`, usageStat).pipe(
                catchError(err => {
                    throw(err);
                })
            ));
        }

    }

}
