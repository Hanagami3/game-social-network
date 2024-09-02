import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

function mustContainQuestionMark(control: AbstractControl){
  if (control.value.includes('?')){
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

@Component({
  selector: 'app-posting',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostingComponent {

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.maxLength(250)]
    }),
    content: new FormControl('', {
      validators: [mustContainQuestionMark]
    }),
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get titleIsInvalid() {
    return (
      this.form.controls.title.touched &&
      this.form.controls.title.dirty &&
      this.form.controls.title.invalid
    );
  }

  get contentIsInvalid() {
    return (
      this.form.controls.content.touched &&
      this.form.controls.content.dirty &&
      this.form.controls.content.invalid
    );
  }

  onSubmit = () => {
    console.log(this.form);
  }
}
