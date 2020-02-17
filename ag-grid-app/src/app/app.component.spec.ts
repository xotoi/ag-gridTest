import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionHeaderComponent } from './components/selectionHeader/selectionHeader.component';
import { YoutubeService } from './services/youtube/youtube.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let youtubeServiceStub;

  beforeEach(() => {
    youtubeServiceStub = () => ({
      getVideos: () => ({ subscribe: () => ({}) })
    });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: YoutubeService, useFactory: youtubeServiceStub }]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('title defaults to: gridApp', () => {
    expect(component.title).toEqual('gridApp');
  });

  it('rowData defaults to: []', () => {
    expect(component.rowData).toEqual([]);
  });

  it('idToUrlRenderer returns correct html for first testId', () => {
    const testId = 'first';
    const path = `https://www.youtube.com/watch?v=${testId}`;
    const expected = `<a href=${path} target="_blank" rel="noopener">${path}</a>`;

    const actual = component.idToUrlRenderer({value: testId});

    expect(expected).toEqual(actual);
  });

  it('idToUrlRenderer returns correct html for second testId', () => {
    const testId = 'second';
    const path = `https://www.youtube.com/watch?v=${testId}`;
    const expected = `<a href=${path} target="_blank" rel="noopener">${path}</a>`;

    const actual = component.idToUrlRenderer({value: testId});

    expect(expected).toEqual(actual);
  });

  it('imageRenderer returns correct html', () => {
    const testImageSrc = 'testImageSrc';
    const expected = `<img border="0" width="150" height="100" src=${testImageSrc}>`;

    const actual = component.imageRenderer({value: testImageSrc});

    expect(expected).toEqual(actual);
  });

  it('column defs to be correct', () => {
    const defs = [
      {
          field: 'selection',
          width: 40, checkboxSelection: true,
          hide: true,
          headerComponentFramework: SelectionHeaderComponent
      },
      {field: 'thumbnails', cellRenderer: component.imageRenderer, width: 85, autoHeight: true },
      {headerName: 'Published on', field: 'publishedAt', width: 100 },
      {headerName: 'Video Title', field: 'videoId', cellRenderer: component.idToUrlRenderer, width: 175 },
      {headerName: 'Description', field: 'description', width: 200}
    ];

    expect(component.gridOptions.columnDefs).toEqual(defs);
  });

  it('getContextMenuItems returns correct array', () => {
    const node = {
      data: {
        videoId: 'testId'
      }
    };
    const expected = [{
      name: 'Open in new tab',
      node
    }];

    const actual = component.getContextMenuItems({node});

    expect(actual.length).toBe(1);
    expect(expected[0].name).toEqual(actual[0].name);
    expect(expected[0].node).toEqual(actual[0].node);
  });
});
