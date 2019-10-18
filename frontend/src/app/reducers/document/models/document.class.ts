import { ViewModel } from '@dcs/ngx-tools';
import { IProject, Project } from '../../project/models/project.class';

export type KindOption = 'data' | 'model' | 'result' | 'custom';
export type StateOption = 'ok' | 'in_progress' | 'error';

export interface IDocument {
  id: string;
  projectId: number;
  description: string;
  kind: KindOption;
  hash: string;
  linkIds: number[];
  links: IDocument[];
  project: IProject;
  state: StateOption;
  stateDetails: string;
  address: string;
  createdAt: string;
}

export class Document extends ViewModel<IDocument> implements IDocument {
  protected static readonly defaults: IDocument = {
    id: '',
    projectId: 0,
    description: '',
    kind: 'data',
    hash: '',
    linkIds: [],
    links: [],
    project: null,
    state: 'in_progress',
    stateDetails: '',
    address: '',
    createdAt: '',
  };

  public readonly id: string;
  public readonly projectId: number;
  public readonly description: string;
  public readonly kind: KindOption;
  public readonly hash: string;
  public readonly linkIds: number[];
  public readonly state: StateOption;
  public readonly stateDetails: '';
  public readonly address: string;
  public readonly createdAt: string;
  public linksText: string;
  public kindLabel: string;
  public stateLabel: string;

  get project(): Project {
    return this.getInstance('project', Project);
  }

  get hasLinks(): boolean {
    return this.props.linkIds.length > 0;
  }

  get links(): Document[] {
    return this.getInstance('links', Document, true);
  }

  get label(): string {
    return `#${this.id}(${this.project.name} - ${this.kindLabel})`;
  }

  constructor(props: Partial<IDocument> = {}) {
    props = { ...Document.defaults, ...props };
    super(props);
  }

  public init() {
    this.linksText = this.buildlinksText();
    this.kindLabel = this.buildKindLabel();
    this.stateLabel = this.buildStateLabel();
  }

  public getLinkedDescendants(): Document[] {
    const result: Document[] = [];

    function recurse(doc: any) {
      const ids = result.map(d => d.id);
      if (!ids.includes(doc.id)) {
        result.push(doc);
      }

      if (doc.links.length) {
        doc.links.filter((d: Document) => !ids.includes(d.id)).forEach(recurse);
      }
    }

    recurse(this);

    return result;
  }

  public getGraphEdges() {
    const links = this.getLinkedDescendants();
    return links.reduce((sum, link) => {
      return [...sum, ...link.links.map(l => ({ from: link.id, to: l.id }))];
    }, []);
  }

  public getGraphNodes() {
    return this.getLinkedDescendants().map(doc => {
      return { id: doc.id, label: doc.label };
    });
  }

  private buildlinksText(): string {
    if (this.hasLinks) {
      return this.links.map(link => link.label).join(', ');
    } else {
      return '-';
    }
  }

  private buildKindLabel(): string {
    if (!this.kind) {
      return '';
    }
    const text = this.kind;
    return text[0].toUpperCase() + text.slice(1);
  }

  private buildStateLabel(): string {
    return this.state.toUpperCase();
  }
}
