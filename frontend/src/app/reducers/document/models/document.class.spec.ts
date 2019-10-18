import { Document } from './document.class';
import { Project } from '../../project/models/project.class';

describe('Document', () => {
  let subject: Document;

  describe('with empty props', () => {
    beforeEach(() => {
      subject = new Document();
    });

    it('creates', () => {
      expect(subject).toBeTruthy();
      expect(subject).toBeInstanceOf(Document);
    });

    it('uses default values', () => {
      expect(subject).toMatchSnapshot();
    });
  });

  describe('with props', () => {
    beforeEach(() => {
      subject = new Document({
        id: '42',
        description: 'The description',
        kind: 'model',
        state: 'ok',
        linkIds: [12],
        projectId: 5,
        project: { id: '5', name: 'Project 1', description: 'fffff', userId: 12 },
        links: [
          {
            id: '12',
            projectId: 5,
            project: { id: '5', name: 'Project 1', description: 'fffff', userId: 12 },
            description: 'Linked description',
            kind: 'custom',
            hash: '12345',
            linkIds: [],
            links: [],
            state: 'ok',
            stateDetails: '',
            address: '',
            createdAt: '',
          },
        ],
      });
    });

    it('creates', () => {
      expect(subject).toBeTruthy();
      expect(subject).toBeInstanceOf(Document);
    });

    it('merges default and given values', () => {
      expect(subject).toMatchSnapshot();
    });

    it('renders the label', () => {
      expect(subject.label).toEqual('#42(Project 1 - Model)');
    });

    it('creates Document instances in links', () => {
      expect(subject.links[0]).toBeInstanceOf(Document);
      expect(subject.links).toMatchSnapshot();
    });

    it('creates Project instance in project', () => {
      expect(subject.project).toBeInstanceOf(Project);
      expect(subject.project).toMatchSnapshot();
    });

    it('calculates graph nodes', () => {
      expect(subject.getGraphNodes()).toMatchSnapshot();
    });

    it('calculates graph edges', () => {
      expect(subject.getGraphEdges()).toMatchSnapshot();
    });

    it('generates kindLabel', () => {
      expect(subject.kindLabel).toEqual('Model');
    });

    it('generates stateLabel', () => {
      expect(subject.stateLabel).toEqual('OK');
    });

    it('generates linksText', () => {
      expect(subject.linksText).toEqual('#12(Project 1 - Custom)');
    });
  });
});
