import { ViewModel } from '@dcs/ngx-tools';

export interface IProject {
  id: string;
  userId: number;
  name: string;
  description: string;
}

export class Project extends ViewModel<IProject> implements IProject {
  protected static readonly defaults = {
    id: '',
    userId: 0,
    name: '',
    description: '',
  };

  public readonly id: string;
  public readonly userId: number;
  public readonly name: string;
  public readonly description: string;

  constructor(props: Partial<IProject> = {}) {
    props = { ...Project.defaults, ...props };
    super(props);
  }
}
