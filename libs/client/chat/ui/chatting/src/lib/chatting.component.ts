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
import { CommonModule } from '@angular/common';
import { Conversation, Message } from '@client/chat/model';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounce,
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
@Component({
  selector: 'lib-chatting',
  standalone: true,
  imports: [
    CardModule,
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
    // Map the resize event to the current window dimensions
    map(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    })),
    // Debounce to limit the number of events fired
    debounceTime(50),
    // Emit the current size immediately when the observable starts
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
        debounceTime(150),
        filter((e: any) => e.keyCode === 13),
        distinctUntilChanged(),
        tap((res) => {
          console.log("Chatting: ", res);
          this.sendMessage.emit(res?.target?.value);
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
          console.log(
            'this.messageListRef.nativeElement.scrollHeight: ',
            this.messageListRef.nativeElement.scrollHeight
          );
          this.messageListRef.nativeElement.scrollTo({
            top: this.messageListRef.nativeElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }
}
