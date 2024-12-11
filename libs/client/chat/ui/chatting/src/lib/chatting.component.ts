import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Conversation, Message } from '@client/chat/model';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  startWith,
  take,
  tap,
  timer,
} from 'rxjs';
import { TimeAgoPipe } from '@client/pipes/time-ago';
@Component({
  selector: 'lib-chatting',
  standalone: true,
  imports: [
    DatePipe,
    CardModule,
    TimeAgoPipe,
    CommonModule,
    AvatarModule,
    TooltipModule,
    InputIconModule,
    IconFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.scss',
})
export class ChattingComponent implements AfterViewInit {
  messages = input<Message[]>([]);
  sender = input<Conversation | null>();

  sendMessage = output<string>();

  @ViewChild('wrapperMessageContent', { static: true })
  protected wrapperMessageContent!: ElementRef<HTMLElement>;

  @ViewChild('messageListRef', { static: true })
  protected messageListRef!: ElementRef<HTMLElement>;

  @ViewChild('chatControlRef', { static: true })
  protected chatControlRef!: ElementRef<HTMLInputElement>;

  private originalMessageContentHeight = signal<number>(0);
  private originalMessageActionHeight = signal<number>(60);

  protected chatControl = new FormControl('');

  private cd = inject(ChangeDetectorRef);

  protected computedMessageContentHeight = computed(() => {
    console.log('Re computedMessageContentHeight');
    const result =
      this.originalMessageContentHeight() - this.originalMessageActionHeight();
    return `${result}px`;
  });

  private screenSize$ = fromEvent(window, 'resize').pipe(
    map(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    })),
    debounceTime(50),
    startWith({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  );

  ngAfterViewInit() {
    this.registerValueChanges();
    this.originalMessageContentHeight.set(
      this.wrapperMessageContent.nativeElement.offsetHeight
    );
    this.scrollToBottom();
  }

  private registerValueChanges() {
    this.chatControl.valueChanges
      .pipe(
        tap((value) => {
          console.log('chatControl: ', value);
        })
      )
      .subscribe();

    fromEvent(this.chatControlRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(10),
        filter((e: any) => e.keyCode === 13),
        distinctUntilChanged(),
        tap((res) => {
          this.sendMessage.emit(res?.target?.value);
          this.chatControlRef.nativeElement.value = '';
        })
      )
      .subscribe();

    this.screenSize$
      .pipe(
        tap(() => {
          this.originalMessageContentHeight.set(
            this.wrapperMessageContent.nativeElement.offsetHeight
          );
          this.cd.detectChanges();
          this.scrollToBottom();
        })
      )
      .subscribe();
  }

  private scrollToBottom(): void {
    if (this.messageListRef) {
      timer(100)
        .pipe(take(1))
        .subscribe(() => {
          this.messageListRef.nativeElement.scrollTo({
            top: this.messageListRef.nativeElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }
}
