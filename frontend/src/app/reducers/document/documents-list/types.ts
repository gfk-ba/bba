import { KindOption } from '../models/document.class';

export type DocumentsListFilter = Readonly<{
  project: string;
  kind: KindOption | 'all';
  component: string;
}>;
