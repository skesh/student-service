import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AfsService } from '../../core/afs.service';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { HtmlEditorField } from '../../dynamic-form/models/field-html-editor.class';
import { SelectField } from '../../dynamic-form/models/field-select.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { ArticleTypes } from '../../shared/enums/article-types.enum';
import { Article } from '../../shared/interfaces/article.interface';

@Component({
  selector: 'app-articles-manager',
  templateUrl: './articles-manager.component.html',
  styleUrls: ['./articles-manager.component.scss'],
})
export class ArticlesManagerComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;
  displayedColumns = ['name', 'type', 'created', 'actions'];
  articles$: Observable<Article[]> = this.afs.getItems('articles');
  articleTypesEnum = ArticleTypes;
  selectedArticle: Article;

  articleFields: FieldBase<any>[] = [
    new TextField({
      key: 'name',
      label: 'Название статьи',
      required: true,
    }),

    new SelectField({
      key: 'type',
      label: 'Тип',
      required: false,
      options: Object.entries(this.articleTypesEnum).map((type) => ({
        label: type[1],
        value: type[0],
      })),
      optionLabel: 'label',
      optionValue: 'value',
    }),

    new FileField({
      key: 'image',
      label: 'Изображение',
      required: true,
      directory: 'articles-images',
      hint: '850x600px',
    }),

    new HtmlEditorField({
      key: 'text',
      label: 'Текст статьи',
      required: true,
    }),
  ];

  constructor(private afs: AfsService) {}

  add(article: Article) {
    this.afs.updateOrAdd('articles', article);
    // if (this.selectedArticle.id) {
    //   this.afs.updateItem('articles', this.selectedArticle.id, article);
    // } else {
    //   article.created = new Date();
    //   this.afs.addItem('articles', article);
    // }
    this.selectedArticle = null;
  }

  delete(id: string) {
    this.afs.deleteItem('articles', id);
    this.selectedArticle = null;
  }

  edit(article) {
    this.selectedArticle = article;
    this.form.form.patchValue(article);
  }

  ngOnInit() {}
}
