import { TimeAgoPipe } from '@client/pipes/time-ago';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCategory, Conversation } from '@client/chat/model';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AvatarModule } from 'primeng/avatar';
import { debounceTime, delay, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'lib-conversation',
  standalone: true,
  imports: [
    ChipModule,
    CardModule,
    TimeAgoPipe,
    CommonModule,
    AvatarModule,
    InputIconModule,
    IconFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  conversations = input<Conversation[]>();
  messageCategoies = input<MessageCategory[]>();

  searchConversationChanges = output<string | null>();
  selectConversationChanges = output<Conversation>();
  selecteMessageCategoryChanges = output<MessageCategory>();

  protected searching = signal(false);
  protected searchControl = new FormControl<string>('');

  protected selectedConversation = signal<{
    value: Conversation | null;
    index: number;
  } | null>({ value: null, index: -1 });

  protected selectedMessageCategory = signal<{
    value: MessageCategory | null;
    index: number;
  } | null>({ value: null, index: -1 });

  ngOnInit() {
    this.registerValueChanges();
  }

  private registerValueChanges() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((keyword: string | null) => {
          this.searching.set(true);
          this.searchConversationChanges.emit(keyword);
        }),
        delay(2000),
        tap(() => this.searching.set(false))
      )
      .subscribe();
  }

  protected onSelectConversation(item: Conversation, index: number) {
    if (index == this.selectedConversation()?.index) return;
    this.selectedConversation.set({ value: item, index });
    this.selectConversationChanges.emit(item);
  }

  protected onSelectMessageCategory(item: MessageCategory, index: number) {
    if (index == this.selectedMessageCategory()?.index) return;
    this.selectedMessageCategory.set({ value: item, index });
    this.selecteMessageCategoryChanges.emit(item);
  }
}
