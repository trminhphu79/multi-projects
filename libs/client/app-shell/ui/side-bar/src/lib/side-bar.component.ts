import { ToastModule } from 'primeng/toast';
import { Message, MessageService } from 'primeng/api';
import { ToastService } from '@client/util/toast';
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { AppStore } from '@client/store/store';
import { Router } from '@angular/router';
import { AddFriendDialogComponent } from '@client/app-shell/add-friend-dialog';
import { SideBarItem } from '@client/store/model';
import { ProfileService } from '@client/profile/service';
import { catchError, tap } from 'rxjs';
import { Profile } from '@client/profile/model';

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
    ToastModule,
    AddFriendDialogComponent,
  ],
  providers: [MessageService, ToastService],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  private router = inject(Router);
  private appState = inject(AppStore);
  private toastService = inject(ToastService);
  private profileService = inject(ProfileService);

  protected sideBarItems = this.appState.system.sideBar;
  protected currentUser = this.appState.user;
  protected profile = this.appState.user.profile;

  protected avatarUrl = computed(() => {
    return this.appState.user().profile?.avatarUrl;
  });

  protected toggleAddFriendDialog = signal(false);
  protected profileData = signal<Profile[]>([]);
  protected selectedSideBar = signal<{
    value: Partial<SideBarItem> | null;
    index: number;
  }>({
    value: null,
    index: 0,
  });

  signOut() {
    this.appState.signOut();
    this.router.navigate(['/user']);
  }

  onSelect(value: Partial<SideBarItem> | null, index: number) {
    console.log('currentUser:', this.currentUser());
    if (value?.label == 'Add friends') {
      this.toggleAddFriendDialog.set(true);
      return;
    }

    if (value?.externalLink) {
      window.open(value.route, '_blank');
      return;
    }

    this.selectedSideBar.set({
      value,
      index,
    });

    if (value?.redirect) {
      this.router.navigate([value?.route]);
    }
  }

  onCancelDialog() {
    console.log('onCancelDialog: ');
    this.toggleAddFriendDialog.set(false);
  }

  onSaveFriend(data: Profile) {
    this.profileService
      .addFriend({
        profileId: this.currentUser().profile?.id as number,
        friendId: data.id,
      })
      .pipe(
        catchError((e) => {
          this.toastService.showMessage('error', 'Add friend failed!');
          return e;
        }),
        tap((response) => {
          this.toggleAddFriendDialog.set(false);
          this.toastService.showMessage(
            'success',
            `Add ${data?.fullName || ''} success!`
          );
        })
      )
      .subscribe();
  }

  onSearchProfile(keyword: string) {
    console.log('keyword: ', keyword);
    this.profileService
      .search({
        keyword,
        offset: 0,
        limit: 100,
      })
      .pipe(
        tap((response) => {
          this.profileData.set(response.data);
          console.log('onSearchProfile: ', response);
        })
      )
      .subscribe();
  }
}
