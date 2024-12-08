import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { AppStore } from '@client/store/store';
import { Router } from '@angular/router';
import { SideBarItem } from '@client/store/model';

@Component({
  selector: 'lib-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    DockModule,
    MenuModule,
    AvatarModule,
    TooltipModule,
    BadgeModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  private appState = inject(AppStore);
  private router = inject(Router);
  protected sideBarItems = this.appState.system.sideBar;

  selectedSideBar = signal<{ value: SideBarItem | null; index: number }>({
    value: null,
    index: 0,
  });

  signOut() {
    this.appState.signOut();
    this.router.navigate(['/user']);
  }

  onSelect(value: SideBarItem | null, index: number) {
    this.selectedSideBar.set({
      value,
      index,
    });
    this.router.navigate([value?.route]);
  }
}
