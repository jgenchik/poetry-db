import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter } from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class PromptUpdateService {

  constructor(swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    ).subscribe((evt) => {
      const snack = snackBar.open('Update Available', 'Reload', {
        // duration: 6000
      });

      snack.onAction().subscribe(() => {
          window.location.reload();
      });
    });
  }

}
