import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DataSet, Network } from 'vis';
import { Document } from '../../reducers/document/models/document.class';

@Component({
  selector: 'dcs-document-link-graph',
  templateUrl: './document-link-graph.component.html',
  styleUrls: ['./document-link-graph.component.scss'],
})
export class DocumentLinkGraphComponent implements OnChanges {
  constructor() {}

  @ViewChild('networkGraph')
  public graphContainerRef: ElementRef;

  @Input()
  document: Document;

  public network: Network;

  get graphContainer(): HTMLDivElement {
    return this.graphContainerRef.nativeElement;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.document) {
      this.buildGraph(changes.document.currentValue);
    }
  }

  public fit(): void {
    this.network.fit();
  }

  protected buildGraph(document: Document) {
    const data = {
      nodes: new DataSet(document.getGraphNodes()),
      edges: new DataSet(document.getGraphEdges()),
    };

    const options = {
      edges: {
        arrows: { to: { enabled: true } },
      },
    };

    this.network = new Network(this.graphContainer, data, options);
  }
}
