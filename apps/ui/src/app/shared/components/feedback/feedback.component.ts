import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  @Input() isShowPhraseVisible: false;
  @HostBinding('class') class = 'shadow';
  @Output() completed = new EventEmitter<boolean>();

  form: FormGroup;

  types = [
    { type: 'mail', class: 'icon-mail', placeholder: 'Ваш email' },
    {
      type: 'telegram',
      class: 'icon-telegram',
      placeholder: 'Ваше имя в telegram'
    },
    {
      type: 'whatsapp',
      class: 'icon-whatsapp',
      placeholder: 'Ваш whatsapp номер'
    },
    { type: 'skype', class: 'icon-skype', placeholder: 'Ваш skype' }
  ];

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      contact: ['', Validators.required],
      name: ['', Validators.required],
      type: this.types[0].type,
      created: new Date()
    });
  }

  get type() {
    return this.form.get('type').value;
  }

  set type(type: string) {
    this.form.get('type').patchValue(type);
  }

  get placeholder() {
    return this.type
      ? this.types.find(t => t.type === this.type).placeholder
      : this.types[0].placeholder;
  }

  addFeedback() {
    this.afs.collection('feedbacks').add(this.form.value);
    this.form.reset();
    this.type = this.types[0].type;
    this.completed.emit(true);
    this.snackBar.open(
      'В ближайшее время наш специалист свяжется с вами',
      undefined,
      {
        duration: 10000
      }
    );
  }
}
