import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuMobileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get menuItems() {
    return this.data.menu;
  }

  public closeMenu = () => this.dialogRef.close();
}
