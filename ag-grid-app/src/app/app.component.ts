import { SelectionHeaderComponent } from './components/selectionHeader/selectionHeader.component';
import { YoutubeService } from './services/youtube/youtube.service';
import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-enterprise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    rowsCount: number;
    selectedRowsCount: number;
    gridOptions: GridOptions;
    title = 'gridApp';
    rowData = [];

    constructor(private YoutubeService: YoutubeService) {
        this.rowsCount = 0;
        this.selectedRowsCount = 0;
        this.gridOptions = {
            enableRangeSelection: true,
            columnDefs: [
                    {
                        field: 'selection',
                        width: 40, checkboxSelection: true,
                        hide: true,
                        headerComponentFramework: SelectionHeaderComponent
                    },
                    {field: 'thumbnails', cellRenderer: this.imageRenderer, width: 85, autoHeight: true },
                    {headerName: 'Published on', field: 'publishedAt', width: 100 },
                    {headerName: 'Video Title', field: 'videoId', cellRenderer: this.idToUrlRenderer, width: 175 },
                    {headerName: 'Description', field: 'description', width: 200}
                ],
            defaultColDef: {
                cellStyle: { 'white-space': 'normal' },
                resizable: true
            },
            getRowNodeId(data) {
                return data.videoId;
            },
            onGridReady: () => {
                this.YoutubeService.getVideos().subscribe(
                    rowData => {
                        if (this.gridOptions.api) {
                            this.rowData.push(rowData);
                            this.gridOptions.api.setRowData(this.rowData);
                        }
                    }
                );
            },
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            suppressContextMenu: false,
            getContextMenuItems: this.getContextMenuItems,
            suppressCellSelection: true,
            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            },
            onRowSelected: (params) => {
                this.selectedRowsCount = params.api.getSelectedRows().length;
            },
            onRowDataChanged: (params) => {
                this.rowsCount = params.api.getDisplayedRowCount();
            }
        } as GridOptions;
    }

    getContextMenuItems(params) {
        return [{
            name: 'Open in new tab',
            action() {
                const path = `https://www.youtube.com/watch?v=${this.node.data.videoId}`;
                window.open(path, '_blank');
            },
            node: params.node
        }];
    }

    idToUrlRenderer(params) {
        const path = `https://www.youtube.com/watch?v=${params.value}`;
        return `<a href=${path} target="_blank" rel="noopener">${path}</a>`;
    }

    imageRenderer(params) {
        return `<img border="0" width="150" height="100" src=${params.value}>`;
    }

    toggleSelectionMode() {
        const isVisible = this.gridOptions.columnApi.getColumnState()[0].hide;
        this.gridOptions.columnApi.setColumnVisible('selection', isVisible);
    }
}
